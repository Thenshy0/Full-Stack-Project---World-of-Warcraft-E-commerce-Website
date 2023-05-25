const { default: slugify } = require("slugify");
const { sendResponse } = require("../helpers/responseHandler");
const createError = require("http-errors");
const Product = require("../models/product");
const Category = require("../models/category");

const addProduct = async (req, res, next) => {
  try {
    const { name, description, price, category } = req.body;
    const image = req.file && req.file.filename;
    const selectedCategory = await Category.findOne({ name: category });
    if (!selectedCategory) throw createError(404, "Invalid category");

    const isExist = await Product.findOne({ name: name });
    if (isExist)
      throw createError(400, "Product with this name is already exist");
    if (!name || !description || !price || !image || !category)
      throw createError(
        400,
        "Please fill up every field to be able to create a product"
      );
    const product = new Product({
      name: name,
      slug: slugify(name),
      description: description,
      price: Number(price),
      category: await Category.findOne({ name: category }),
      image: image,
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
    sendResponse(res, 200, "Product details", product);
  } catch (error) {
    next(error);
  }
};
const getAllProducts = async (req, res, next) => {
  try {
    const { search = "", page = 1, category } = req.query;
    const query = {};
    if (category) {
      query.category = category;
    }

    if (search) {
      query.name = { $regex: search, $options: "i" };
    }
    const products = await Product.find(query)

      .populate("category")
      .skip(page - 1);
    // .limit(limit);

    if (!products) {
      throw createError(404, "No products found");
    }
    const count = await Product.countDocuments(query);
    sendResponse(res, 200, "All products retrieved", {
      total: count,
      products: products,
    });
  } catch (error) {
    next(error);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      throw createError(400, "Product not found");
    }
    const { name, description, price } = req.body;
    if (name) product.name = name;
    if (description) product.description = description;
    if (price) product.price = price;
    if (req.file) product.image = req.file.filename;

    await product.save();
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
