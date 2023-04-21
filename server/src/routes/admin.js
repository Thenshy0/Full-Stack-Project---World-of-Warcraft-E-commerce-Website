const adminRouter = require("express").Router();
const { isLoggedIn, isLoggedOut } = require("../middlewares/auth");
const {
  loginAdmin,
  logoutAdmin,
  getAllusers,
  deleteUserbyAdmin,
  updateUserByAdmin,
  exportUsers,
} = require("../controllers/admin");
const isAdmin = require("../middlewares/isAdmin");
const { registerUser } = require("../controllers/users");
const upload = require("../middlewares/fileUpload");
adminRouter.post("/login", isLoggedOut, loginAdmin);
adminRouter.get("/logout", isLoggedIn, logoutAdmin);
adminRouter.get("/dashboard", isLoggedIn, getAllusers);
adminRouter.post("/register", upload.single("image"), registerUser);
adminRouter.put(
  "/dashboard/update/:id",
  isLoggedIn,
  isAdmin,
  upload.single("image"),
  updateUserByAdmin
);
adminRouter.delete(
  "/dashboard/delete/:id",
  isLoggedIn,
  isAdmin,
  deleteUserbyAdmin
);
adminRouter.get("/dashboard/export-data", exportUsers);
adminRouter.get("*", (req, res) => {
  res.status(404).json({
    message: "404 not found",
  });
});
module.exports = adminRouter;
