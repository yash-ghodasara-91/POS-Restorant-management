const express = require("express");
const { isVerifiedUser } = require("../middlewares/tokenVerification");
const { createOrder, verifyPayment } = require("../controllers/paymentController");
const router = express.Router();

// Define your table routes here    
router.route("/create-order").post(isVerifiedUser, createOrder);
router.route("/verify-pyment").post(isVerifiedUser, verifyPayment);

module.exports = router;


