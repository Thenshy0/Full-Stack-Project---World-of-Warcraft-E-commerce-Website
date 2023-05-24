const nodemailer = require("nodemailer");
const dev = require("../config");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: dev.app.smtpUsername, // generated ethereal user
    pass: dev.app.smtpPassword, // generated ethereal password
  },
});

exports.sendEmailWithNodeMailer = async (emailData) => {
  try {
    const mailOptions = {
      from: dev.app.smtpUsername, // sender address
      to: emailData.email, // list of receivers
      subject: emailData.subject, // Subject line
      html: emailData.html, // html body
    };

    // send mail with defined transport object
    const info = await transporter.sendMail(mailOptions);
    console.log("Info", info);
  } catch (error) {
    console.error("Problem sending Email: ", error);
    throw error;
  }
};
