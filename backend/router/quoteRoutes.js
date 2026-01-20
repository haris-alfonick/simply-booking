const express = require('express');
const router = express.Router();
const { createQuote, getAllQuotes, getQuoteById, updateQuoteStatus, deleteQuote, getSearchQuotes }
    = require('../controllers/quoteController')
const upload = require('../middleware/upload');

// Public route - Create quote
router.post('/', upload.single('photo'), createQuote);

// Admin routes (add authentication middleware as needed)
router.get('/', getAllQuotes);
// router.get('/:id', getQuoteById);
router.put('/:id', updateQuoteStatus);
router.delete('/:id', deleteQuote);
router.get('/search', getSearchQuotes);

module.exports = router;