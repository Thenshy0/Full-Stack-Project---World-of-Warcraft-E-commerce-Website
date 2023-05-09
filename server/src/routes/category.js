const {
  addCategory,
  getCategory,
  updateCategory,
  deleteCategory,
  getAllCategories,
} = require("../controllers/category");

const categoryRouter = require("express").Router();

categoryRouter.post("/", addCategory);
categoryRouter.get("/:id", getCategory);
categoryRouter.get("/", getAllCategories);
categoryRouter.put("/update/:id", updateCategory);
categoryRouter.delete("/delete/:id", deleteCategory);
module.exports = categoryRouter;
