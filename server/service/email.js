const nodemailer = require('nodemailer');

// Create a transporter using Gmail SMTP
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'leonchandler555@gmail.com', // Enter your Gmail email address
    pass: 'vncepqqtlwcelbsv', // Enter your Gmail password
  },
});

// Send email function
const sendEmail = async (to, subject, text) => {
  try {
    // Define email options
    const mailOptions = {
      from: 'Team Aamdani',
      to,
      subject,
      text,
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.messageId);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

module.exports = {
  sendEmail,
};
