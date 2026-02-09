import express from "express";
import User from "../models/User.js";

const router = express.Router();

// GET ALL ARTISANS
router.get("/artisans", async (req, res) => {
  try {
    const artisans = await User.find({ role: "artisan" })
      .select("fullName name craftType region bio profileImage");

    res.status(200).json(artisans);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch artisans" });
  }
});

// GET SINGLE ARTISAN
router.get("/:id", async (req, res) => {
  try {
    const artisan = await User.findById(req.params.id).select(
      "fullName name craftType region bio profileImage role"
    );

    if (!artisan || artisan.role !== "artisan") {
      return res.status(404).json({ message: "Artisan not found" });
    }

    res.status(200).json(artisan);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch artisan" });
  }
});

export default router;
