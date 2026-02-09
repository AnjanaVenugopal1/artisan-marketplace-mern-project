import { Link, useNavigate } from "react-router-dom";
import api from "../../api/axios";

const BACKEND_URL = import.meta.env.VITE_API_URL.replace("/api", "");

export default function ProductCard({ product }) {
  const navigate = useNavigate();

  const handleBuyNow = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    try {
      const res = await api.post("/payment/create-checkout-session", {
        productId: product._id,
      });

      window.location.href = res.data.url;
    } catch (err) {
      console.error("Payment error:", err);
      alert("Payment failed");
    }
  };

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (!cart.find((item) => item._id === product._id)) {
      cart.push(product);
      localStorage.setItem("cart", JSON.stringify(cart));
    }

    navigate("/cart");
  };

  return (
    <div className="group relative bg-gradient-to-b from-gray-900 to-gray-950
      rounded-2xl overflow-hidden border border-white/10
      hover:border-amber-500/40 transition-all duration-300"
    >
      <Link to={`/products/${product._id}`}>
        <div className="relative h-56 overflow-hidden">
          <img
            src={
              product.image
                ? `${BACKEND_URL}${product.image}`
                : "/images/placeholder.jpg"
            }
            alt={product.name}
            className="h-full w-full object-cover
              group-hover:scale-110 transition-transform duration-500"
          />

          <div className="absolute top-3 right-3 bg-black/70 text-amber-400
            px-3 py-1 text-sm rounded-full backdrop-blur">
            ₹ {product.price}
          </div>
        </div>

        <div className="p-5">
          <h3 className="font-semibold text-white text-lg mb-1 line-clamp-1">
            {product.name}
          </h3>

          <p className="text-sm text-gray-400 mb-3">
            {product.region} {product.material && `· ${product.material}`}
          </p>
        </div>
      </Link>

      <div className="px-5 pb-5 space-y-2">
        <button
          onClick={handleAddToCart}
          className="w-full py-2 rounded-lg text-sm font-medium
            border border-amber-500/40 text-amber-400
            hover:bg-amber-500/10 transition"
        >
          Add to Cart
        </button>

        <button
          onClick={handleBuyNow}
          className="w-full py-2 rounded-lg text-sm font-semibold
            bg-gradient-to-r from-[#FFD978] via-[#F2B705] to-[#C99700]
            text-black hover:brightness-110 transition"
        >
          Buy Now
        </button>
      </div>
    </div>
  );
}
