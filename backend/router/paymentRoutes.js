const express = require('express');
const { createPaypalOrder, captureOrder } = require('../controllers/paymentController');
const {verifyToken} = require('../middleware/VerifyToken');
const router = express.Router();
router.use(verifyToken)
router.post('/create-order', createPaypalOrder)
router.post('/capture-order', captureOrder)

module.exports = router

