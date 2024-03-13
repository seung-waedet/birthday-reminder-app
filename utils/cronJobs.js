const cron = require('node-cron');
const User = require('../models/User'); 
const nodemailer = require('nodemailer');

require('dotenv').config();

// Cron job to send birthday notifications
cron.schedule('0 7 * * *', async () => {
  try {
    const today = new Date();
    const users = await User.find({
      // Query users whose birthday matches the current date
      $expr: { $eq: [{ $dayOfMonth: '$dateOfBirth' }, today.getDate()] },
    });
    

     // Send birthday notifications to users
     users.forEach(user => {
        const mailOptions = prepareEmail(user);
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.error('Error sending email:', error);
          } else {
            console.log('Email sent:', info.response);
          }
    });
})

   
  } catch (error) {
    console.error('Error occurred in cron job:', error);
  }
}, {
  timezone: 'Lagos'
});


// Function to prepare the email template
function prepareEmail(user) {
    return {
      from: process.env.GMAIL,
      to: user.email, // Recipient's email address
      subject: 'Happy Birthday!', // Email subject
      html: `<p>Dear ${user.name},</p>
             <p>Happy Birthday! Wishing you a fantastic day filled with joy and happiness.</p>
             <p>Best regards,<br>Your Name</p>` // HTML content of the email
    };
  }

  

// Create a transporter with Gmail options
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL, 
    pass: process.env.GMAIL_PASSWORD 
  }
});
