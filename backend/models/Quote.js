const mongoose = require('mongoose');

const quoteSchema = new mongoose.Schema({
    name: { type: String, required: [true, 'Name is required'], trim: true },
    email: { type: String, required: [true, 'Email is required'], trim: true, lowercase: true, match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email'] },
    phone: { type: String, required: [true, 'Phone is required'], trim: true },
    service: { type: String, required: [true, 'Service is required'], trim: true },
    address: { type: String, required: [true, 'Address is required'], trim: true },
    details: { type: String, required: [true, 'Details are required'], trim: true },
    photo: { type: String, default: null },
    status: { type: String, enum: ['pending', 'reviewed', 'quoted', 'completed', 'cancelled', 'request', 'upcoming'], default: 'pending' },
    businessId: { type: mongoose.Schema.Types.ObjectId, ref: "Business", required: true },
    price: { type: Number, default: 0 },
    notes: { type: String, default: "" },
    data: { type: String, default: "" },
    time: { type: String, default: "00:00" },
    createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

// Index for faster queries
quoteSchema.index({ email: 1, createdAt: -1 });
quoteSchema.index({ status: 1 });

module.exports = mongoose.model('quote', quoteSchema);
