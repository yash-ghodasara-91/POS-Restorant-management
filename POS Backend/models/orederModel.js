const mongoose = require("mongoose");
const Razorpay = require("razorpay");


const orderItemSchema = new mongoose.Schema({
    itemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Item",
        required: true
    },
    name: String,
    qty: Number,
    price: Number,
    total: Number
});

const orderSchema = new mongoose.Schema({
    customerDetailes: {
        name: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        guests: {
            type: Number,
            required: true,
        },
    },
    orderStatus: {
        type: String,
        required: true,
    },
    
    orderDate: {
        type: Date,
        default: Date.now()
    },
    bills: {
        total: {
            type: Number,
            required: true,
        },
        tax: {
            type: Number,
            required: true,
        },
        totalWithTax: {
            type: Number,
            required: true,
        }
    },
    // ✅ YAHI ADD KARNA HAI
   // ✅ YAHI ADD KIYA HAI
    items: {
        type: [
            {
                name: String,
                qty: Number,
                price: Number,
                total: Number
            }
        ],
        default: []   // 👈 important so length hamesha mile
    },


    table: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Table",
    },
    paymentMethod: String,

    paymentData: {
        Razorpay_order_id: String,
        Razorpay_payment_id: String,
    }


}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);