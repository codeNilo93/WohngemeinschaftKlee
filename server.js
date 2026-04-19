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
        service: "gmail",
        auth: {
            user: "Daniloblub330@gmail.com", // Your email address
            pass: "izyq yxqj lkbr phiq"               // Your App Password (see notes below)
        }
    });

try {
        // 3. Send the email
        let info = await transporter.sendMail({
            from: '"WG Klee Website" <Daniloblub330@gmail.com>', // MUST be same as auth.user
            to: "Daniloblub330@gmail.com", // Where you want to receive the notification
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
        
        // NEU: Wir senden ein JSON-Objekt mit einer Erfolgsnachricht zurück
        res.status(200).json({ 
            message: "Nachricht erfolgreich gesendet! Wir melden uns bald bei Ihnen." 
        });
        
    } catch (error) {
        console.error("Error sending email:", error);
        
        // NEU: Wir senden ein JSON-Objekt mit einer Fehlernachricht zurück
        res.status(500).json({ 
            message: "Leider ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut." 
        });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});