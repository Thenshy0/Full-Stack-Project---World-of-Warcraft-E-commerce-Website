const { Schema, model } = require("mongoose");

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1000,
    },
    price: {
      type: String,
      required: true,
      min: 0,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "category",
      required: true,
    },

    slug: {
      type: String,
      lowercase: true,
      trim: true,
      index: true,
      sparse: true,
    },
  },
  { timestamps: true }
);

const Product = model("product", productSchema);
module.exports = Product;
