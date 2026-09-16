require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const app = express();

app.use(express.json({ limit: "20kb" }));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", process.env.FRONTEND_ORIGIN || "*");
  res.setHeader("Access-Control-Allow-Methods", "POST,GET,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.sendStatus(204);
  next();
});

app.get("/", (req, res) => res.json({ message: "MifTech backend is running." }));

app.post("/api/inquiries", async (req, res) => {
  const { name, email, message } = req.body || {};
  if (!name || !email || !message) {
    return res.status(400).json({ error: "Name, email and message are required." });
  }

  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
    return res.status(503).json({ error: "Email service is not configured yet." });
  }

  try {
    const mailer = nodemailer.createTransport({
      service: "gmail",
      auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_APP_PASSWORD }
    });

    await mailer.sendMail({
      from: `MifTech Website <${process.env.GMAIL_USER}>`,
      to: process.env.CONTACT_TO || process.env.GMAIL_USER,
      replyTo: email,
      subject: `New MifTech inquiry from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`
    });

    res.status(201).json({ message: "Inquiry received." });
  } catch (error) {
    console.error("Email delivery failed:", error.message);
    res.status(502).json({ error: "Could not deliver inquiry." });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`MifTech backend running on http://localhost:${PORT}`));
