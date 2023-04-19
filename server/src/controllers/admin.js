const {
  securePassword,
  comparePassword,
} = require("../helpers/bcryptPassword");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const User = require("../models/users");
const dev = require("../config");
const { sendEmailWithNodeMailer } = require("../helpers/email");
const ExcelJS = require("exceljs");

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(404).json({
        message: " email or password is missing",
      });
    }
    if (password.length < 6) {
      res.status(400).json({
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
      return res.status(401).json({
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
const getAllusers = async (req, res) => {
  try {
    const users = await User.find({ is_admin: 0 });
    res.status(200).json({
      message: "return all users",
      users: users,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const deleteUserbyAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const users = await User.findById(id);
    if (!users) {
      return res.status(404).json({
        message: "user was not found with this id",
      });
    }
    await User.findByIdAndDelete(id);
    res.status(200).json({
      message: "User was deleted by admin",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const updateUserByAdmin = async (req, res) => {
  try {
    const hashedPassword = await securePassword(req.body.password);
    const userData = await User.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        password: hashedPassword,
        image: req.file,
      },
      { new: true }
    );
    if (!userData) {
      res.status(400).json({
        message: "User was not updated",
      });
    }
    await userData.save();
    res.status(200).json({
      message: "User was updated by Admin",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const exportUsers = async (req, res) => {
  try {
    const workbook = new ExcelJS.Workbook();

    // Add a new worksheet
    const worksheet = workbook.addWorksheet("Users");

    // Add data to the worksheet

    worksheet.columns = [
      { header: "Name", key: "name" },
      { header: "Email", key: "email" },
      { header: "Password", key: "password" },
      { header: "Image", key: "image" },
      { header: "Phone", key: "phone" },
      { header: "Is Admin", key: "is_admin" },
    ];

    const userData = await User.find({ is_admin: 0 });
    userData.map((user) => {
      worksheet.addRow(user);
    });
    worksheet.getRow(1).eachCell((cell) => {
      cell.font = { bold: true };
    });

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=" + "users.xlsx"
    );
    // Save the workbook to a file
    return workbook.xlsx.write(res).then(() => {
      res.status(200).end();
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
module.exports = {
  loginAdmin,
  logoutAdmin,
  getAllusers,
  deleteUserbyAdmin,
  updateUserByAdmin,
  exportUsers,
};
