const mongoose = require('mongoose')

const businessSchema = new mongoose.Schema({
    businessName: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    cityTown: { type: String, required: true },
    businessLogo: { type: String, default: null },
    businessCoverPhoto: { type: String, default: null },
    // businessLogo: { data: Buffer, contentType: String },
    // businessCoverPhoto: { data: Buffer, contentType: String },
    serviceAreas: [String],
    businessDescription: { type: String, required: true },
    hours: {
        monday: { start: String, end: String, closed: Boolean },
        tuesday: { start: String, end: String, closed: Boolean },
        wednessday: { start: String, end: String, closed: Boolean },
        thusday: { start: String, end: String, closed: Boolean },
        friday: { start: String, end: String, closed: Boolean },
        saturday: { start: String, end: String, closed: Boolean },
        sunday: { start: String, end: String, closed: Boolean }
    },
    domain: { type: String, unique: true, required: true },
    services: [{ name: String, price: String, customPrice: Boolean }],
    questions: [{ question: String, answer: String }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true }
});

module.exports = mongoose.model('Businesses', businessSchema);