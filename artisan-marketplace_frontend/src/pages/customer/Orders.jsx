import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await api.get("/orders/my", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("Orders:", res.data);
        setOrders(res.data);
      } catch (error) {
        console.error("Failed to fetch orders", error);
      }
    };

    fetchOrders();
  }, [token]);

  return (
    <section className="min-h-screen bg-gray-50 dark:bg-gray-950 px-6 py-10">
      <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-gray-100">
        My Orders
      </h2>

      {orders.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-300">
          You have not placed any orders yet.
        </p>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-100 dark:bg-gray-700">
              <tr>
                <th className="p-4">Order ID</th>
                <th className="p-4">Products</th>
                <th className="p-4">Total</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr
                  key={o._id}
                  className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <td className="p-4">{o._id.slice(-6)}</td>
                  <td className="p-4">
                    {o.products.map((p) => p.product?.name).join(", ")}
                  </td>
                  <td className="p-4 text-amber-600 font-semibold">
                    ₹ {o.totalAmount}
                  </td>
                  <td className="p-4">
                    <span className="px-3 py-1 rounded-full text-sm bg-yellow-200 text-yellow-800">
                      {o.status || "Placed"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
