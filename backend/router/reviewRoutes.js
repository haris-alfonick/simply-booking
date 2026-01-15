const express = require('express');
const router = express.Router();

const {
    createReview,
    getAllReviews,
    getReviewById,
    deleteReview
} = require('../controllers/reviewController');

// Create review
router.post('/', createReview);

// Get all reviews
router.get('/', getAllReviews);

// Get review by ID
router.get('/:id', getReviewById);

// Delete review
router.delete('/:id', deleteReview);

module.exports = router;
