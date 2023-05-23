const { Schema, model } = require("mongoose");
const { default: slugify } = require("slugify");

const categorySchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      unique: true,
      required: [true, "Category is required"],
      minlength: [2, "Minimum length for category is 2 characters"],
      maxlength: [100, "Maximum length for category is 100 characters"],
    },
    slug: {
      type: String,
      required: [true, "Category slug is required"],
      lowercase: true,
      unique: true,
      index: true,
      sparse: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    image: {
      type: String,
      default: "../../public/images/categories/Mage.png",
    },
  },
  { timestamps: true }
);

const Category = model("category", categorySchema);
module.exports = Category;
