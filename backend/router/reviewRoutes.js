const express = require('express');
const router = express.Router();

const { createReview, getAllReviews, getReviewById, deleteReview, getAllReviewsBusinessId } = require('../controllers/reviewController');

router.post('/', createReview);
router.get('/', getAllReviews);
router.get('/:id', getReviewById);
router.delete('/:id', deleteReview);
router.post('/get-reviews-business', getAllReviewsBusinessId);

module.exports = router;
