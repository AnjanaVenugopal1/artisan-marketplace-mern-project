import { useState } from "react";

export default function AdminDashboard() {
  const [artisans, setArtisans] = useState([
    { id: 1, name: "Ravi Kumar", region: "Kutch", status: "Pending" },
    { id: 2, name: "Anita Devi", region: "Jaipur", status: "Approved" },
  ]);

  const [products, setProducts] = useState([
    { id: 1, name: "Handwoven Saree", price: 1800, status: "Pending" },
    { id: 2, name: "Clay Pot", price: 1200, status: "Approved" },
  ]);

  const approveArtisan = (id) => {
    setArtisans(
      artisans.map((a) =>
        a.id === id ? { ...a, status: "Approved" } : a
      )
    );
  };

  const rejectArtisan = (id) => {
    setArtisans(
      artisans.map((a) =>
        a.id === id ? { ...a, status: "Rejected" } : a
      )
    );
  };

  const approveProduct = (id) => {
    setProducts(
      products.map((p) =>
        p.id === id ? { ...p, status: "Approved" } : p
      )
    );
  };

  const rejectProduct = (id) => {
    setProducts(
      products.map((p) =>
        p.id === id ? { ...p, status: "Rejected" } : p
      )
    );
  };

  return (
    <section className="min-h-screen bg-gray-50 dark:bg-gray-950 px-6 py-10">
      <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-gray-100">
        Admin Dashboard
      </h2>

      {/* Artisans */}
      <div className="mb-10">
        <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
          Artisan Verification
        </h3>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-100 dark:bg-gray-700">
              <tr>
                <th className="p-4">Name</th>
                <th className="p-4">Region</th>
                <th className="p-4">Status</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {artisans.map((a) => (
                <tr
                  key={a.id}
                  className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <td className="p-4">{a.name}</td>
                  <td className="p-4">{a.region}</td>
                  <td className="p-4 font-semibold">{a.status}</td>
                  <td className="p-4 space-x-2">
                    <button
                      onClick={() => approveArtisan(a.id)}
                      className="bg-green-500 text-white px-3 py-1 rounded-lg"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => rejectArtisan(a.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded-lg"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Products */}
      <div>
        <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
          Product Moderation
        </h3>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-100 dark:bg-gray-700">
              <tr>
                <th className="p-4">Product</th>
                <th className="p-4">Price</th>
                <th className="p-4">Status</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr
                  key={p.id}
                  className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <td className="p-4">{p.name}</td>
                  <td className="p-4 text-amber-600 font-semibold">
                    ₹ {p.price}
                  </td>
                  <td className="p-4 font-semibold">{p.status}</td>
                  <td className="p-4 space-x-2">
                    <button
                      onClick={() => approveProduct(p.id)}
                      className="bg-green-500 text-white px-3 py-1 rounded-lg"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => rejectProduct(p.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded-lg"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
