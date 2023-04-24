const {
  securePassword,
  comparePassword,
} = require("../helpers/bcryptPassword");
const createError = require("http-errors");
const jwt = require("jsonwebtoken");
const User = require("../models/users");
const dev = require("../config");
const { sendEmailWithNodeMailer } = require("../helpers/email");
const { sendResponse } = require("../helpers/responseHandler");

const registerUser = async (req, res, next) => {
  try {
    const { name, email, phone, password } = req.body;
    const user = await User.findOne({ email: email });
    if (user) throw createError(400, "user with this email is already exist");
    if (!name || !email || !phone || !password)
      throw createError(404, "name, email, phone or password is missing");
    if (password.length < 6)
      throw createError(404, "minimum length for password is 6 characters");

    const image = req.file && req.file.filename;
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
    sendResponse(
      res,
      200,
      "A verification link has been sent to your email.",
      token
    );
  } catch (error) {
    next(error);
  }
};

const verifyEmail = async (req, res, next) => {
  try {
    const { token } = req.body;
    if (!token) throw createError(404, "token is missing");
    jwt.verify(token, dev.app.jwtSecretKey, async function (err, decoded) {
      if (err) throw createError(401, "token is expired");

      //   decoded the data
      const { name, email, hashedPassword, phone, image } = decoded;
      const isExist = await User.findOne({ email: email });
      if (isExist)
        throw createError(400, "user with this email is already exist");
      //   create the user
      const newUser = new User({
        name: name,
        email: email,
        password: hashedPassword,
        phone: phone,
        image,
        is_verified: 1,
      });

      //   save the user
      const user = await newUser.save();
      if (!user) throw createError(400, "user was not created");
      sendResponse(
        res,
        200,
        "Your account has been activated successfully!",
        token
      );
    });
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
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

    const isPasswordMatch = await comparePassword(password, user.password);
    if (!isPasswordMatch)
      throw createError(400, "email/password does not match");
    if (user.isBanned)
      throw createError(400, "This account is banned, please contact an admin");
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
    sendResponse(res, 200, "login successful", {
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
const logoutUser = (req, res, next) => {
  try {
    res.clearCookie("authToken");
    sendResponse(res, 200, "logout successful");
  } catch (error) {
    next(error);
  }
};
const userProfile = async (req, res, next) => {
  try {
    const id = req.params.id;
    const userData = await User.findById(id, { password: 0 });
    if (!userData) throw createError(404, "Profile is not found");
    sendResponse(res, 200, "Profile returned", { user: userData });
  } catch (error) {
    next(error);
  }
};
const deleteUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    await User.findByIdAndDelete(id);
    sendResponse(res, 200, `User was deleted`);
  } catch (error) {
    next(error);
  }
};
const updateUser = async (req, res) => {
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
    sendResponse(res, 200, "User was updated");
  } catch (error) {
    next(error);
  }
};
const forgetPassword = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      throw createError(404, "email or password is missing");
    if (password.length < 6)
      throw createError(404, "minimum length for password is 6 characters");
    const user = await User.findOne({ email: email });
    if (!user) throw createError(400, "user with this email was not found");
    const hashedPassword = await securePassword(password);
    const token = jwt.sign({ email, hashedPassword }, dev.app.jwtSecretKey, {
      expiresIn: "10min",
    });
    // prepare the email
    const emailData = {
      email,
      subject: "Reset your password",
      html: `
        <h2> Hello ${user.name} . </h2>
        <p> Please click here to <a href="${dev.app.clientUrl}/api/users/reset-password/${token}" target="_blank"> reset your password </a></p>     
        `,
    };

    sendEmailWithNodeMailer(emailData);
    sendResponse(
      res,
      200,
      "An email has been sent for reseting password",
      token
    );
  } catch (error) {
    next(error);
  }
};
const resetPassword = async (req, res, next) => {
  try {
    const { token } = req.body;
    if (!token) throw createError(404, "token is missing");
    jwt.verify(token, dev.app.jwtSecretKey, async function (error, decoded) {
      if (error) throw createError(401, "token is expired");
      //   decoded the data
      const { email, hashedPassword } = decoded;
      const isExist = await User.findOne({ email: email });
      if (!isExist)
        throw createError(400, "user with this email does not exist");
      //   update the user
      const updateData = await User.updateOne(
        { email: email },
        {
          $set: {
            password: hashedPassword,
          },
        }
      );
      if (!updateData) throw createError(400, "Password reset failed");
      sendResponse(res, 200, "Password reset was successful");
    });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  registerUser,
  verifyEmail,
  loginUser,
  logoutUser,
  userProfile,
  deleteUser,
  updateUser,
  forgetPassword,
  resetPassword,
};
