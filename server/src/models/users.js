const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Name is required"],
      minlength: [2, "Minimum length for name is 2 characters"],
      maxlength: [100, "Maximum length for name is 100 characters"],
    },
    userName: {
      type: String,
      trim: true,
      unique: true,
      required: [true, "User Name is required"],
      minlength: [2, "Minimum length for user name is 2 characters"],
      maxlength: [100, "Maximum length for user name is 100 characters"],
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: [true, "Email address is required"],
      validate: {
        validator: function (v) {
          return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
        },
        message: "Please provide a valid email address",
      },
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Minimum length for password is 8 characters"],
      // match: [
      //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      //   "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      // ],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      // validate: {
      //   validator: function (v) {
      //     return /^\+(?:[0-9] ?){6,14}[0-9]$/.test(v);
      //   },
      //   message: "Please provide a valid phone number in international format",
      // },
    },
    is_admin: {
      type: Number,
      default: 0,
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
    image: {
      type: String,
      default: "../../public/images/users/Screenshot_318.png",
    },
    isBanned: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const User = model("users", userSchema);
module.exports = User;
