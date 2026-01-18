const { default: mongoose } = require("mongoose");
const Order = require("../models/orederModel");
const createHttpError = require("http-errors");


const addOrder = async (req, res, next) => {
    try {

        console.log("📦 ORDER BODY RECEIVED:", req.body);

        const order = new Order(req.body);
        await order.populate("table");
        await order.save();

        console.log("✅ ORDER SAVED:", order._id);

        res.status(201).json({
            success: true,
            message: "Order created!",
            data: order
        });

    } catch (error) {
        console.error("❌ ORDER SAVE ERROR:", error.message);
        next(error);
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

        const { orderStatus } = req.body;
        const { id } = req.params;
        const order = await Order.findByIdAndUpdate(
            id,
            { orderStatus },
            { new: true }
        );

        if (!order) {
            const error = createHttpError(404, "Order not found!");
            return next(error);
        }

        res.status(200).json({ success: true, message: "Order updated!", data: order });

    } catch (error) {
        next(error)
    }
}

module.exports = { addOrder, getOrderById, getOrders, updateOrder }