const User = require("../models/User");
const sendEmail = require("../utils/sendEmail");

const generateOTP = () =>
  Math.floor(100000 + Math.random() * 900000).toString();


exports.registerUser = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "Email already exists" });

    const otp = generateOTP();

    user = await User.create({
      fullname,
      email,
      password,
      verificationCode: otp,
      verificationExpire: Date.now() + 5 * 60 * 1000, // 5 minutes
    });

    await sendEmail(
      email,
      "Email Verification Code",
      `Your verification code is ${otp}`
    );

    res.status(201).json({
      success: true,
      message: "Verification code sent to email",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.verifyOTP = async (req, res) => {
  try {
    const { email, code } = req.body;

    const user = await User.findOne({
      email,
      verificationCode: code,
      verificationExpire: { $gt: Date.now() },
    });

    if (!user)
      return res.status(400).json({ message: "Invalid or expired code" });

    user.isVerified = true;
    user.verificationCode = undefined;
    user.verificationExpire = undefined;
    await user.save();

    res.json({ success: true, message: "Email verified successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
