import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  // Load cart
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  // Remove item
  const removeItem = (_id) => {
    const updated = cart.filter((item) => item._id !== _id);
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const total = cart.reduce(
    (sum, item) => sum + Number(item.price),
    0
  );

  // Empty Cart
  if (cart.length === 0) {
    return (
      <section className="min-h-screen bg-gray-950 flex flex-col items-center justify-center text-center px-6">
        <h2 className="text-2xl font-bold text-gray-100 mb-2">
          Your cart is empty 🛒
        </h2>
        <p className="text-gray-400 mb-6">
          Looks like you haven’t added anything yet
        </p>
        <Link
          to="/products"
          className="bg-amber-500 text-gray-900 px-6 py-2 rounded-xl font-semibold hover:bg-amber-600 transition"
        >
          Continue Shopping
        </Link>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-gray-950 px-6 py-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <h2 className="text-3xl font-bold text-gray-100 mb-6">
            Shopping Cart
          </h2>

          <div className="space-y-6">
            {cart.map((item) => (
              <div
                key={item._id}
                className="flex gap-5 bg-gray-900/80 border border-gray-800 rounded-2xl p-5 hover:shadow-xl transition"
              >
                {/* Image */}
                <div className="w-28 h-28 rounded-xl overflow-hidden bg-gray-800 flex-shrink-0">
                  <img
                    src="/images/pot.jpg"
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Info */}
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-100">
                    {item.name}
                  </h3>
                  <p className="text-sm text-gray-400 mt-1">
                    Artisan Product
                  </p>

                  <div className="flex items-center justify-between mt-4">
                    <span className="text-xl font-bold text-amber-500">
                      ₹ {item.price}
                    </span>

                    <button
                      onClick={() => removeItem(item._id)}
                      className="text-sm text-red-400 hover:text-red-500 transition"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-gray-900/90 border border-gray-800 rounded-2xl p-6 h-fit sticky top-10">
          <h3 className="text-xl font-semibold text-gray-100 mb-6">
            Order Summary
          </h3>

          <div className="space-y-4 text-gray-300">
            <div className="flex justify-between">
              <span>Items ({cart.length})</span>
              <span>₹ {total}</span>
            </div>

            <div className="flex justify-between">
              <span>Delivery</span>
              <span className="text-green-400">Free</span>
            </div>

            <div className="border-t border-gray-700 pt-4 flex justify-between text-lg font-bold text-gray-100">
              <span>Total</span>
              <span>₹ {total}</span>
            </div>
          </div>

          <button
            onClick={() => navigate("/checkout")}
            className="w-full mt-6 bg-amber-500 hover:bg-amber-600 text-gray-900 font-semibold py-3 rounded-xl transition"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </section>
  );
}
