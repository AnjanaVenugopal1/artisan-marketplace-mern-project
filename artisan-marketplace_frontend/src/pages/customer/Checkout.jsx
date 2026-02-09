import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

export default function Checkout() {   // ✅ DEFAULT EXPORT
  const [form, setForm] = useState({
    address: "",
    phone: "",
    paymentMethod: "cod",
  });

  const [cart, setCart] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  const total = cart.reduce(
    (sum, item) => sum + Number(item.price || 0),
    0
  );

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleOrder = async (e) => {
    e.preventDefault();

    if (!token) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    try {
      const orderData = {
        products: cart.map((item) => ({
          product: item._id,
          quantity: 1,
        })),
        address: form.address,
        phone: form.phone,
        paymentMethod: form.paymentMethod,
      };

      await api.post("/orders", orderData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Order placed successfully ✅");
      localStorage.removeItem("cart");
      navigate("/orders");
    } catch (error) {
      console.error("Order error:", error.response?.data || error.message);
      alert("Failed to place order");
    }
  };

  return (
    <section className="min-h-screen bg-gray-50 dark:bg-gray-950 px-6 py-10">
      <div className="max-w-xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-2xl shadow">
        <h2 className="text-2xl font-bold mb-4">Checkout</h2>
        <p className="mb-4 font-semibold">Total: ₹{total}</p>

        <form onSubmit={handleOrder} className="space-y-5">
          <textarea
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="Delivery Address"
            required
            className="w-full rounded border p-2"
          />

          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Phone"
            required
            className="w-full rounded border p-2"
          />

          <select
            name="paymentMethod"
            value={form.paymentMethod}
            onChange={handleChange}
            className="w-full rounded border p-2"
          >
            <option value="cod">Cash on Delivery</option>
            <option value="online">Online</option>
          </select>

          <button className="w-full bg-yellow-600 text-white py-2 rounded-lg">
            Place Order
          </button>
        </form>
      </div>
    </section>
  );
}
