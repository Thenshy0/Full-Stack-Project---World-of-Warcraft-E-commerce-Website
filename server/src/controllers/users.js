const { securePassword } = require("../helpers/bcryptPassword");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const User = require("../models/users");
const dev = require("../config");
const { sendEmailWithNodeMailer } = require("../helpers/email");

const registerUser = async (req, res) => {
  try {
    const { name, email, phone, password } = req.fields;
    const { image } = req.files;
    if (!name || !email || !phone || !password) {
      res.status(404).json({
        message: "name, email, phone or password is missing",
      });
    }
    if (password.length < 6) {
      res.status(404).json({
        message: "minimum length for password is 6 characters",
      });
    }
    if (image && image.size > 1000000) {
      res.status(400).json({
        message: "maximum size for image is 1mb",
      });
    }

    const isExist = await User.findOne({ email: email });
    if (isExist) {
      res.status(400).json({
        message: "user with this email is already exist",
      });
    }
    const hashedPassword = await securePassword(password);
    const token = jwt.sign(
      { name, email, phone, hashedPassword, image },
      dev.app.jwtSecretKey,
      { expiresIn: "10min" }
    );
    // prepare the email
    const emailData = {
      email,
      subject: "Account Activation Email",
      html: `
        <h2> Hello ${name} . </h2>
        <p> Please click here to <a href="${dev.app.clientUrl}/api/users/activate/${token}" target="_blank"> activate your account </a></p>     
        `,
    };

    sendEmailWithNodeMailer(emailData);

    res.status(200).json({
      message: "A verification link has been sent to your email.",
      token: token,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const verifyEmail = async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) {
      return res.status(404).json({
        message: "token is missing",
      });
    }
    jwt.verify(token, dev.app.jwtSecretKey, async function (err, decoded) {
      if (err) {
        return res.status(401).json({
          message: "token is expired",
        });
      }
      //   decoded the data
      const { name, email, hashedPassword, phone, image } = decoded;
      const isExist = await User.findOne({ email: email });
      if (isExist) {
        res.status(400).json({
          message: "user with this email is already exist",
        });
      }
      //   create the user
      const newUser = new User({
        name: name,
        email: email,
        password: hashedPassword,
        phone: phone,
        is_verified: 1,
      });
      if (image) {
        newUser.image.data = fs.readFileSync(image.path);
        newUser.image.contentType = image.type;
      }

      //   save the user
      const user = await newUser.save();
      if (!user) {
        res.status(400).json({
          message: "user was not created",
        });
      }
      res.status(200).json({
        user,
        message: "user was created, ready to sign in",
      });
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = { registerUser, verifyEmail };
