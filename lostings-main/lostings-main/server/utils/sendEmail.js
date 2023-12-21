const nodemailer = require("nodemailer");

const sendEmail = async (options)=>{
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      let mailOptions = {
        from: process.env.EMAIL_USER,
        to: options.email,
        subject: options.subject,
        text: options.message,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log("Error sending email:", error);
          res.status(500).send("Failed to send email");
        } else {
          console.log("Email sent:", info.response);
          res.send("Email sent successfully");
        }
      });
}

module.exports = sendEmail;