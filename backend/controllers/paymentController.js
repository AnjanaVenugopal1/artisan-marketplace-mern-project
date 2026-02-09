import Stripe from "stripe";
import Product from "../models/Product.js";

export const createCheckoutSession = async (req, res) => {
  try {
    // ✅ Create Stripe instance ONLY when function runs
    if (!process.env.STRIPE_SECRET_KEY) {
      console.error("❌ STRIPE_SECRET_KEY missing");
      return res.status(500).json({
        message: "Stripe is not configured on server",
      });
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    const { productId } = req.body;
    if (!productId) {
      return res.status(400).json({ message: "Product ID required" });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: product.name,
              description: product.description || "",
            },
            unit_amount: Math.round(product.price * 100),
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.CLIENT_URL}/#/payment-success`,
      cancel_url: `${process.env.CLIENT_URL}/#/payment-cancel`,
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error("Stripe error:", error);
    res.status(500).json({ message: error.message });
  }
};
