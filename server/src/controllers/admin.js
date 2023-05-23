const { securePassword } = require("../helpers/bcryptPassword");
const createError = require("http-errors");
const jwt = require("jsonwebtoken");
const User = require("../models/users");
const dev = require("../config");
const ExcelJS = require("exceljs");
const { sendResponse } = require("../helpers/responseHandler");

const getAllusers = async (req, res, next) => {
  try {
    let search = req.query.search ? req.query.search : "";
    const { page = 1, limit = 10 } = req.query;
    const users = await User.find({
      is_admin: 0,

      $or: [
        { userName: { $regex: ".*" + search + ".*", $options: "i" } },
        { email: { $regex: ".*" + search + ".*", $options: "i" } },
        { phone: { $regex: ".*" + search + ".*", $options: "i" } },
      ],
    })
      .sort({ userName: 1 })
      .limit(limit)
      .skip((page - 1) * limit);

    const admins = await User.find({
      is_admin: 1,
      $or: [
        { userName: { $regex: ".*" + search + ".*", $options: "i" } },
        { email: { $regex: ".*" + search + ".*", $options: "i" } },
        { phone: { $regex: ".*" + search + ".*", $options: "i" } },
      ],
    })
      .sort({ userName: 1 })
      .limit(limit)
      .skip((page - 1) * limit);

    const count = await User.find({ is_admin: 0 }).countDocuments();
    const countadmin = await User.find({ is_admin: 1 }).countDocuments();
    sendResponse(res, 200, "Return all users", {
      totalusers: count,
      admin: countadmin,
      users: users,
      admins: admins,
    });
  } catch (error) {
    next(error);
  }
};

const deleteUserbyAdmin = async (req, res, next) => {
  try {
    const { id } = req.params;
    const users = await User.findById(id);
    if (!users) throw createError(404, "User was not found with this id");
    await User.findByIdAndDelete(id);
    sendResponse(res, 200, `User was deleted by admin`);
  } catch (error) {
    next(error);
  }
};
const updateUserByAdmin = async (req, res, next) => {
  try {
    const { id } = req.params;

    const existingUser = await User.findById(id);
    if (!existingUser) {
      throw createError(400, "User not found");
    }

    const { name, email, userName, password, phone, is_admin, isBanned } =
      req.body;

    if (name) existingUser.name = name;

    if (email) existingUser.email = email;

    if (is_admin) existingUser.is_admin = is_admin;
    if (isBanned) existingUser.isBanned = isBanned;

    if (userName) existingUser.userName = userName;

    if (phone) existingUser.phone = phone;

    if (password) existingUser.password = await securePassword(password);

    if (req.file) existingUser.image = req.file.filename;

    const existingUserEmail = await User.findOne({ email });
    if (existingUserEmail && existingUserEmail._id.toString() !== id) {
      throw createError(400, "Email address already exists in our database");
    }
    const existingUserName = await User.findOne({ userName });
    if (existingUserName && existingUserName._id.toString() !== id) {
      throw createError(400, "User name already exists in our database");
    }
    await existingUser.save();

    sendResponse(res, 200, "User was updated by admin");
  } catch (error) {
    next(error);
  }
};
const exportUsers = async (req, res, next) => {
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
    next(error);
  }
};
module.exports = {
  getAllusers,
  deleteUserbyAdmin,
  updateUserByAdmin,
  exportUsers,
};
