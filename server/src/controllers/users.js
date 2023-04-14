const { securePassword } = require("../helpers/bcryptPassword");
const User = require("../models/users");

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

    res.status(201).json({
      message: "user is created",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = { registerUser };
