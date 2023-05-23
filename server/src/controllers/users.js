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
    const { name, userName, email, phone, password } = req.body;
    const user = await User.findOne({ email: email });
    if (user) throw createError(400, "User with this email is already exist");
    if (!name || !email || !phone || !password || !userName)
      throw createError(404, "Name, email, phone or password is missing");
    if (password.length < 6)
      throw createError(404, "Minimum length for password is 6 characters");

    const image = req.file && req.file.filename;
    const hashedPassword = await securePassword(password);

    const token = jwt.sign(
      { name, userName, email, phone, hashedPassword, image },
      String(dev.app.jwtSecretKey),
      { expiresIn: "30min" }
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
    if (!token) throw createError(404, "Token is missing");
    jwt.verify(
      token,
      String(dev.app.jwtSecretKey),
      async function (err, decoded) {
        if (err) throw createError(401, "Token is expired");

        //   decoded the data
        const { name, userName, email, hashedPassword, phone, image } = decoded;
        const isExist = await User.findOne({ email: email });
        if (isExist)
          throw createError(400, "User with this email is already exist");
        //   create the user
        const newUser = new User({
          name: name,
          userName: userName,
          email: email,
          password: hashedPassword,
          phone: phone,
          image,
          is_verified: 1,
        });

        //   save the user
        const user = await newUser.save();
        if (!user) throw createError(400, "User was not created");
        sendResponse(
          res,
          200,
          "Your account has been activated successfully!",
          token
        );
      }
    );
  } catch (error) {
    next(error);
  }
};

const userProfile = async (req, res, next) => {
  try {
    console.log("profile");
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
const updateUser = async (req, res, next) => {
  try {
    const { email, userName } = req.body;
    const { id } = req.params;

    const existingUser = await User.findOne({ email });
    if (existingUser && existingUser._id.toString() !== id) {
      throw createError(400, "Email address already exists in our database");
    }
    const existingUserName = await User.findOne({ userName });
    if (existingUserName && existingUserName._id.toString() !== id) {
      throw createError(400, "User name already exists in our database");
    }
    let imagePath = null;

    if (req.file) {
      imagePath = req.file && req.file.filename;
    }

    const hashedPassword = await securePassword(req.body.password);

    const updatedFields = {};

    if (req.body.name) {
      updatedFields.name = req.body.name;
    }

    if (req.body.email) {
      updatedFields.email = req.body.email;
    }

    if (req.body.userName) {
      updatedFields.userName = req.body.userName;
    }
    if (req.body.phone) {
      updatedFields.phone = req.body.phone;
    }
    if (imagePath) {
      updatedFields.image = imagePath;
    }
    const userData = await User.findByIdAndUpdate(id, updatedFields, {
      new: true,
    });

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
      throw createError(404, "Email or password is missing");
    if (password.length < 6)
      throw createError(404, "Minimum length for password is 6 characters");
    const user = await User.findOne({ email: email });
    if (!user) throw createError(400, "User with this email was not found");
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
    if (!token) throw createError(404, "Token is missing");
    jwt.verify(token, dev.app.jwtSecretKey, async function (error, decoded) {
      if (error) throw createError(401, "Token is expired");
      //   decoded the data
      const { email, hashedPassword } = decoded;
      const isExist = await User.findOne({ email: email });
      if (!isExist)
        throw createError(400, "User with this email does not exist");
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
  userProfile,
  deleteUser,
  updateUser,
  forgetPassword,
  resetPassword,
};
