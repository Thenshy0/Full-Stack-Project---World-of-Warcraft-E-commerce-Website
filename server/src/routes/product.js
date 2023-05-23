const {
  addProduct,
  getProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
} = require("../controllers/product");

const productRouter = require("express").Router();
const upload = require("../middlewares/fileUpload");

productRouter.post("/", upload.single("image"), addProduct);
productRouter.get("/:id", getProduct);
productRouter.get("/", getAllProducts);
productRouter.put("/update/:id", upload.single("image"), updateProduct);
productRouter.delete("/delete/:id", deleteProduct);
module.exports = productRouter;
