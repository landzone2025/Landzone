const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/send-email', (req, res) => {
  const { name, phone } = req.body;

  // Mailtrap SMTP config
  const transporter = nodemailer.createTransport({
    host: 'sandbox.smtp.mailtrap.io',
    port: 587,
    auth: {
      user: 'fdc2c93f126d38',  // <-- replace with your Mailtrap username
      pass: '71a1ee46ed233a'   // <-- replace with your Mailtrap password
    }
  });

  const mailOptions = {
    from: 'noreply@example.com',
    to: 'test@example.com',
    subject: 'New Form Submission',
    text: `Name: ${name}\nPhone: ${phone}`,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error sending email');
    } else {
      console.log('Email sent:', info.response);
      res.send('Email sent successfully!');
    }
  });
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
