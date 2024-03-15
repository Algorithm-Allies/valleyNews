//can put logic here to send email when user signs up and when user requests password reset
//can use nodemailer package
const nodemailer = require("nodemailer");
const dotenv = require("dotenv").config();
const port = process.env.PORT;

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_PASSWORD,
  },
});

const sendVerificationEmail = async (email, verificationToken) => {
  // Construct verification link
  const encodedToken = encodeURIComponent(verificationToken);
  const verificationLink = `http://localhost:${port}/api/users/verify?token=${encodedToken}`;

  // Email options
  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "Verify Your Email Address",
    html: `Click <a href="${verificationLink}">here</a> to verify your email address.`,
  };

  // Send email
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

// Send password reset email
const sendPasswordResetEmail = async (email, token) => {
  const resetLink = `http://localhost:8000/reset-password?token=${token}`;
  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "Password Reset Request",
    text: `To reset your password, please click on the following link: ${resetLink}`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

module.exports = {
  transporter,
  sendVerificationEmail,
  sendPasswordResetEmail,
};
