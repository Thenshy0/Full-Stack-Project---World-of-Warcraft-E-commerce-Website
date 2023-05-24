const cors = require("cors");
const {
  addProduct,
  getProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
} = require("../controllers/product");

const productRouter = require("express").Router();
const upload = require("../middlewares/fileUpload");
router.use(cors());
productRouter.post("/", cors(), upload.single("image"), addProduct);
productRouter.get("/:id", cors(), getProduct);
productRouter.get("/", cors(), getAllProducts);
productRouter.put("/update/:id", cors(), upload.single("image"), updateProduct);
productRouter.delete("/delete/:id", cors(), deleteProduct);
module.exports = productRouter;
