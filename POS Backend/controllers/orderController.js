const { default: mongoose } = require("mongoose");
const Order = require("../models/orederModel");
const createHttpError = require("http-errors");
const Table = require("../models/tableModel")


const addOrder = async (req, res) => {
    try {
        const order = new Order({
            ...req.body,
              razorpayOrderId: req.body.razorpayOrderId // 👈 ADD THIS
        });
        await order.save();

        // ✅ BOOK TABLE
        await Table.findByIdAndUpdate(order.table, {
            status: "Booked",
            currentOrder: order._id
        });

        res.status(201).json({
            success: true,
            message: "Order created & table booked",
            data: order
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false });
    }
};


// GET ORDER BY ID
const getOrderById = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return next(createHttpError(404, "Invalid ID!"));
        }

        const order = await Order.findById(id).populate("table");

        if (!order) {
            return next(createHttpError(404, "Order not found!"));
        }

        res.status(200).json({ success: true, data: order });

    } catch (error) {
        next(error);
    }
};

const getOrders = async (req, res, next) => {
    try {
        const orders = await Order.find()
            .populate("table")          // 👈 YAHI ADD KARNA HAI
            .sort({ createdAt: -1 });

        res.status(200).json({ data: orders });

    } catch (error) {
        next(error);
    }
};

const updateOrder = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { orderStatus } = req.body;

        const order = await Order.findById(id);

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        // Update order status
        order.orderStatus = orderStatus;

        // ✅ IF ORDER COMPLETED
        if (orderStatus === "Completed") {
            order.paymentStatus = "Paid";

            // FREE TABLE
            await Table.findByIdAndUpdate(order.table, {
                status: "Available",
                currentOrder: null
            });
        }

        await order.save();

        res.status(200).json({
            success: true,
            message: "Order updated successfully",
            data: order
        });

    } catch (error) {
        next(error);
    }
};

module.exports = { addOrder, getOrderById, getOrders, updateOrder }