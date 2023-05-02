const jwt = require("jsonwebtoken");
const dev = require("../config");

const User = require("../models/users");
const createError = require("http-errors");

const isAdmin = async (req, res, next) => {
  try {
    const authHeader = req.cookies.jwt;
    if (!authHeader) throw createError(401, "Please login");
    const decoded = jwt.verify(authHeader, dev.app.jwtRefreshKey);
    const user = await User.findOne({ email: decoded.email });
    if (!user) throw createError(401, "invalid token");
    if (user.is_admin !== 1) throw createError(400, "you are not an admin");
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = isAdmin;
