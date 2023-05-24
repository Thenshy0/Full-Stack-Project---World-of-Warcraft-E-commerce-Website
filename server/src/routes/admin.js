const adminRouter = require("express").Router();

const { isLoggedIn, isLoggedOut } = require("../middlewares/auth");
const {
  loginAdmin,

  deleteUserbyAdmin,
  updateUserByAdmin,
  exportUsers,

  getAllusers,
} = require("../controllers/admin");
const isAdmin = require("../middlewares/isAdmin");
const { registerUser } = require("../controllers/users");
const upload = require("../middlewares/fileUpload");

adminRouter.get("/dashboard", getAllusers); //isLoggedIn, isAdmin
adminRouter.post("/register", upload.single("image"), registerUser);
adminRouter.put(
  "/dashboard/update/:id",

  upload.single("image"),
  // isLoggedIn,
  // isAdmin,
  updateUserByAdmin
); //isLoggedIn , isAdmin
adminRouter.delete(
  "/dashboard/delete/:id",
  // isLoggedIn,
  // isAdmin,
  deleteUserbyAdmin
); //isLoggedIn , isAdmin
adminRouter.get("/dashboard/export-data", exportUsers);
adminRouter.get("*", (req, res) => {
  res.status(404).json({
    message: "404 not found",
  });
});
module.exports = adminRouter;
