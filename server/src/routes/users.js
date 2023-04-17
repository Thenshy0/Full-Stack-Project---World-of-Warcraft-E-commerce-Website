const {
  registerUser,
  verifyEmail,
  loginUser,
  logoutUser,
  userProfile,
  deleteUser,
  updateUser,
  forgetPassword,
  resetPassword,
} = require("../controllers/users");
const formidable = require("express-formidable");
const userRouter = require("express").Router();
const session = require("express-session");
const { isLoggedIn, isLoggedOut } = require("../middlewares/auth");
const dev = require("../config");

userRouter.use(
  session({
    name: "user-session",
    secret: dev.app.sessionSecretKey,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 1000 * 60 * 60 * 24 },
  })
);

userRouter.post("/register", formidable(), registerUser);
userRouter.post("/verify-email", verifyEmail);
userRouter.post("/login", isLoggedOut, loginUser);
userRouter.get("/logout", isLoggedIn, logoutUser);
userRouter
  .route("/")
  .get(isLoggedIn, userProfile)
  .delete(isLoggedIn, deleteUser)
  .put(isLoggedIn, formidable(), updateUser);
userRouter.post("/forget-password", isLoggedOut, forgetPassword);
userRouter.post("/reset-password", isLoggedOut, resetPassword);

module.exports = userRouter;
