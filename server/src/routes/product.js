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

productRouter.get("*", (req, res) => {
  res.status(404).json({
    message: "404 not found",
  });
});

module.exports = productRouter;
