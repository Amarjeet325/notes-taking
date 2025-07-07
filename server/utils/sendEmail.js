const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

module.exports = async (to, content) => {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject: 'Your OTP Code',
    text: content
  });
};
