const nodeMailer = require('nodemailer');
const catchAsyncError = require('../middleware/asyncError');
const { config } = require('dotenv');
const { resolve } = require('path');

const result = config({ path: resolve(__dirname, '../config/.env') });
if (result.error) {
    console.log(result.error);
}

const sendEmail = catchAsyncError(async (options) => {
    const transporter = nodeMailer.createTransport({
    host: process.env.SMTP_SERVICE,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
      },
  });
    const mailOptions = {
        from: "bhatchaitanya420@gmail.com",
        to: options.email,
        subject: options.subject,
        // text: options.message,
        html: options.html,
        // attachments: options.attachments,
    }
    await transporter.sendMail(mailOptions)
});
module.exports = sendEmail;