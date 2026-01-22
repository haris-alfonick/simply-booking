
const path = require('path');
const Quote = require('../models/Quote');
const fs = require('fs');
const sendEmail = require('../utils/sendEmail')

exports.createQuote = async (req, res) => {
  try {
    const { name, email, phone, photo, service, address, details, businessId } = req.body;

    // Validate required fields
    if (!name || !email || !phone || !service || !address || !details) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
      });
    }

    // Prepare quote data
    const quoteData = { name, email, phone, service, address, details, photo, businessId };

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
    const { businessId, status, page, limit = 10 } = req.query;

    const query = { businessId };
    if (status) {
      query.status = status;
    }

    const quotes = await Quote.find(query)
      .sort({ createdAt: -1 })
      .limit(Number(limit))
      .skip((page - 1) * limit)
    // .populate("businessId");

    const total = await Quote.countDocuments(query);

    const statusCounts = await Quote.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 }
        }
      }
    ]);

    const counts = {
      totalRequests: 0,
      pending: 0,
      cancelled: 0,
      upcoming: 0,
      completed: 0,
      request: 0
    };

    statusCounts.forEach(item => {
      counts.totalRequests += item.count;

      if (item._id === "pending") counts.pending = item.count;
      if (item._id === "cancelled") counts.cancelled = item.count;
      if (item._id === "upcoming") counts.upcoming = item.count;
      if (item._id === "completed") counts.completed = item.count;
      if (item._id === "request") counts.request = item.count;
    });

    res.status(200).json({
      success: true,
      data: quotes,
      pagination: {
        total,
        totalPages: Math.ceil(total / limit),
        currentPage: Number(page),
        limit: Number(limit)
      },
      counts
    });

  } catch (error) {
    console.error("Error fetching quotes:", error);
    res.status(500).json({
      success: false,
      message: "Server error occurred"
    });
  }
};


// exports.getQuoteById = async (req, res) => {
//   try {
//     const quote = await Quote.findById(req.params.id);

//     if (!quote) {
//       return res.status(404).json({
//         success: false,
//         message: 'Quote not found'
//       });
//     }

//     res.status(200).json({
//       success: true,
//       data: quote
//     });

//   } catch (error) {
//     console.error('Error fetching quote:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Server error occurred'
//     });
//   }
// };


exports.updateQuoteStatus = async (req, res) => {
  try {
    const { status, price, notes } = req.body;

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


exports.getSearchQuotes = async (req, res) => {

  try {
    const { businessId, search, status, page, limit = 10, } = req.query;

    const query = { businessId };
    if (search) { query.name = { $regex: search, $options: 'i' } }
    // if (status) { query.status = status }

    const quotes = await Quote.find(query)
      .sort({ createdAt: -1 })
      .limit(Number(limit))
      .skip((page - 1) * limit);

    const total = await Quote.countDocuments(query);

    const statusCounts = await Quote.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 }
        }
      }
    ]);

    const counts = {
      totalRequests: 0,
      pending: 0,
      cancelled: 0,
      upcoming: 0,
      completed: 0,
      request: 0
    };

    statusCounts.forEach(item => {
      counts.totalRequests += item.count;

      if (item._id === "pending") counts.pending = item.count;
      if (item._id === "cancelled") counts.cancelled = item.count;
      if (item._id === "upcoming") counts.upcoming = item.count;
      if (item._id === "completed") counts.completed = item.count;
      if (item._id === "request") counts.request = item.count;
    });

    res.status(200).json({
      success: true,
      data: quotes,
      pagination: {
        total,
        totalPages: Math.ceil(total / limit),
        currentPage: Number(page),
        limit: Number(limit)
      },
      counts
    });

  } catch (error) {
    console.error("Error fetching quotes:", error);
    res.status(500).json({
      success: false,
      message: "Server error occurred"
    });
  }
};


