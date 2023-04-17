const {
  securePassword,
  comparePassword,
} = require("../helpers/bcryptPassword");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const User = require("../models/users");
const dev = require("../config");
const { sendEmailWithNodeMailer } = require("../helpers/email");

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(404).json({
        message: " email or password is missing",
      });
    }
    if (password.length < 6) {
      res.status(404).json({
        message: "minimum length for password is 6 characters",
      });
    }
    const user = await User.findOne({ email: email });
    if (!user) {
      res.status(400).json({
        message: "user with this email does not exist, please register first",
      });
    }
    if (user.is_admin === 0) {
      return res.status(400).json({
        message: "user is not an admin",
      });
    }
    const isPasswordMatch = await comparePassword(password, user.password);
    if (!isPasswordMatch) {
      res.status(400).json({
        message: "email/password does not match",
      });
    }
    req.session.userId = user._id;

    res.status(200).json({
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        image: user.image,
      },
      message: "login successful",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const logoutAdmin = (req, res) => {
  try {
    req.session.destroy();
    res.clearCookie("admin-session");
    res.status(200).json({
      message: "logout successful",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  loginAdmin,
  logoutAdmin,
};
