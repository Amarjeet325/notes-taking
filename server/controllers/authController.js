const jwt = require('jsonwebtoken');
const User = require('../models/User');
const {
    generateOTP,
    sendOtpEmail,
    storeOTP,
    verifyOTP
} = require('../utils/sendOtp');

exports.signup = async (req, res) => {
    const { name, dob, email } = req.body;
    if (!name || !dob || !email) return res.json({ success: false, message: 'All fields are required' });

    try {
        let user = await User.findOne({ email });
        if (!user) {
            user = new User({ name, dob, email });
            await user.save();
        }

        const otp = generateOTP();
        storeOTP(email, otp);
        await sendOtpEmail(email, otp);

        return res.json({ success: true, message: 'OTP sent to email' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

exports.login = async (req, res) => {
    const { email, otp } = req.body;
    if (!email || !otp) return res.json({ success: false, message: 'Email and OTP are required' });

    try {
        const isValid = verifyOTP(email, otp);
        if (!isValid) return res.json({ success: false, message: 'Invalid or expired OTP' });

        const user = await User.findOne({ email });
        if (!user) return res.json({ success: false, message: 'User not found' });

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        return res.json({
            success: true,
            message: 'Login successful',
            jwtToken: token,
            name: user.name
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};
