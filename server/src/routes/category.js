const {
  addCategory,
  getCategory,
  updateCategory,
  deleteCategory,
  getAllCategories,
} = require("../controllers/category");

const categoryRouter = require("express").Router();
const upload = require("../middlewares/fileUpload");

categoryRouter.post("/", upload.single("image"), addCategory);
categoryRouter.get("/:id", getCategory);
categoryRouter.get("/", getAllCategories);
categoryRouter.put("/update/:id", upload.single("image"), updateCategory);
categoryRouter.delete("/delete/:id", deleteCategory);
module.exports = categoryRouter;
