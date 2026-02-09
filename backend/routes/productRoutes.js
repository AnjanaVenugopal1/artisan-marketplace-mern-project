import express from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getMyProducts,
} from "../controllers/productController.js";

import { protect, authorize } from "../middleware/authMiddleware.js";
import upload from "../middleware/upload.js";

const router = express.Router(); // ✅ MUST COME FIRST

// ============================
// CREATE PRODUCT (with image)
// ============================
router.post(
  "/",
  protect,
  authorize("artisan"),
  upload.single("image"),
  createProduct
);

// ============================
// GET ALL PRODUCTS
// ============================
router.get("/", getAllProducts);

// ============================
// GET MY PRODUCTS (ARTISAN)
// ============================
router.get(
  "/my-products",
  protect,
  authorize("artisan"),
  getMyProducts
);

// ============================
// GET SINGLE PRODUCT
// ============================
router.get("/:id", getProductById);

// ============================
// UPDATE PRODUCT
// ============================
router.put(
  "/:id",
  protect,
  authorize("artisan"),
  upload.single("image"),
  updateProduct
);

// ============================
// DELETE PRODUCT
// ============================
router.delete(
  "/:id",
  protect,
  authorize("artisan"),
  deleteProduct
);

export default router;