// Send Estimate to Client
exports.sendEstimateToClient = async (req, res) => {
  try {
    const { price, notes } = req.body;
    const { id } = req.params;

    // 1. Update the quote in the database
    const quote = await Quote.findByIdAndUpdate(
      id,
      { price, notes, status: "pending" },
      { new: true, runValidators: true }
    );

    if (!quote) {
      return res.status(404).json({ message: "Quote not found" });
    }

    // 2. Generate Action URLs
    const confirmUrl = `${process.env.API_BASE_URL}/quotes/quote-response/${quote._id}?action=confirm`;
    const cancelUrl = `${process.env.API_BASE_URL}/quotes/quote-response/${quote._id}?action=cancel`;
    // 3. Construct Email HTML
    const html = `
      <!DOCTYPE html>
      <html>
        <body style="margin:0; padding:0; background-color:#f3f4f6; font-family:Arial, sans-serif;">
          <div style="max-width:500px; margin:40px auto; background:#fff; border-radius:12px; overflow:hidden; box-shadow:0 4px 6px rgba(0,0,0,0.1);">
            <div style="background:#2563eb; padding:30px; text-align:center;">
              <h1 style="color:#fff; margin:0; font-size:24px;">Estimate Ready</h1>
            </div>
            <div style="padding:30px;">
              <p style="font-size:16px; color:#374151; margin-bottom:20px;">Hello,</p>
              <p style="font-size:16px; color:#374151; margin-bottom:20px;">
                We have prepared an estimate for <strong>${quote.service}</strong>. Please review below.
              </p>

              <div style="background:#f9fafb; border:1px solid #e5e7eb; border-radius:8px; padding:20px; margin-bottom:30px;">
                <p style="margin:0 0 10px 0; color:#6b7280; font-size:14px; text-transform:uppercase;">Estimated Price</p>
                <p style="margin:0; font-size:32px; font-weight:bold; color:#111827;">$${quote.price}</p>
                ${quote.notes ? `
                  <div style="margin-top:20px; padding-top:20px; border-top:1px dashed #d1d5db;">
                    <p style="margin:0; color:#4b5563; font-style:italic;">"${quote.notes}"</p>
                  </div>
                ` : ''}
              </div>

              <div style="text-align:center;">
                <a href="${confirmUrl}" 
                   style="display:inline-block; background-color:#10b981; color:#fff; padding:14px 28px; text-decoration:none; border-radius:6px; font-weight:bold; font-size:16px; margin-bottom:10px; cursor:pointer;">
                  ✅ Approve Estimate
                </a>
                <br>
                <a href="${cancelUrl}" 
                   style="display:inline-block; background-color:#ef4444; color:#fff; padding:12px 24px; text-decoration:none; border-radius:6px; font-weight:normal; font-size:14px; cursor:pointer;">
                  ❌ Decline
                </a>
              </div>
            </div>
            <div style="background:#f9fafb; padding:20px; text-align:center; border-top:1px solid #e5e7eb;">
              <p style="margin:0; font-size:12px; color:#9ca3af;">
                If you did not request this estimate, you can safely ignore this email.
              </p>
            </div>
          </div>
        </body>
      </html>
    `;

    // 4. Send the Email
    await sendEmail(quote.email, "Your Estimate is Ready", html);

    res.json({ message: "Estimate sent successfully", quote });

  } catch (err) {
    console.error("Error sending estimate:", err);
    res.status(500).json({
      success: false,
      message: "Server error occurred while sending email"
    });
  }
};

