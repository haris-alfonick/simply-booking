const express = require('express');
const router = express.Router();
const { createQuote, getAllQuotes, getQuoteById, imageQuotes, updateQuoteStatus, deleteQuote, getSearchQuotes, sendEstimateToClient, emailQuotesConfirmation, thankYou, updateQuote }
    = require('../controllers/quoteController')
const upload = require('../middleware/upload');
const {verifyToken} = require('../middleware/VerifyToken');
router.use(verifyToken)

// Public route - Create quote
router.post('/', upload.single('photo'), createQuote);
// Admin routes (add authentication middleware as needed)
router.get('/', getAllQuotes);
// router.get('/:id', getQuoteById);
router.put('/:id', updateQuoteStatus);
router.delete('/:id', deleteQuote);
router.get('/search', getSearchQuotes);

router.post('/send-estimate/:id', sendEstimateToClient);
router.get('/quote-response/:id', emailQuotesConfirmation);
router.get('/thank-you', thankYou);

router.get('/image/:filename', imageQuotes);
router.put('/update/:id', updateQuote);


module.exports = router;