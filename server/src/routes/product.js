const {
  addProduct,
  getProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
} = require("../controllers/product");

const productRouter = require("express").Router();

productRouter.post("/", addProduct);
productRouter.get("/:id", getProduct);
productRouter.get("/", getAllProducts);
productRouter.put("/update/:id", updateProduct);
productRouter.delete("/delete/:id", deleteProduct);
module.exports = productRouter;
