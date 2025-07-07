const nodemailer = require('nodemailer');

const otpStore = {}; // { email: { otp, expiry } }

function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

function sendOtpEmail(email, otp) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Your OTP Code',
        text: `Your OTP is ${otp}. It is valid for 5 minutes.`
    };

    return transporter.sendMail(mailOptions);
}

function storeOTP(email, otp) {
    otpStore[email] = {
        otp,
        expiry: Date.now() + 5 * 60 * 1000 // 5 mins
    };
}

function verifyOTP(email, inputOtp) {
    const record = otpStore[email];
    if (!record) return false;
    if (Date.now() > record.expiry) return false;
    return record.otp === inputOtp;
}

module.exports = {
    generateOTP,
    sendOtpEmail,
    storeOTP,
    verifyOTP,
};
