const mongoose = require('mongoose');

const quoteSchema = new mongoose.Schema({
    reviewName: { type: String, required: [true, 'Name is required'], trim: true },
    reviewEmail: { type: String, required: [true, 'Email is required'], trim: true, lowercase: true, match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email'] },
    reviewText: { type: String, default: "-", trim: true },
    status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
},

    createdAt: { type: Date, default: Date.now }
}, {
    timestamps: true
});

// Index for faster queries
quoteSchema.index({ reviewEmail: 1, createdAt: -1 });
quoteSchema.index({ status: 1 });

module.exports = mongoose.model('review', quoteSchema);

