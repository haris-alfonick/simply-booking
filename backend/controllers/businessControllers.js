const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Business = require('../models/Business');
const upload = require('../middleware/upload');
const app = express();
app.use('/uploads', express.static('uploads'));

// if (!fs.existsSync('uploads')) { fs.mkdirSync('uploads') }



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


// create business logic


exports.createBusiness = async (req, res) => {
  try {
    // Destructure the necessary fields directly from req.body
    const {
      email,
      businessName,
      phoneNumber,
      cityTown,
      businessDescription,
      domain,
      userId,
      serviceAreas,
      hours,
      services,
      questions
    } = req.body;

    // Email check for duplicates
    const existingEmail = await Business.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({
        success: false,
        message: "Email already registered"
      });
    }

    // Domain logic: Check if domain exists
    if (domain) {
      const existingDomain = await Business.findOne({ domain });
      if (existingDomain) {
        return res.status(400).json({
          success: false,
          message: "Domain already exists"
        });
      }
    } else {
      // If no domain is provided, generate one from the business name
      businessData.domain = await generateUniqueDomain(businessName);
    }

    // Create the business object using the destructured fields
    const businessData = {
      businessName,
      phoneNumber,
      email,
      cityTown,
      businessDescription,
      domain: businessData.domain, // Use the domain from above
      userId, 
      serviceAreas: JSON.parse(serviceAreas),
      hours: JSON.parse(hours),
      services: JSON.parse(services),
      questions: JSON.parse(questions)
    };

    const business = new Business(businessData);

    // File Upload Handling
    if (req.files) {
      // Check if businessLogo exists in the uploaded files
      if (req.files.businessLogo) {
        business.businessLogo = {
          data: fs.readFileSync(req.files.businessLogo[0].path), // Multer stores files as arrays
          contentType: req.files.businessLogo[0].mimetype
        };
      }

      // Check if businessCoverPhoto exists in the uploaded files
      if (req.files.businessCoverPhoto) {
        business.businessCoverPhoto = {
          data: fs.readFileSync(req.files.businessCoverPhoto[0].path),
          contentType: req.files.businessCoverPhoto[0].mimetype
        };
      }
    }

    // Save the business to the database
    await business.save();

    // Respond with success message
    res.status(201).json({
      success: true,
      message: "Business created successfully",
      business
    });

  } catch (error) {
    console.error("Error creating business:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create business"
    });
  }
};

// exports.createBusiness = async (req, res) => {
//     try {

//         const { email, businessName, phoneNumber, cityTown, businessDescription, domain, userId, serviceAreas, hours, services, questions } = req.body;
//         const businessData = req.body;
//         // console.log(email)

//         // businessData.userId = req.user._id;

//         /* ---------- Email Check ---------- */
//         const existingEmail = await Business.findOne({ email });
//         if (existingEmail) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Email already registered"
//             });
//         }

//         // /* ---------- Domain Logic ---------- */
//         if (businessData.domain) {
//             const existingDomain = await Business.findOne({ domain: businessData.domain });
//             if (existingDomain) {
//                 return res.status(400).json({
//                     success: false,
//                     message: "Domain already exists"
//                 });
//             }
//         } else {
//             businessData.domain = await generateUniqueDomain(businessData.businessName);
//         }

//         // /* ---------- Create Business ---------- */
//         const business = new Business(businessData);

//         // /* ---------- File Uploads ---------- */

//         if (req.files) {
//             if (req.files.businessLogo) {
//                 business.businessLogo = {
//                     data: fs.readFileSync(req.files.businessLogo.path),
//                     contentType: req.files.businessLogo.type
//                 };
//             }

//             if (req.files.businessCoverPhoto) {
//                 business.businessCoverPhoto = {
//                     data: fs.readFileSync(req.files.businessCoverPhoto.path),
//                     contentType: req.files.businessCoverPhoto.type
//                 };
//             }
//         }

//         await business.save();

//         res.status(201).json({
//             success: true,
//             message: "Business created successfully",
//             business
//         });

//     } catch (error) {
//         console.error("Error creating business:", error);
//         res.status(500).json({
//             success: false,
//             message: "Failed to create business"
//         });
//     }
// };


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
    console.log(req.params.id)
    try {
        const business = await Business.findById({ userId: req.params.id }).populate('userId');
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





// Upload files to Cloudinary (or S3) and get URLs
// if (req.files?.businessLogo) {
//     const file = req.files.businessLogo[0];
//     const result = await cloudinary.uploader.upload_stream({ resource_type: 'image' }, (error, result) => {
//         if (error) throw error;
//         businessData.businessLogo = result.secure_url;
//     });
// }

// if (req.files?.businessCoverPhoto) {
//     const file = req.files.businessCoverPhoto[0];
//     const result = await cloudinary.uploader.upload_stream({ resource_type: 'image' }, (error, result) => {
//         if (error) throw error;
//         businessData.businessCoverPhoto = result.secure_url;
//     });
// }


