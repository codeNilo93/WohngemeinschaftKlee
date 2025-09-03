const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Your Email Credentials (use environment variables in production!)
const transporter = nodemailer.createTransport({
  service: 'gmail', // You can use other services like 'Outlook', 'Yahoo', etc.
  auth: {
    user: 'your_email@gmail.com',
    pass: 'your_app_password' // Use a specific app password for this.
  }
});

app.post('/send-email', (req, res) => {
  const { name, email, message } = req.body;

  const mailOptions = {
    from: email,
    to: 'your_email@gmail.com',
    subject: `Contact Form Submission from ${name}`,
    text: `You have received a new message from your website contact form.
           Name: ${name}
           Email: ${email}
           Message: ${message}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error sending email.' });
    }
    console.log('Message sent: %s', info.messageId);
    res.status(200).json({ message: 'Message sent successfully!' });
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});