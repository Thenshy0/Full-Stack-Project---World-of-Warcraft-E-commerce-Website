const jwt = require("jsonwebtoken");
const dev = require("../config");
const createError = require("http-errors");

const isLoggedIn = (req, res, next) => {
  try {
    const authHeader = req.cookies.jwt;
    if (!authHeader) throw createError(401, "Please login");
    jwt.verify(authHeader, dev.app.jwtRefreshKey);
    next();
  } catch (error) {
    next(error);
  }
};
const isLoggedOut = (req, res, next) => {
  try {
    const authHeader = req.cookies.jwt;
    if (authHeader) throw createError(401, "Please logout");
    next();
  } catch (error) {
    next(error);
  }
};
module.exports = { isLoggedIn, isLoggedOut };
