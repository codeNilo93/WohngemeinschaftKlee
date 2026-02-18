const express = require('express');
const nodemailer = require('nodemailer');
// Load environment variables if you want to be secure (optional but recommended)
// require('dotenv').config(); 

const app = express();
const port = 3000;

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public')); 

app.post('/send-email', async (req, res) => {
    console.log("HELLO THERE")
    // 1. Match these variables to your HTML form names!
    const { name, email, phone, message } = req.body;

    // 2. Outlook / Office 365 Configuration
    let transporter = nodemailer.createTransport({
        host: "smtp.office365.com", // Official Outlook/Office365 host
        port: 587,                  // Standard secure port
        secure: false,              // False for port 587 (uses STARTTLS)
        auth: {
            user: "klee-wghdresden@outlook.de", // Your email address
            pass: "YOUR_APP_PASSWORD"               // Your App Password (see notes below)
        },
        tls: {
            ciphers: 'SSLv3' // Sometimes needed for Outlook to work reliably
        }
    });

    try {
        // 3. Send the email
        let info = await transporter.sendMail({
            from: '"WG Klee Website" <YOUR_OUTLOOK_EMAIL@outlook.com>', // MUST be same as auth.user
            to: "klee-wghdresden@outlook.de", // Where you want to receive the notification
            subject: `Neue Kontaktanfrage von ${name}`, 
            html: `
                <h3>Neue Nachricht via WG Kleeblatt</h3>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Telefon:</strong> ${phone}</p>
                <br>
                <p><strong>Nachricht:</strong></p>
                <p>${message}</p>
            `,
        });

        console.log("Message sent: %s", info.messageId);
        
        // Simple success response
        res.send(`
            <div style="font-family: sans-serif; text-align: center; padding: 50px;">
                <h1 style="color: green;">Nachricht erfolgreich gesendet!</h1>
                <p>Vielen Dank, wir melden uns bald bei Ihnen.</p>
                <a href="/contact.html" style="text-decoration: none; background: #3b82f6; color: white; padding: 10px 20px; border-radius: 5px;">Zurück zur Seite</a>
            </div>
        `);
        
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).send(`
            <div style="font-family: sans-serif; text-align: center; padding: 50px;">
                <h1 style="color: red;">Fehler beim Senden</h1>
                <p>Leider ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.</p>
                <p>Error details: ${error.message}</p>
                <a href="/contact.html">Zurück</a>
            </div>
        `);
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});