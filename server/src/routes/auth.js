const {
  loginUser,
  logoutUser,
  refreshToken,
  loginAdmin,
} = require("../controllers/auth");
const { isLoggedOut, isLoggedIn } = require("../middlewares/auth");
const authRouter = require("express").Router();

authRouter.post("/login", isLoggedOut, loginUser); //isLoggedOut
authRouter.get("/logout", logoutUser); // isLoggedIn
authRouter.get("/refresh-token", refreshToken); //isLoggedOut
authRouter.post("/login-admin", isLoggedOut, loginAdmin); // isLoggedOut
authRouter.get("*", (req, res) => {
  res.status(404).json({
    message: "404 not found",
  });
});
module.exports = authRouter;
