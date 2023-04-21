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
const userRouter = require("express").Router();
const { isLoggedIn, isLoggedOut } = require("../middlewares/auth");
const upload = require("../middlewares/fileUpload");

userRouter.post("/register", upload.single("image"), registerUser);
userRouter.post("/verify-email", verifyEmail);
userRouter.post("/login", isLoggedOut, loginUser);
userRouter.get("/logout", isLoggedIn, logoutUser);
userRouter.delete("/delete/:id", isLoggedIn, deleteUser);
userRouter.get("/:id", isLoggedIn, userProfile);
userRouter.put("/update/:id", isLoggedIn, upload.single("image"), updateUser);
userRouter.post("/forget-password", isLoggedOut, forgetPassword);
userRouter.post("/reset-password", isLoggedOut, resetPassword);
userRouter.get("*", (req, res) => {
  res.status(404).json({
    message: "404 not found",
  });
});
module.exports = userRouter;
