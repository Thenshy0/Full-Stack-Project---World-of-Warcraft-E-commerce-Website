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
  refreshToken,
} = require("../controllers/users");
const userRouter = require("express").Router();
const { isLoggedIn, isLoggedOut } = require("../middlewares/auth");
const upload = require("../middlewares/fileUpload");

userRouter.post("/register", upload.single("image"), registerUser);
userRouter.post("/verify-email", verifyEmail);

userRouter.delete("/delete/:id", isLoggedIn, deleteUser); // isLoggedIn
userRouter.get("/profile/:id", userProfile); // isLoggedIn
userRouter.put("/update/:id", upload.single("image"), updateUser); // isLoggedIn
userRouter.post("/forget-password", isLoggedOut, forgetPassword); //isLoggedOut
userRouter.post("/reset-password", isLoggedOut, resetPassword); //isLoggedOut

userRouter.get("*", (req, res) => {
  res.status(404).json({
    message: "404 not found",
  });
});
module.exports = userRouter;
