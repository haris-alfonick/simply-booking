const mongoose = require('mongoose');

const hoursSchema = new mongoose.Schema(
    {
        start: { type: String },
        end: { type: String },
        closed: { type: Boolean, default: false }
    },
    { _id: false }
);

const serviceSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        price: { type: String },
        customPrice: { type: Boolean, default: false }
    },
    { _id: false }
);

const questionSchema = new mongoose.Schema(
    {
        question: { type: String, required: true, trim: true },
        answer: { type: String, trim: true }
    },
    { _id: false }
);

const businessSchema = new mongoose.Schema(
    {
        businessName: { type: String, required: true, trim: true },
        phoneNumber: { type: String, required: true, trim: true },
        email: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
        cityTown: { type: String, required: true, trim: true },
        businessLogo: { data: Buffer, contentType: String },
        businessCoverPhoto: { data: Buffer, contentType: String },
        serviceAreas: [{ type: String, trim: true }],
        businessDescription: { type: String, required: true, trim: true },
        hours: {
            monday: hoursSchema,
            tuesday: hoursSchema,
            wednesday: hoursSchema,
            thursday: hoursSchema,
            friday: hoursSchema,
            saturday: hoursSchema,
            sunday: hoursSchema
        },
        domain: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
        services: [serviceSchema],
        questions: [questionSchema],
        image1: { data: Buffer, contentType: String },
        image2: { data: Buffer, contentType: String },
        image3: { data: Buffer, contentType: String },
        userId: {type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true}
    },
    { timestamps: true }
);

module.exports = mongoose.model('Business', businessSchema);
