const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const nodemailer = require('nodemailer');

const connectDB = require('./db');
const Contact = require('./models/Contact');
const Tracking = require('./models/Tracking');

const app = express();

// ========================
// MIDDLEWARE
// ========================
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// ========================
// EMAIL SETUP (UNCHANGED)
// ========================
const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: "fridayvictor85@gmail.com",
        pass: "wffwobatyxqtarwv"
    },
    family: 4
});

// CHECK EMAIL CONNECTION
transporter.verify((error) => {
    if (error) {
        console.log("EMAIL ERROR ❌");
        console.log(error.message);
    } else {
        console.log("EMAIL READY ✔");
    }
});

// ========================
// CONTACT ROUTE (FIXED)
// ========================
app.post('/contact', async (req, res) => {

    console.log("CONTACT ROUTE HIT ✔");
    console.log("BODY RECEIVED:", req.body);

    try {

        const { name, phone, email, message } = req.body;

        // STRICT VALIDATION
        if (!name || !phone || !email || !message) {
            console.log("❌ Missing fields");

            return res.status(400).json({
                success: false,
                message: "All fields are required ❌"
            });
        }

        // SAVE TO DATABASE (SAFE)
        const newContact = new Contact({ name, phone, email, message });
        await newContact.save();

        console.log("✔ SAVED TO MONGODB");

        // EMAIL (DO NOT BREAK RESPONSE IF FAILS)
        transporter.sendMail({
            from: "Easy Travel <fridayvictor85@gmail.com>",
            to: "fridayvictor85@gmail.com",
            subject: "New Contact Message",
            html: `
                <h2>New Contact</h2>
                <p><b>Name:</b> ${name}</p>
                <p><b>Phone:</b> ${phone}</p>
                <p><b>Email:</b> ${email}</p>
                <p><b>Message:</b> ${message}</p>
            `
        })
        .then(() => console.log("✔ EMAIL SENT"))
        .catch(err => console.log("❌ EMAIL FAILED:", err.message));

        // ALWAYS SEND SUCCESS RESPONSE
        return res.status(200).json({
            success: true,
            message: "Message sent successfully ✔"
        });

    } catch (err) {

        console.log("❌ CONTACT ROUTE ERROR:", err);

        return res.status(500).json({
            success: false,
            message: "Server error ❌"
        });
    }
});

// ========================
// TRACK ROUTE (UNCHANGED)
// ========================
app.post('/track', async (req, res) => {

    try {

        const newTracking = new Tracking({
            trackingNumber: req.body.trackingNumber
        });

        await newTracking.save();

        console.log("TRACK SAVED ✔");

        return res.json({
            success: true,
            message: "Tracking saved ✔"
        });

    } catch (err) {

        console.log("TRACK ERROR ❌", err.message);

        return res.status(500).json({
            success: false,
            message: "Tracking failed ❌"
        });
    }
});

// ========================
// CONNECT DB + START SERVER
// ========================
connectDB()
    .then(() => {
        console.log("MongoDB Connected ✔");

        app.listen(3000, () => {
            console.log("Server running on http://localhost:3000");
        });

    })
    .catch((err) => {
        console.log("MongoDB FAILED ❌");
        console.log(err.message);
    });