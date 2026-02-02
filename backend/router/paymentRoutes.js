const express = require('express');
const { createPaypalOrder, captureOrder, getAllPayment } = require('../controllers/paymentController');
const {verifyToken, isAdmin} = require('../middleware/VerifyToken');
const router = express.Router();
router.use(verifyToken)
router.post('/create-order', createPaypalOrder)
router.post('/capture-order', captureOrder)
router.get('/getAll-payment', isAdmin, getAllPayment)

module.exports = router

