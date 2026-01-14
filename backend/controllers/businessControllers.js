const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Business = require('../models/Business');
const app = express();
app.use('/uploads', express.static('uploads'));

if (!fs.existsSync('uploads')) { fs.mkdirSync('uploads') }


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    fileFilter: (req, file, cb) => {
        const allowedTypes = /jpeg|jpg|png|gif/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);

        if (mimetype && extname) {
            return cb(null, true);
        }
        cb(new Error('Only image files are allowed!'));
    }
});

function generateSlug(text) {
    return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

async function generateUniqueDomain(businessName) {
    const baseSlug = generateSlug(businessName);
    let domain = baseSlug;
    let counter = 1;

    // Generate random number between 10-99
    const randomNum = Math.floor(Math.random() * 90) + 10;
    domain = `${baseSlug}-${randomNum}`;

    // Check if domain exists, if yes, keep generating
    while (await Business.findOne({ domain })) {
        const newRandomNum = Math.floor(Math.random() * 90) + 10;
        domain = `${baseSlug}-${newRandomNum}`;
        counter++;
        // Prevent infinite loop
        if (counter > 100) {
            domain = `${baseSlug}-${Date.now()}`;
            break;
        }
    }

    return domain;
}

exports.createDomain = async (req, res) => {
    try {
        const { businessName } = req.body;
        if (!businessName) { return res.status(400).json({ error: 'Business name is required' }) }
        const domain = await generateUniqueDomain(businessName);
        res.json({ domain, fullUrl: `simplybooking.org/${domain}` });
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

        // Upload files to Cloudinary (or S3) and get URLs
        if (req.files?.businessLogo) {
            const file = req.files.businessLogo[0];
            const result = await cloudinary.uploader.upload_stream({ resource_type: 'image' }, (error, result) => {
                if (error) throw error;
                businessData.businessLogo = result.secure_url;
            });
        }

        if (req.files?.businessCoverPhoto) {
            const file = req.files.businessCoverPhoto[0];
            const result = await cloudinary.uploader.upload_stream({ resource_type: 'image' }, (error, result) => {
                if (error) throw error;
                businessData.businessCoverPhoto = result.secure_url;
            });
        }

        // Domain logic
        if (businessData.domain) {
            const existing = await Business.findOne({ domain: businessData.domain });
            if (existing) return res.status(400).json({ error: 'Domain already exists' });
        } else {
            businessData.domain = await generateUniqueDomain(businessData.businessName);
        }

        const business = new Business(businessData);
        await business.save();

        res.status(201).json({
            success: true,
            business,
            message: 'Business created successfully'
        });
    } catch (error) {
        console.error('Error creating business:', error);
        res.status(500).json({ error: 'Failed to create business' });
    }
};

// exports.createBusiness = async (req, res) => {
//     try {
//         const businessData = req.body;

//         if (businessData.domain) {
//             const existing = await Business.findOne({ domain: businessData.domain });
//             if (existing) { return res.status(400).json({ error: 'Domain already exists' }) }
//         } else {
//             businessData.domain = await generateUniqueDomain(businessData.businessName);
//         }

//         const business = new Business(businessData);
//         await business.save();

//         res.status(201).json({
//             success: true,
//             business,
//             message: 'Business created successfully'
//         });
//     } catch (error) {
//         console.error('Error creating business:', error);
//         res.status(500).json({ error: 'Failed to create business' });
//     }
// }

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
        const business = await Business.findById(req.params.id);
        if (!business) {
            return res.status(404).json({ error: 'Business not found' });
        }
        res.json(business);
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



