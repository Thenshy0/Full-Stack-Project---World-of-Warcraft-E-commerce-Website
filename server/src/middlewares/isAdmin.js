const User = require("../models/users");

const isAdmin = async (req, res, next) => {
  try {
    if (req.session.userId) {
      const adminData = await User.findById(req.session.userId);
      if (adminData?.is_admin === 1) {
        next();
      } else {
        res.status(401).json({
          message: "you are not an admin",
        });
      }
    } else {
      res.status(400).json({
        message: "user is not logged in, please login",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = isAdmin;
