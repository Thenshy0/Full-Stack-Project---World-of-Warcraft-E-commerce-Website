const {
  securePassword,
  comparePassword,
} = require("../helpers/bcryptPassword");
const createError = require("http-errors");
const jwt = require("jsonwebtoken");
const User = require("../models/users");
const dev = require("../config");
const ExcelJS = require("exceljs");
const { sendResponse } = require("../helpers/responseHandler");

const loginAdmin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      throw createError(404, "email or password is missing");
    if (password.length < 6)
      throw createError(404, "minimum length for password is 6 characters");

    const user = await User.findOne({ email: email });
    if (!user)
      throw createError(
        400,
        "user with this email does not exist, please register first"
      );
    if (user.is_admin === 0) throw createError(401, "user is not an admin");
    const isPasswordMatch = await comparePassword(password, user.password);
    if (!isPasswordMatch)
      throw createError(400, "email/password does not match");

    const token = jwt.sign({ email }, dev.app.jwtAuthorisationKey, {
      expiresIn: "5m",
    });

    // Send token to client
    res.cookie("authToken", token, {
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 60 * 4),
      secure: false,
      sameSite: "none",
    });
    sendResponse(res, 200, "login successful as an admin", {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        image: user.image,
      },
    });
  } catch (error) {
    next(error);
  }
};
const logoutAdmin = (req, res, next) => {
  try {
    res.clearCookie("authToken");
    sendResponse(res, 200, "logout successful");
  } catch (error) {
    next(error);
  }
};
const getAllusers = async (req, res, next) => {
  try {
    let search = req.query.search ? req.query.search : "";
    const { page = 1, limit = 2 } = req.query;
    const users = await User.find({
      is_admin: 0,
      $or: [
        { name: { $regex: ".*" + search + ".*", $options: "i" } },
        { email: { $regex: ".*" + search + ".*", $options: "i" } },
        { phone: { $regex: ".*" + search + ".*", $options: "i" } },
      ],
    })
      .sort({ name: 1 })
      .limit(limit)
      .skip((page - 1) * limit);

    const count = await User.find({ is_admin: 0 }).countDocuments();
    sendResponse(res, 200, "return all users", {
      total: count,
      users: users,
    });
  } catch (error) {
    next(error);
  }
};
const deleteUserbyAdmin = async (req, res, next) => {
  try {
    const { id } = req.params;
    const users = await User.findById(id);
    if (!users) throw createError(404, "user was not found with this id");
    await User.findByIdAndDelete(id);
    sendResponse(res, 200, `User was deleted by admin`);
  } catch (error) {
    next(error);
  }
};
const updateUserByAdmin = async (req, res, next) => {
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
    if (!userData) throw createError(400, "User was not updated");
    await userData.save();
    sendResponse(res, 200, `User was updated by admin`);
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
  loginAdmin,
  logoutAdmin,
  getAllusers,
  deleteUserbyAdmin,
  updateUserByAdmin,
  exportUsers,
};
