const isLoggedIn = (req, res, next) => {
  try {
    if (req.session.userId) {
      next();
    } else {
      res.status(400).json({
        message: "user is not logged in, please login",
      });
    }
  } catch (error) {
    console.log(error);
  }
};
const isLoggedOut = (req, res, next) => {
  try {
    if (req.session.userId) {
      return res.status(400).json({
        message: "please logout",
      });
    }
    next();
  } catch (error) {
    console.log(error);
  }
};
module.exports = { isLoggedIn, isLoggedOut };
