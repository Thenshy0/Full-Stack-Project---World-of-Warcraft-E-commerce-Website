const jwt = require("jsonwebtoken");
const dev = require("../config");

const User = require("../models/users");
const createError = require("http-errors");

const isAdmin = async (req, res, next) => {
  try {
    const authToken = req.headers.cookie;
    if (!authToken) throw createError(401, "missing token");
    const token = authToken.split("=")[1];
    const decoded = jwt.verify(token, dev.app.jwtAuthorisationKey);
    const admin = await User.findOne({ email: decoded.email });
    if (!admin) throw createError(401, "invalid token");
    if (admin.is_admin !== 1) throw createError(400, "you are not an admin");
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = isAdmin;
