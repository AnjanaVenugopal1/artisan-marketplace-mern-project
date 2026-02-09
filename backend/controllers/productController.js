import Product from "../models/Product.js";

// CREATE product (artisan)
export const createProduct = async (req, res) => {
  try {
    const {
      name,
      price,
      category,
      material,
      region,
      stock,
      description,
      image,
    } = req.body;

    const product = await Product.create({
      name,
      price,
      category,
      material,
      region,
      stock,
      description,
      image,
      artisan: req.user._id, // taken from token
    });

    res.status(201).json(product);
  } catch (error) {
    console.error("CREATE PRODUCT ERROR:", error);
    res.status(500).json({ message: "Failed to create product" });
  }
};


export const getAllProducts = async (req, res) => {
  try {
    const { artisanId } = req.query;

    const filter = {};

    if (artisanId) {
      filter.artisan = artisanId; // MUST MATCH Product schema
    }

    const products = await Product.find(filter)
      .populate("artisan", "fullName craftType region");

    res.status(200).json(products);
  } catch (error) {
    console.error("Get products error:", error);
    res.status(500).json({ message: "Failed to fetch products" });
  }
};


// GET single product
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate(
      "artisan",
      "fullName region"
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    console.error("GET PRODUCT ERROR:", error);
    res.status(500).json({ message: "Failed to fetch product" });
  }
};



// GET artisan's own products
export const getMyProducts = async (req, res) => {
  try {
    const products = await Product.find({ artisan: req.user._id })
      .sort({ createdAt: -1 });

    res.json(products);
  } catch (error) {
    console.error("GET MY PRODUCTS ERROR:", error);
    res.status(500).json({ message: "Failed to fetch artisan products" });
  }
};


// UPDATE product (artisan only – owner)
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // DEBUG (important)
    console.log("PRODUCT ARTISAN:", product.artisan.toString());
    console.log("LOGGED IN USER:", req.user._id.toString());

    // Ownership check
    if (product.artisan.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Access denied" });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedProduct);
  } catch (error) {
    console.error("UPDATE PRODUCT ERROR:", error);
    res.status(500).json({ message: "Failed to update product" });
  }
};

// DELETE product (artisan only – owner)
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Ownership check
    if (product.artisan.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Access denied" });
    }

    await Product.findByIdAndDelete(id);

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("DELETE PRODUCT ERROR:", error.message);
    res.status(500).json({ message: "Failed to delete product" });
  }
};

