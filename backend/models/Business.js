const mongoose = require('mongoose');

const hoursSchema = new mongoose.Schema({
    start: String,
    end: String,
    closed: { type: Boolean, default: false }
},
    { _id: false }
);

const serviceSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        price: String,
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

const cancellationSchema = new mongoose.Schema(
    {
        cancelledAt: { type: Date, default: Date.now },
        reason: { type: String },
        billingPlan: { type: String },
        usage: {
            type: String,
            enum: ['Low Usage', 'Medium Usage', 'High Usage']
        }
    },
    { _id: false }
);

const businessSchema = new mongoose.Schema(
    {
        businessName: { type: String, required: true, trim: true },
        phoneNumber: { type: String, required: true, trim: true },
        email: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
            unique: true,
            index: true
        },
        cityTown: { type: String, required: true, trim: true },
        location: { type: String },

        /* Media */
        businessLogo: { data: Buffer, contentType: String },
        businessCoverPhoto: { data: Buffer, contentType: String },
        image1: { data: Buffer, contentType: String },
        image2: { data: Buffer, contentType: String },
        image3: { data: Buffer, contentType: String },

        /* Business Details */
        businessDescription: { type: String, required: true, trim: true },
        serviceAreas: [{ type: String, trim: true }],
        services: [serviceSchema],
        questions: [questionSchema],

        /* Working Hours */
        hours: {
            monday: hoursSchema,
            tuesday: hoursSchema,
            wednesday: hoursSchema,
            thursday: hoursSchema,
            friday: hoursSchema,
            saturday: hoursSchema,
            sunday: hoursSchema
        },
        /* Platform / SaaS Fields */
        status: { type: String, enum: ['Paid', 'Trial', 'Cancelled'], default: 'Trial', index: true },
        plan: { type: String, enum: ['Pro Plan', 'Business Plan'], default: 'Business Plan' },
        startDate: { type: Date, default: Date.now },
        trialExpiresAt: Date,
        daysLeft: Number,
        bookings: { type: Number, default: 0 },
        /* Cancellation Info (optional) */
        cancellation: cancellationSchema,
        /* Domain */
        domain: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
        /* Ownership */
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
        isActive: { type: Boolean, default: true }

    },
    { timestamps: true }
);

module.exports = mongoose.model('Business', businessSchema);
