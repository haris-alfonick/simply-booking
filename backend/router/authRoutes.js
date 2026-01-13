// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const { sendOTP, verifyOTP, resendOTP, login } = require('../controllers/authController');

// Send OTP to email
router.post('/send-otp', sendOTP);
router.post('/verify-otp', verifyOTP);
router.post('/resend-otp', resendOTP);
router.post('/login', login);

module.exports = router;

