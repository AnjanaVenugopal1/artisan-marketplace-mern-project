import express from "express";
import {
  createOrder,
  getMyOrders,
  getArtisanOrders,
} from "../controllers/orderController.js";

import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

// Customer places order
router.post("/", protect, authorize("customer"), createOrder);

// Customer views own orders
router.get("/my", protect, authorize("customer"), getMyOrders);

// Artisan views orders for their products
router.get("/artisan", protect, authorize("artisan"), getArtisanOrders);

export default router;
