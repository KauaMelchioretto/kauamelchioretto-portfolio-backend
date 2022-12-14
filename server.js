const express = require("express");
const router = express.Router();
const cors = require("cors");
const nodemailer = require("nodemailer");
var dotenv = require('dotenv').config;

// server used to send the emails
const app = express();
dotenv.apply();
app.use(cors({origin:'https://kauamelchioretto-portfolio.onrender.com'}));
app.use(express.json());
app.use("/", router);
app.listen(process.env.PORT || 3001, () => {
  console.log(`Server running in port ${process.env.PORT}`);
});

const contactEmail = nodemailer.createTransport({
  service: "Zoho",
  host: 'smtp.zoho.com',
  secure: true,
  port: 465,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

contactEmail.verify((error) => {
  if (error) {
    console.log("Error: " + error);
  } else {
    console.log("Ready to Send");
  }
});

router.post("/contact", (request, response) => {
  const { name } = request.body;
  const { email } = request.body;
  const { message } = request.body;
  const { phone } = request.body;
  const mail = {
    from: process.env.EMAIL_USER,
    to: "kauamelchoretto@gmail.com",
    subject: "Contact Form Submission - Portfolio",
    html: `<p>Name: ${name} </p>
        <p>Email: ${email} </p>
        <p>Phone: ${phone} </p>
        <p>Message: ${message} </p>`,
  };

  contactEmail.sendMail(mail, (error) => {
    if (error) {
      response.send(error);
    } else {
      response.send({ code: 200, status: "Message Sent" });
    }
  });
});