// Handle Quote Confirmation
exports.emailQuotesConfirmation = async (req, res) => {
  try {
    const { action } = req.query;

    let requestedStatus;
    if (action === "confirm") requestedStatus = "upcoming";
    if (action === "cancel") requestedStatus = "cancelled";

    if (!requestedStatus) {
      return res.status(400).send("Invalid action");
    }

    const quote = await Quote.findById(req.params.id);
    if (!quote) {
      return res.status(404).send("Quote not found");
    }

    if (quote.status === requestedStatus) {
      return res.send({ message: "Confirmed already" });
    }

    quote.status = requestedStatus;
    await quote.save();

    res.redirect(
      `${process.env.API_BASE_URL}/quotes/thank-you?status=${requestedStatus}`
    );

  } catch (err) {
    console.error("Error processing quote:", err);
    res.status(500).json({
      success: false,
      message: "Server error occurred"
    });
  }
};

exports.thankYou = async (req, res) => {
  try {
    const { status } = req.query;

    const isSuccess = status === 'upcoming' || status === 'confirmed' || status === 'approved';

    const themeColor = isSuccess ? '#10b981' : '#ef4444';
    const icon = isSuccess ? '✅' : '🚫';
    const title = isSuccess ? 'Estimate Confirmed!' : 'Request Cancelled';
    const message = isSuccess
      ? 'Thank you for approving the estimate. We will proceed with the service.'
      : 'Your request has been cancelled. If this was a mistake, please contact us.';
    res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Thank You</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');

          body {
            font-family: 'Inter', sans-serif;
            background-color: #f3f4f6;
            margin: 0;
            padding: 40px 20px;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
          }

          .card {
            background: #ffffff;
            width: 100%;
            max-width: 450px;
            border-radius: 16px;
            box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
            overflow: hidden;
            text-align: center;
            padding: 40px;
            box-sizing: border-box;
          }

          .icon-wrapper {
            background-color: #f0fdf4;
            width: 80px;
            height: 80px;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 0 auto 24px auto;
            font-size: 40px;
            border: 4px solid ${themeColor}15; /* Faint color tint */
          }

          h1 {
            margin: 0 0 16px 0;
            font-size: 24px;
            font-weight: 700;
            color: #111827;
          }

          p {
            margin: 0 0 32px 0;
            font-size: 16px;
            color: #6b7280;
            line-height: 1.6;
          }

          .actions {
            display: flex;
            justify-content: center;
            gap: 12px;
          }

          /* Shared Button Styles */
          .btn {
            padding: 12px 24px;
            border-radius: 8px;
            color: #ffffff;
            text-decoration: none;
            font-weight: 600;
            font-size: 14px;
            
            /* Disabled State Styling */
            opacity: 0.5;
            cursor: not-allowed;
            filter: grayscale(1);
            box-shadow: none;
            transition: none;
            
            /* Flex layout for icon alignment */
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 6px;
          }

          .approve { background-color: #10b981; }
          .decline { background-color: #ef4444; }

        </style>
      </head>
      <body>
        
        <div class="card">
          <div class="icon-wrapper">
            ${icon}
          </div>
          
          <h1>${title}</h1>
          <p>${message}</p>
          
          <div class="actions">
            <a class="btn approve">✅ Approve Estimate</a>
            <a class="btn decline">❌ Decline</a>
          </div>
          
        </div>

      </body>
    </html>
  `);
  } catch (err) {
    console.error("Error processing quote:", err);
    res.status(500).json({
      success: false,
      message: "Server error occurred"
    });
  }
};


exports.imageQuotes = async (req, res) => {
  console.log('image end point')
  const { filename } = req.params;
  if (!filename) { return res.status(400).json({ success: false, message: 'Filename is required' }) }
  const filePath = path.join(__dirname, '..', 'uploads', filename);
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) { return res.status(404).json({ success: false, message: 'Image not found' }) }
    // Send the image file
    res.sendFile(filePath);
  });
};

exports.updateQuote = async (req, res) => {
  try {
    const updatedQuote = await Quote.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedQuote) {
      return res.status(404).json({
        success: false,
        message: 'Quote not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Quote updated successfully',
      data: updatedQuote
    });

  } catch (error) {
    console.error('Error updating quote:', error);
    res.status(500).json({
      success: false,
      message: errorMessage
    });
  }
};






