const { default: slugify } = require("slugify");
const { sendResponse } = require("../helpers/responseHandler");
const Category = require("../models/category");
const createError = require("http-errors");

const addCategory = async (req, res, next) => {
  try {
    const { name } = req.body;
    const isExist = await Category.findOne({ name: name });
    if (isExist)
      throw createError(400, "Category with this name is already exist");

    const category = new Category({ name: name, slug: slugify(name) });

    await category.save();
    sendResponse(res, 200, "Category created", category);
  } catch (error) {
    next(error);
  }
};
const getCategory = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      throw createError(404, "No category find by this ID");
    }
    res.send(category);
  } catch (error) {
    next(error);
  }
};
const getAllCategories = async (req, res, next) => {
  try {
    const category = await Category.find();
    if (!category) {
      throw createError(404, "No category at all, please create some");
    }
    res.send(category);
  } catch (error) {
    next(error);
  }
};
const updateCategory = async (req, res, next) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!category) {
      throw createError(404, "No category find by this ID");
    }
    sendResponse(res, 200, "Category updated successfully", category);
  } catch (error) {
    next(error);
  }
};
const deleteCategory = async (req, res, next) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);

    if (!category) {
      throw createError(404, "No category find by this ID");
    }
    sendResponse(res, 200, `Category deleted`, category);
  } catch (error) {
    next(error);
  }
};
module.exports = {
  addCategory,
  getCategory,
  updateCategory,
  deleteCategory,
  getAllCategories,
};
