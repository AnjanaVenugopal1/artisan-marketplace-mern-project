import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    category: {
      type: String,
    },

    material: {
      type: String,
    },

    region: {
      type: String,
    },

    stock: {
      type: Number,
      default: 0,
    },

    description: {
      type: String,
    },

    image: {
      type: String, // URL (Cloudinary later)
    },

    artisan: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
