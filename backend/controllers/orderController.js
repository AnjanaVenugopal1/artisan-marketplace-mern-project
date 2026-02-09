import Order from "../models/Order.js";
import Product from "../models/Product.js";

// CREATE ORDER (customer)
export const createOrder = async (req, res) => {
  try {
    const { products, address, phone, paymentMethod } = req.body;

    if (!products || products.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    let totalAmount = 0;

    // Check stock & calculate total
    for (let item of products) {
      if (!item.product) {
        return res.status(400).json({ message: "Invalid product in cart" });
      }

      const product = await Product.findById(item.product);

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({
          message: `Insufficient stock for ${product.name}`,
        });
      }

      // Reduce stock
      product.stock -= item.quantity;
      await product.save();

      totalAmount += product.price * item.quantity;
    }

    const order = await Order.create({
      customer: req.user._id,
      products,
      totalAmount,
      address,
      phone,
      paymentMethod,
    });

    res.status(201).json(order);
  } catch (error) {
    console.error("CREATE ORDER ERROR:", error);
    res.status(500).json({ message: "Failed to create order" });
  }
};

// GET CUSTOMER ORDERS
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ customer: req.user._id })
      .populate("products.product", "name price")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    console.error("GET MY ORDERS ERROR:", error);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};

// GET ARTISAN ORDERS
export const getArtisanOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("products.product", "name price artisan")
      .populate("customer", "fullName email")
      .sort({ createdAt: -1 });

    const artisanOrders = orders.filter((order) =>
      order.products.some(
        (item) =>
          item.product &&
          item.product.artisan.toString() === req.user._id.toString()
      )
    );

    res.json(artisanOrders);
  } catch (error) {
    console.error("GET ARTISAN ORDERS ERROR:", error);
    res.status(500).json({ message: "Failed to fetch artisan orders" });
  }
};
