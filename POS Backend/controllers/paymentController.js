const Razorpay = require("razorpay");
const config = require("../config/config");
const crypto = require("crypto");
const Payment = require("../models/paymentModel");
const Order = require("../models/orederModel");
const Table = require("../models/tableModel");

// ================= CREATE ORDER =================
const createOrder = async (req, res) => {
    const razorpay = new Razorpay({
        key_id: config.razorpayKeyId,
        key_secret: config.razorpaySecretKey
    });

    const order = await razorpay.orders.create({
        amount: req.body.amount * 100,
        currency: "INR",
        receipt: `receipt_${Date.now()}`,
        notes: {
            dbOrderId: req.body.dbOrderId  // 👈 MongoDB Order ID
        }
    });

    res.json({ success: true, order });
};




// ================= VERIFY PAYMENT =================
const verifyPayment = async (req, res) => {
    try {
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature
        } = req.body;

        const expectedSignature = crypto
            .createHmac("sha256", config.razorpaySecretKey)
            .update(razorpay_order_id + "|" + razorpay_payment_id)
            .digest("hex");

        if (expectedSignature !== razorpay_signature) {
            return res.status(400).json({ success: false });
        }

        res.status(200).json({
            success: true,
            message: "Payment verified"
        });

    } catch (error) {
        res.status(500).json({ success: false });
    }
};



// ================= WEBHOOK (MAIN LOGIC) =================
const webHookVerification = async (req, res) => {
    try {
        const secret = config.razorpayWebhookSecret;
        const signature = req.headers["x-razorpay-signature"];

        const expected = crypto
            .createHmac("sha256", secret)
            .update(JSON.stringify(req.body))
            .digest("hex");

        if (expected !== signature) {
            return res.status(400).json({ message: "Invalid Signature" });
        }

        if (req.body.event === "payment.captured") {
            const payment = req.body.payload.payment.entity;

            // ✅ Save Payment
            await Payment.create({
                paymentId: payment.id,
                orderId: payment.order_id,
                amount: payment.amount / 100,
                currency: payment.currency,
                status: payment.status,
                method: payment.method,
                email: payment.email,
                contact: payment.contact
            });

            // ✅ FIND ORDER USING RAZORPAY ORDER ID
            const order = await Order.findOneAndUpdate(
                { razorpayOrderId: payment.order_id },
                {
                    paymentStatus: "Paid",
                    orderStatus: "Completed"
                },
                { new: true }
            );

            // ✅ FREE TABLE
            if (order?.table) {
                await Table.findByIdAndUpdate(order.table, {
                    status: "Available",
                    currentOrder: null
                });
            }
        }

        res.json({ success: true });
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false });
    }
};


module.exports = {
    createOrder,
    verifyPayment,
    webHookVerification
};
