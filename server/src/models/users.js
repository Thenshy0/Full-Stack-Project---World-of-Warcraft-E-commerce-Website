const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: [true, "name is required"],
    minlength: [2, "minimum length for name is 2 characters"],
    maxlength: [100, "maximum length for name is 100 characters"],
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
      message: "Please fill a valid email address",
    },
  },
  password: {
    type: String,
    required: [true, "User password is required"],
    min: 6,
  },
  phone: {
    type: String,
    required: [true, "User phone number required"],
  },
  is_admin: {
    type: Number,
    default: 0,
  },
  // is_verified: {
  //   type: Number,
  //   default: 0,
  // },
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
    default: false
  }
});

const User = model("users", userSchema);
module.exports = User;
