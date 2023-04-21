const {
  securePassword,
  comparePassword,
} = require("../helpers/bcryptPassword");

const jwt = require("jsonwebtoken");
const User = require("../models/users");
const dev = require("../config");
const { sendEmailWithNodeMailer } = require("../helpers/email");

const registerUser = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;
    const isExist = await User.findOne({ email: email });
    if (isExist) {
      return res.status(400).json({
        message: "user with this email is already exist",
      });
    }
    if (!name || !email || !phone || !password) {
      return res.status(404).json({
        message: "name, email, phone or password is missing",
      });
    }

    if (password.length < 6) {
      return res.status(404).json({
        message: "minimum length for password is 6 characters",
      });
    }

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
        image,
        is_verified: 1,
      });

      //   save the user
      const user = await newUser.save();
      if (!user) {
        res.status(400).json({
          message: "user was not created",
        });
      }
      res.status(200).json({
        message: "user was created, ready to sign in",
      });
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(404).json({
        message: " email or password is missing",
      });
    }
    if (password.length < 6) {
      return res.status(404).json({
        message: "minimum length for password is 6 characters",
      });
    }
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({
        message: "user with this email does not exist, please register first",
      });
    }

    const isPasswordMatch = await comparePassword(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
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
const logoutUser = (req, res) => {
  try {
    req.session.destroy();
    res.clearCookie("user-session");
    res.status(200).json({
      message: "logout successful",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const userProfile = async (req, res) => {
  try {
    const userData = await User.findById(req.session.userId, { password: 0 });
    res.status(200).json({
      message: "Profile returned",
      user: userData,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.session.userId);
    res.status(200).json({
      message: "User was deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const updateUser = async (req, res) => {
  try {
    const hashedPassword = await securePassword(req.body.password);
    const userData = await User.findByIdAndUpdate(
      req.session.userId,
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
      message: "User was updated",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const forgetPassword = async (req, res) => {
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
      return res.status(400).json({
        message: "user with this email was not found",
      });
    }
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
    res.status(200).json({
      message: "An email has been sent for reseting password",
      token: token,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const resetPassword = async (req, res) => {
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
      const { email, hashedPassword } = decoded;
      const isExist = await User.findOne({ email: email });
      if (!isExist) {
        res.status(400).json({
          message: "user with this email does not exist",
        });
      }
      //   update the user
      const updateData = await User.updateOne(
        { email: email },
        {
          $set: {
            password: hashedPassword,
          },
        }
      );
      if (!updateData) {
        res.status(400).json({
          message: "reset password was unsuccessful",
        });
      }
      res.status(200).json({
        message: "Password reset was successful",
      });
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
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
