const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    paypalOrderId: { type: String, unique: true, required: true },
    paypalTransactionId: { type: String },
    amount: { type: Number, required: true },
    currency: { type: String, default: 'USD' },
    customerName: { type: String, required: true },
    customerEmail: { type: String, required: true },
    status: { type: String, enum: ['idle', 'processing', 'success', 'error', 'cancelled'], default: 'idle' },
    paypalRawResponse: { type: mongoose.Schema.Types.Mixed }

}, { timestamps: true });

const Payment = mongoose.model('Payment', paymentSchema);
module.exports = Payment;




