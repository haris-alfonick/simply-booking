// controllers/authController.js
const nodemailer = require('nodemailer');
const User = require('../models/User');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

dotenv.config({ path: 'config.env' });
// Generate 6-digit OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Configure nodemailer transporter with better error handling
const createTransporter = () => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.error('ERROR: EMAIL_USER and EMAIL_PASS must be set in .env file');
    throw new Error('Email credentials not configured');
  }

  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
};

let transporter;
try {
  transporter = createTransporter();
  console.log('Email transporter configured successfully');
} catch (error) {
  console.error('Failed to configure email transporter:', error.message);
}

// Send OTP Email
exports.sendOTP = async (req, res) => {
  try {
    // Check if transporter is configured
    if (!transporter) {
      return res.status(500).json({
        success: false,
        message: 'Email service not configured. Please contact administrator.'
      });
    }

    const { fullname, email, password } = req.body;

    // Validate input
    if (!fullname || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser && existingUser.isVerified) {
      return res.status(400).json({
        success: false,
        message: 'Email already registered'
      });
    }

    // Generate OTP
    const otp = generateOTP();
    const otpExpiry = Date.now() + 10 * 60 * 1000; // 10 minutes

    // Save or update user with OTP
    if (existingUser) {
      existingUser.fullname = fullname;
      existingUser.password = password; // Hash in model
      existingUser.otp = otp;
      existingUser.otpExpiry = otpExpiry;
      await existingUser.save();
    } else {
      await User.create({
        fullname,
        email,
        password, // Hash in model
        otp,
        otpExpiry,
        isVerified: false
      });
    }

    // Email options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'SimplyBooking - Email Verification Code',
      html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #06b6d4;">Welcome to SimplyBooking!</h2>
                    <p>Hello ${fullname},</p>
                    <p>Your verification code is:</p>
                    <div style="background-color: #f0f9ff; padding: 20px; text-align: center; border-radius: 8px; margin: 20px 0;">
                        <h1 style="color: #06b6d4; font-size: 36px; letter-spacing: 8px; margin: 0;">${otp}</h1>
                    </div>
                    <p>This code will expire in 10 minutes.</p>
                    <p>If you didn't request this code, please ignore this email.</p>
                    <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
                    <p style="color: #6b7280; font-size: 12px;">© 2025 SimplyBooking. All rights reserved.</p>
                </div>
            `
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res.status(200).json({
      success: true,
      message: 'OTP sent successfully to your email',
      email: email
    });

  } catch (error) {
    console.error('Send OTP Error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send OTP. Please try again.'
    });
  }
};

// Verify OTP
exports.verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: 'Email and OTP are required'
      });
    }

    // Find user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Check OTP expiry
    if (Date.now() > user.otpExpiry) {
      return res.status(400).json({
        success: false,
        message: 'OTP has expired. Please request a new one.'
      });
    }

    // Verify OTP
    if (user.otp !== otp) {
      return res.status(400).json({
        success: false,
        message: 'Invalid OTP. Please try again.'
      });
    }

    // Mark user as verified
    user.isVerified = true;
    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Email verified successfully!',
      user: {
        id: user._id,
        fullname: user.fullname,
        email: user.email
      }
    });

  } catch (error) {
    console.error('Verify OTP Error:', error);
    res.status(500).json({
      success: false,
      message: 'Verification failed. Please try again.'
    });
  }
};

// Resend OTP
exports.resendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Generate new OTP
    const otp = generateOTP();
    const otpExpiry = Date.now() + 10 * 60 * 1000;

    user.otp = otp;
    user.otpExpiry = otpExpiry;
    await user.save();

    // Send email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'SimplyBooking - New Verification Code',
      html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #06b6d4;">New Verification Code</h2>
                    <p>Hello ${user.fullname},</p>
                    <p>Your new verification code is:</p>
                    <div style="background-color: #f0f9ff; padding: 20px; text-align: center; border-radius: 8px; margin: 20px 0;">
                        <h1 style="color: #06b6d4; font-size: 36px; letter-spacing: 8px; margin: 0;">${otp}</h1>
                    </div>
                    <p>This code will expire in 10 minutes.</p>
                </div>
            `
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({
      success: true,
      message: 'New OTP sent successfully'
    });

  } catch (error) {
    console.error('Resend OTP Error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to resend OTP'
    });
  }
};






exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: 'Email and password are required'
      });
    }

    const user = await User.findOne({ email });
    if (!user) { return res.status(401).json({ message: 'Invalid email or password' }) }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) { return res.status(401).json({ message: 'Invalid email or password' }) }

    if (!user.isVerified) { return res.status(403).json({ message: 'Please verify your account first' }) }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        fullname: user.fullname,
        email: user.email,
        isVerified: user.isVerified
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Server error'
    });
  }
};



// controllers/authController.js
// const nodemailer = require('nodemailer');
// const User = require('../models/User');

// // Generate 6-digit OTP
// const generateOTP = () => {
//   return Math.floor(100000 + Math.random() * 900000).toString();
// };

// // Configure nodemailer transporter
// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: process.env.EMAIL_USER, // Your Gmail
//     pass: process.env.EMAIL_PASS  // Your App Password
//   }
// });

// // Send OTP Email
// exports.sendOTP = async (req, res) => {
//   try {
//     const { fullname, email, password } = req.body;

//     // Validate input
//     if (!fullname || !email || !password) {
//       return res.status(400).json({
//         success: false,
//         message: 'All fields are required'
//       });
//     }

//     // Check if user already exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser && existingUser.isVerified) {
//       return res.status(400).json({
//         success: false,
//         message: 'Email already registered'
//       });
//     }

