import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";

dotenv.config();

// ============================
// FIX __dirname FOR ES MODULES
// ============================
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ============================
// INITIALIZE APP
// ============================
const app = express();

// ============================
// MIDDLEWARE
// ============================
app.use(
  cors({
    origin: "http://localhost:5173", // frontend
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

// ============================
// STATIC FILES (UPLOADS)
// ============================
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ============================
// ROUTES
// ============================
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/users", userRoutes);
app.use("/api/payment", paymentRoutes);

// ============================
// TEST ROUTE
// ============================
app.get("/", (req, res) => {
  res.send("KalaSutra API running");
});

// ============================
// DATABASE
// ============================
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  });

// ============================
// START SERVER
// ============================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
