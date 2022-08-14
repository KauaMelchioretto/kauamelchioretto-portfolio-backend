const express = require("express");
const router = express.Router();
const cors = require("cors");
const nodemailer = require("nodemailer");

// server used to send the emails
const app = express();
app.use(cors());
app.use(express.json());
app.use("/", router);
app.listen(3001, () => console.log("Server running"));
console.log(process.env.EMAIL_USER);
console.log(process.env.EMAIL_PASS);

const contactEmail = nodemailer.createTransport({
    service: "outlook",
    auth: {
        user: "kauamelchioretto@outlook.com",
        pass:   "Sandro123",
    },
});

contactEmail.verify((error) => {
    if (error) {
        console.log("Error: " + error);
    } else {
        console.log("Ready to Send.");
    }
})

router.post("/contact", (request, response) => {
    const { name } = request.body;
    const { email } = request.body;
    const { message } = request.body;
    const { phone } = request.body;
    const mail = {
        from: name,
        to: "kauamelchioretto@outlook.com",
        subject: "Contact Form Submission - Portfolio",
        html: `<p>Name: ${name} </p>
        <p>Email: ${email} </p>
        <p>Phone: ${phone} </p>
        <p>Message: ${message} </p>`,
    };

    contactEmail.sendMail(mail, (error) => {
        if (error){
            response.send(error);
        } else {
            response.send({code: 200, status: "Message Sent"});
        }
    });
});