const { default: slugify } = require("slugify");
const { sendResponse } = require("../helpers/responseHandler");
const createError = require("http-errors");
const Product = require("../models/product");
const Category = require("../models/category");

const addProduct = async (req, res, next) => {
  try {
    const { name, description, price, category } = req.body;

    const selectedCategory = await Category.findOne({
      $or: [{ name: category }, { slug: category }],
    });

    if (!selectedCategory) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid category" });
    }

    const isExist = await Product.findOne({ name: name });
    if (isExist)
      throw createError(400, "Product with this name is already exist");

    const product = new Product({
      name,
      slug: slugify(name),
      description,
      price: Number(price),
      category: selectedCategory.name,
    });

    await product.save();
    sendResponse(res, 200, "Product created", product);
  } catch (error) {
    next(error);
  }
};
const getProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id).populate("category");
    if (!product) {
      throw createError(404, "No product find by this ID");
    }
    res.send(product);
  } catch (error) {
    next(error);
  }
};
const getAllProducts = async (req, res, next) => {
  try {
    const { page = 1, limit = 2 } = req.query;
    const products = await Product.find()
      .populate("category")
      .skip((page - 1) * limit)
      .limit(limit);
    if (!products) {
      throw createError(404, "No products at all, please add some");
    }
    const count = await Product.find().countDocuments();
    sendResponse(res, 200, "Return all products", {
      total: count,
      products: products,
    });
  } catch (error) {
    next(error);
  }
};
const updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!product) {
      throw createError(404, "No product find by this ID");
    }
    sendResponse(res, 200, "Product updated successfully", product);
  } catch (error) {
    next(error);
  }
};
const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      throw createError(404, "No product find by this ID");
    }
    sendResponse(res, 200, `Product deleted`, product);
  } catch (error) {
    next(error);
  }
};
module.exports = {
  addProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
};
