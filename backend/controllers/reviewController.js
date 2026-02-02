const Review = require('../models/Review');

exports.createReview = async (req, res) => {
    try {
        const { reviewName, reviewEmail, reviewText, businessId, ratingStars } = req.body;

        const review = await Review.create({
            reviewName,
            reviewEmail,
            reviewText,
            businessId,
            ratingStars
        });

        res.status(201).json({
            success: true,
            message: 'Review created successfully',
            data: review
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

exports.getAllReviews = async (req, res) => {
    try {
        const reviews = await Review.find().sort({ createdAt: -1 }).limit(3);

        res.status(200).json({
            success: true,
            count: reviews.length,
            data: reviews
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

exports.getAllReviewsBusinessId = async (req, res) => {
    const { businessId } = req.body;
    try {
        const reviews = await Review.find({businessId}).sort({ createdAt: -1 }).limit(5);

        res.status(200).json({
            success: true,
            count: reviews.length,
            data: reviews
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

exports.getReviewById = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);

        if (!review) {
            return res.status(404).json({
                success: false,
                message: 'Review not found'
            });
        }

        res.status(200).json({
            success: true,
            data: review
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

exports.deleteReview = async (req, res) => {
    try {
        const review = await Review.findByIdAndDelete(req.params.id);

        if (!review) {
            return res.status(404).json({
                success: false,
                message: 'Review not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Review deleted successfully'
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};
