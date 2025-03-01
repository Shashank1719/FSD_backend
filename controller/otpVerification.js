const crypto = require("crypto");
const nodemailer = require("nodemailer");
const { getRedisClient } = require("./redisClient");

// Nodemailer setup
const transporter = nodemailer.createTransport({
  secure: true,
  host: "smtp.gmail.com",
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Generate a 6-digit OTP
const generateOTP = () => {
  return crypto.randomInt(100000, 999999).toString();
};

// Send OTP to email
const sendOTP = async (email) => {
  const otp = generateOTP();
  console.log("OTP Generated");

  const redisClient = await getRedisClient();

  redisClient.setEx(email, 600, otp);
  console.log("OTP stored in Redis with mail id: ", email);

  // Send email
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your OTP Verification Code For Crezar India",
    html: `<p>Your OTP for Verification of your account at Crezar India is : <b>${otp}</b><br/>OTP will expire in 10 minutes.</p>`,
  };
  console.log()
  await transporter.sendMail(mailOptions);
  console.log(`OTP sent to ${email}: ${otp}`);
};

// Verify OTP

async function verifyOTP(email, userOtp) {
  const redisClient = await getRedisClient();
  const storedOtp = await redisClient.get(email);
  if (!storedOtp) {
    throw new Error("Otp Expired Please Resend.");
  }
  
  if (storedOtp == userOtp) {    
    await redisClient.del(email); // Remove OTP after successful verification
    console.log("OTP verified successfully");
    return true;
  } else {
    return false
  }
}

module.exports = { sendOTP, verifyOTP };
