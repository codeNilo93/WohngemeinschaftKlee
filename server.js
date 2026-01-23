const express = require('express');
const nodemailer = require('nodemailer');
const app = express();
const port = 3000;

// Middleware to parse form data from HTML
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static HTML files (like your index.html)
app.use(express.static('public')); 

// POST route to handle the form submission
app.post('/send-email', async (req, res) => {
    const { topic, phone, message, senderEmail } = req.body;

    // --- GENERIC EMAIL CONFIGURATION (Start) ---
    // currently using Ethereal for testing
    let testAccount = await nodemailer.createTestAccount();

    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, 
        auth: {
            user: testAccount.user, 
            pass: testAccount.pass, 
        },
    });
    // --- GENERIC EMAIL CONFIGURATION (End) ---

    try {
        // Send the email
        let info = await transporter.sendMail({
            from: '"Website Contact Form" <no-reply@yourdomain.com>', 
            to: "admin@yourcompany.com", // THE HARDCODED RECEIVER EMAIL
            subject: `New Contact Request: ${topic}`, 
            html: `
                <h3>New Message Received</h3>
                <p><strong>Topic:</strong> ${topic}</p>
                <p><strong>Phone:</strong> ${phone}</p>
                <p><strong>Sender Email:</strong> ${senderEmail}</p>
                <br>
                <p><strong>Message:</strong></p>
                <p>${message}</p>
            `,
        });

        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

        // Send a success response back to the browser
        res.send(`<h1>Email sent successfully!</h1><a href="/">Go back</a>`);
        
    } catch (error) {
        console.error(error);
        res.status(500).send("Error sending email");
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});