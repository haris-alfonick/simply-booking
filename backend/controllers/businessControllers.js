const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Business = require('../models/Business');
const upload = require('../middleware/upload');
const app = express();
app.use('/uploads', express.static('uploads'));

function generateSlug(text) {
    return text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

async function generateUniqueDomain(businessName) {
    const baseSlug = generateSlug(businessName);
    const domains = new Set(); // ensures uniqueness
    let attempts = 0;

    while (domains.size < 4) {
        const randomNum = Math.floor(Math.random() * 90) + 10;
        const domain = `${baseSlug}-${randomNum}`;

        // Check DB + local uniqueness
        const exists = await Business.findOne({ domain });

        if (!exists && !domains.has(domain)) {
            domains.add(domain);
        }

        attempts++;
        // Prevent infinite loop
        if (attempts > 100) {
            domains.add(`${baseSlug}-${Date.now()}`);
        }
    }

    const domainArray = Array.from(domains);

    return {
        selected: domainArray[0],
        suggestions: domainArray.slice(1)
    };
}

exports.createDomain = async (req, res) => {
    try {
        const { businessName } = req.body;
        if (!businessName) { return res.status(400).json({ error: 'Business name is required' }) }
        const domains = await generateUniqueDomain(businessName);
        // res.json({ domain, fullUrl: `simplybooking.org/${domain}` });
        res.json({
            domain: domains.selected,
            suggestions: domains.suggestions, fullUrl: `simplybooking.org/${domains}`
        });


        res.status(200).json({
            success: true,
            selected: domains.selected,
            suggestions: domains.suggestions
        });
    } catch (error) {
        console.error('Error generating domain:', error);
        res.status(500).json({ error: 'Failed to generate domain' });
    }
}

exports.checkDomain = async (req, res) => {
    try {
        const { domain } = req.params;
        const existing = await Business.findOne({ domain });
        res.json({ available: !existing, domain, fullUrl: `simplybooking.org/${domain}` });
    } catch (error) {
        console.error('Error checking domain:', error);
        res.status(500).json({ error: 'Failed to check domain' });
    }
}

exports.uploadImage = upload.single('image'), (req, res) => {
    try {
        if (!req.file) { return res.status(400).json({ error: 'No file uploaded' }) }
        const imageUrl = `/uploads/${req.file.filename}`;
        res.json({ success: true, imageUrl, fieldName: req.body.fieldName });
    } catch (error) {
        console.error('Error uploading image:', error);
        res.status(500).json({ error: 'Failed to upload image' });
    }
}

exports.createBusiness = async (req, res) => {
    try {
        const businessData = req.body;

        const existingEmail = await Business.findOne({ email: businessData.email });
        if (existingEmail) {
            return res.status(400).json({
                success: false,
                message: "Email already registered"
            });
        }

        const existingDomain = await Business.findOne({ domain: businessData.domain });

        if (businessData.domain) {
            if (existingDomain) { return res.status(400).json({ success: false, message: "Domain already exists" }) }
        } else { businessData.domain = await generateUniqueDomain(businessData.businessName) }


        ['services', 'questions', 'serviceAreas', 'hours'].forEach(field => {
            if (businessData[field]) {
                try { businessData[field] = JSON.parse(businessData[field]) }
                catch (e) {
                    // ignore if already parsed
                }
            }
        });

        const parseIfString = (value) => {
            if (typeof value === 'string') {
                try {
                    return JSON.parse(value);
                } catch {
                    return value;
                }
            }
            return value;
        };

        const business = new Business(businessData);

        if (req.files) {
            if (req.files.businessLogo?.[0]) {
                business.businessLogo = {
                    data: fs.readFileSync(req.files.businessLogo[0].path),
                    contentType: req.files.businessLogo[0].mimetype
                };
            }

            if (req.files.businessCoverPhoto?.[0]) {
                business.businessCoverPhoto = {
                    data: fs.readFileSync(req.files.businessCoverPhoto[0].path),
                    contentType: req.files.businessCoverPhoto[0].mimetype
                };
            }
            if (req.files.image1?.[0]) {
                business.image1 = {
                    data: fs.readFileSync(req.files.image1[0].path),
                    contentType: req.files.image1[0].mimetype
                };
            }
            if (req.files.image2?.[0]) {
                business.image2 = {
                    data: fs.readFileSync(req.files.image2[0].path),
                    contentType: req.files.image2[0].mimetype
                };
            }
            if (req.files.image3?.[0]) {
                business.image3 = {
                    data: fs.readFileSync(req.files.image3[0].path),
                    contentType: req.files.image3[0].mimetype
                };
            }

        }

        if (businessData.services) {
            businessData.services = parseIfString(businessData.services);
        }

        if (businessData.questions) {
            businessData.questions = parseIfString(businessData.questions);
        }

        if (businessData.serviceAreas) {
            businessData.serviceAreas = parseIfString(businessData.serviceAreas);
        }

        if (businessData.hours) {
            businessData.hours = parseIfString(businessData.hours);
        }

        await business.save();

        res.status(201).json({
            success: true,
            message: 'Business created successfully',
            business
        });

    } catch (error) {
        console.error('Error creating business:', error);

        res.status(500).json({
            success: false,
            message: 'Failed to create business',
            error: error.message
        });
    }
};

exports.getAllBusinesses = async (req, res) => {
  try {
    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const limit = Math.min(parseInt(req.query.limit) || 10, 100);
    const skip = (page - 1) * limit;

    const filter = {};
    if (req.query.status) filter.status = req.query.status;

    if (req.query.search) {
      filter.$or = [
        { businessName: { $regex: req.query.search, $options: "i" } },
        { email: { $regex: req.query.search, $options: "i" } },
        { cityTown: { $regex: req.query.search, $options: "i" } }
      ];
    }

    const [businesses, total] = await Promise.all([
      Business.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate("userId"),
      Business.countDocuments(filter)
    ]);

    const now = new Date();
    const startOfThisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    const startOfSixMonthsAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 5,
      1
    );

    const allBusinesses = await Business.find({});
    const totalBusinesses = allBusinesses.length;

    const totalPaid = allBusinesses.filter(b => b.status === "Paid").length;
    const totalTrial = allBusinesses.filter(b => b.status === "Trial").length;
    const totalCancelled = allBusinesses.filter(b => b.status === "Cancelled").length;

    const totalCancelledThisMonth = allBusinesses.filter(
      b => b.status === "Cancelled" && b.updatedAt >= startOfThisMonth
    ).length;

    const totalBookings = allBusinesses.reduce(
      (acc, b) => acc + (b.bookings || 0),
      0
    );

    const totalThisMonth = allBusinesses.filter(
      b => b.createdAt >= startOfThisMonth
    ).length;

    const totalLastMonth = allBusinesses.filter(
      b => b.createdAt >= startOfLastMonth && b.createdAt <= endOfLastMonth
    ).length;

    const avgBookings = totalBusinesses
      ? (totalBookings / totalBusinesses).toFixed(2)
      : 0;

    let avgCancelledPerMonth = 0;
    if (totalBusinesses) {
      const firstBusinessDate = allBusinesses.reduce(
        (earliest, b) => (b.createdAt < earliest ? b.createdAt : earliest),
        allBusinesses[0].createdAt
      );

      const monthsActive =
        (now.getFullYear() - firstBusinessDate.getFullYear()) * 12 +
        (now.getMonth() - firstBusinessDate.getMonth()) + 1;

      avgCancelledPerMonth = (totalCancelled / monthsActive).toFixed(2);
    }

    const churnRate = totalBusinesses
      ? ((totalCancelled / totalBusinesses) * 100).toFixed(2)
      : 0;

    const cancellationsLast6Months = await Business.aggregate([
      {
        $match: {
          status: "Cancelled",
          updatedAt: { $gte: startOfSixMonthsAgo }
        }
      },
      {
        $group: {
          _id: {
            year: { $year: "$updatedAt" },
            month: { $month: "$updatedAt" }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } },
      {
        $project: {
          _id: 0,
          year: "$_id.year",
          month: "$_id.month",
          count: 1
        }
      }
    ]);

    res.status(200).json({
      success: true,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      },
      analytics: {
        totalPaid,
        totalTrial,
        totalCancelled,
        totalCancelledThisMonth,
        avgCancelledPerMonth: parseFloat(avgCancelledPerMonth),
        churnRate: parseFloat(churnRate),
        totalBookings,
        avgBookings: parseFloat(avgBookings),
        totalThisMonth,
        totalLastMonth,
        cancellationsLast6Months
      },
      data: businesses
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


exports.updateBusiness = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        updateData.updatedAt = Date.now();

        if (updateData.domain) {
            const existing = await Business.findOne({ domain: updateData.domain, _id: { $ne: id } });
            if (existing) { return res.status(400).json({ error: 'Domain already exists' }) }
        }

        const business = await Business.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
        if (!business) { return res.status(404).json({ error: 'Business not found' }) }
        res.json({ success: true, business, message: 'Business updated successfully' });
    } catch (error) {
        console.error('Error updating business:', error);
        res.status(500).json({ error: 'Failed to update business' });
    }
}

exports.getBusinessById = async (req, res) => {
    try {
        const business = await Business.findOne({ domain: req.params.id });
        if (!business) {
            return res.status(404).json({ error: 'Business not found' });
        }
        res.status(200).json(business);
    } catch (error) {
        console.error('Error fetching business:', error);
        res.status(500).json({ error: 'Failed to fetch business' });
    }
}

exports.getDomain = async (req, res) => {
    try {
        const business = await Business.findOne({ domain: req.params.domain });
        if (!business) {
            return res.status(404).json({ error: 'Business not found' });
        }
        res.json(business);
    } catch (error) {
        console.error('Error fetching business:', error);
        res.status(500).json({ error: 'Failed to fetch business' });
    }
}

exports.deleteBusiness = async (req, res) => {
    try {
        const business = await Business.findByIdAndDelete(req.params.id);
        if (!business) {
            return res.status(404).json({ error: 'Business not found' });
        }
        res.json({ success: true, message: 'Business deleted successfully' });
    } catch (error) {
        console.error('Error deleting business:', error);
        res.status(500).json({ error: 'Failed to delete business' });
    }
}

exports.threedomains = async (req, res) => {
    try {
        const { businessName } = req.body;

        if (!businessName) { return res.status(400).json({ success: false, message: "businessName is required" }); }
        const domains = await generateUniqueDomain(businessName);

        return res.status(200).json({
            success: true,
            selected: domains.selected,
            suggestions: domains.suggestions
        });
    } catch (error) {
        console.error("Domain generation error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to generate domains"
        });
    }
};




