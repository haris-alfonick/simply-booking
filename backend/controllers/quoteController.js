
const path = require('path');
const Quote = require('../models/Quote');
const fs = require('fs').promises;

exports.createQuote = async (req, res) => {
  try {
    const { name, email, phone, service, address, details, businessId } = req.body;

    // Validate required fields
    if (!name || !email || !phone || !service || !address || !details) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
      });
    }

    // Prepare quote data
    const quoteData = { name, email, phone, service, address, details, businessId };

    // Handle file upload if exists
    if (req.file) {
      quoteData.photo = req.file.filename;
    }

    // Create quote
    const quote = await Quote.create(quoteData);

    res.status(201).json({
      success: true,
      message: 'Quote request submitted successfully',
      data: quote
    });

  } catch (error) {
    console.error('Error creating quote:', error);

    if (req.file) {
      await fs.unlink(req.file.path).catch(err => console.error('Error deleting file:', err));
    }

    res.status(500).json({
      success: false,
      message: error.message || 'Server error occurred'
    });
  }
};


exports.getAllQuotes = async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;

    const query = {};
    if (status) {
      query.status = status;
    }

    const quotes = await Quote.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await Quote.countDocuments(query);

    res.status(200).json({
      success: true,
      data: quotes,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      total: count
    });

  } catch (error) {
    console.error('Error fetching quotes:', error);
    res.status(500).json({
      success: false,
      message: 'Server error occurred'
    });
  }
};


exports.getQuoteById = async (req, res) => {
  try {
    const quote = await Quote.findById(req.params.id);

    if (!quote) {
      return res.status(404).json({
        success: false,
        message: 'Quote not found'
      });
    }

    res.status(200).json({
      success: true,
      data: quote
    });

  } catch (error) {
    console.error('Error fetching quote:', error);
    res.status(500).json({
      success: false,
      message: 'Server error occurred'
    });
  }
};


exports.updateQuoteStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const quote = await Quote.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!quote) {
      return res.status(404).json({
        success: false,
        message: 'Quote not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Quote updated successfully',
      data: quote
    });

  } catch (error) {
    console.error('Error updating quote:', error);
    res.status(500).json({
      success: false,
      message: 'Server error occurred'
    });
  }
};


exports.deleteQuote = async (req, res) => {
  try {
    const quote = await Quote.findById(req.params.id);

    if (!quote) {
      return res.status(404).json({
        success: false,
        message: 'Quote not found'
      });
    }

    // Delete associated photo if exists
    if (quote.photo) {
      const photoPath = path.join(__dirname, '..', 'uploads', quote.photo);
      await fs.unlink(photoPath).catch(err => console.error('Error deleting file:', err));
    }

    await quote.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Quote deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting quote:', error);
    res.status(500).json({
      success: false,
      message: 'Server error occurred'
    });
  }
};