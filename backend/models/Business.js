const mongoose = require('mongoose')

const businessSchema = new mongoose.Schema({
    businessName: { type: String, required: true },
    phoneNumber: String,
    email: String,
    cityTown: String,
    businessLogo: String,
    businessCoverPhoto: String,
    serviceAreas: [String],
    businessDescription: String,
    hours: {
        mon: { start: String, end: String, closed: Boolean },
        tue: { start: String, end: String, closed: Boolean },
        wed: { start: String, end: String, closed: Boolean },
        thu: { start: String, end: String, closed: Boolean },
        fri: { start: String, end: String, closed: Boolean },
        sat: { start: String, end: String, closed: Boolean },
        sun: { start: String, end: String, closed: Boolean }
    },
    domain: { type: String, unique: true, required: true },
    services: [{
        name: String,
        price: String,
        customPrice: Boolean
    }],
    questions: [{
        question: String,
        answer: String
    }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Business', businessSchema);