//     // Generate OTP
//     const otp = generateOTP();
//     const otpExpiry = Date.now() + 10 * 60 * 1000; // 10 minutes

//     // Save or update user with OTP
//     if (existingUser) {
//       existingUser.fullname = fullname;
//       existingUser.password = password; // Hash in model
//       existingUser.otp = otp;
//       existingUser.otpExpiry = otpExpiry;
//       await existingUser.save();
//     } else {
//       await User.create({
//         fullname,
//         email,
//         password, // Hash in model
//         otp,
//         otpExpiry,
//         isVerified: false
//       });
//     }

//     // Email options
//     const mailOptions = {
//       from: process.env.EMAIL_USER,
//       to: email,
//       subject: 'SimplyBooking - Email Verification Code',
//       html: `
//                 <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
//                     <h2 style="color: #06b6d4;">Welcome to SimplyBooking!</h2>
//                     <p>Hello ${fullname},</p>
//                     <p>Your verification code is:</p>
//                     <div style="background-color: #f0f9ff; padding: 20px; text-align: center; border-radius: 8px; margin: 20px 0;">
//                         <h1 style="color: #06b6d4; font-size: 36px; letter-spacing: 8px; margin: 0;">${otp}</h1>
//                     </div>
//                     <p>This code will expire in 10 minutes.</p>
//                     <p>If you didn't request this code, please ignore this email.</p>
//                     <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
//                     <p style="color: #6b7280; font-size: 12px;">© 2025 SimplyBooking. All rights reserved.</p>
//                 </div>
//             `
//     };

//     // Send email
//     await transporter.sendMail(mailOptions);

//     res.status(200).json({
//       success: true,
//       message: 'OTP sent successfully to your email',
//       email: email
//     });

//   } catch (error) {
//     console.error('Send OTP Error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Failed to send OTP. Please try again.'
//     });
//   }
// };

// // Verify OTP
// exports.verifyOTP = async (req, res) => {
//   try {
//     const { email, otp } = req.body;

//     if (!email || !otp) {
//       return res.status(400).json({
//         success: false,
//         message: 'Email and OTP are required'
//       });
//     }

//     // Find user
//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: 'User not found'
//       });
//     }

//     // Check OTP expiry
//     if (Date.now() > user.otpExpiry) {
//       return res.status(400).json({
//         success: false,
//         message: 'OTP has expired. Please request a new one.'
//       });
//     }

//     // Verify OTP
//     if (user.otp !== otp) {
//       return res.status(400).json({
//         success: false,
//         message: 'Invalid OTP. Please try again.'
//       });
//     }

//     // Mark user as verified
//     user.isVerified = true;
//     user.otp = undefined;
//     user.otpExpiry = undefined;
//     await user.save();

//     res.status(200).json({
//       success: true,
//       message: 'Email verified successfully!',
//       user: {
//         id: user._id,
//         fullname: user.fullname,
//         email: user.email
//       }
//     });

//   } catch (error) {
//     console.error('Verify OTP Error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Verification failed. Please try again.'
//     });
//   }
// };

// // Resend OTP
// exports.resendOTP = async (req, res) => {
//   try {
//     const { email } = req.body;

//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: 'User not found'
//       });
//     }

//     // Generate new OTP
//     const otp = generateOTP();
//     const otpExpiry = Date.now() + 10 * 60 * 1000;

//     user.otp = otp;
//     user.otpExpiry = otpExpiry;
//     await user.save();

//     // Send email
//     const mailOptions = {
//       from: process.env.EMAIL_USER,
//       to: email,
//       subject: 'SimplyBooking - New Verification Code',
//       html: `
//                 <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
//                     <h2 style="color: #06b6d4;">New Verification Code</h2>
//                     <p>Hello ${user.fullname},</p>
//                     <p>Your new verification code is:</p>
//                     <div style="background-color: #f0f9ff; padding: 20px; text-align: center; border-radius: 8px; margin: 20px 0;">
//                         <h1 style="color: #06b6d4; font-size: 36px; letter-spacing: 8px; margin: 0;">${otp}</h1>
//                     </div>
//                     <p>This code will expire in 10 minutes.</p>
//                 </div>
//             `
//     };

//     await transporter.sendMail(mailOptions);

//     res.status(200).json({
//       success: true,
//       message: 'New OTP sent successfully'
//     });

//   } catch (error) {
//     console.error('Resend OTP Error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Failed to resend OTP'
//     });
//   }
// };











// //////////////////////////////////////////

// const User = require("../models/User");
// const sendEmail = require("../utils/sendEmail");

// const generateOTP = () =>
//   Math.floor(100000 + Math.random() * 900000).toString();


// exports.registerUser = async (req, res) => {
//   try {
//     const { fullname, email, password } = req.body;

//     let user = await User.findOne({ email });
//     if (user) return res.status(400).json({ message: "Email already exists" });

//     const otp = generateOTP();

//     user = await User.create({
//       fullname,
//       email,
//       password,
//       verificationCode: otp,
//       verificationExpire: Date.now() + 5 * 60 * 1000, // 5 minutes
//     });

//     await sendEmail(
//       email,
//       "Email Verification Code",
//       `Your verification code is ${otp}`
//     );

//     res.status(201).json({
//       success: true,
//       message: "Verification code sent to email",
//     });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };


// exports.verifyOTP = async (req, res) => {
//   try {
//     const { email, code } = req.body;

//     const user = await User.findOne({
//       email,
//       verificationCode: code,
//       verificationExpire: { $gt: Date.now() },
//     });

//     if (!user)
//       return res.status(400).json({ message: "Invalid or expired code" });

//     user.isVerified = true;
//     user.verificationCode = undefined;
//     user.verificationExpire = undefined;
//     await user.save();

//     res.json({ success: true, message: "Email verified successfully" });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };
