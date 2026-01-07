// config.js
require('dotenv').config();

const config = Object.freeze({
  PORT: process.env.PORT ? Number(process.env.PORT) : 3000,
  databaseURL: process.env.MONGODB_URI || 'mongodb://localhost:27017/POS-Inventory',
  nodeENV: process.env.NODE_ENV || 'development',
  accessTokenSecret: process.env.JWT_SECRET || '',
  // razorpayKeyId: process.env.RAZORPAY_KEY_ID,
  // razorpaySecretKey: process.env.RAZORPAY_KEY_SECRET
});

module.exports = config;
