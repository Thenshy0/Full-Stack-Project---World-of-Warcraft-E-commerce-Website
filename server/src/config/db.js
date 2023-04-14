const mongoose = require("mongoose");
const dev = require(".");

const connectDB = async () => {
  try {
    await mongoose.connect(dev.db.url);
    console.log("connect");
  } catch (error) {
    console.log("error");
  }
};
module.exports = connectDB;
