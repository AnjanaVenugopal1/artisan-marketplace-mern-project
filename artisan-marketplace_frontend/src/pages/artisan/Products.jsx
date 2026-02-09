import { useState, useEffect } from "react";
import api from "../../api/axios";
import ProductCard from "../../components/products/ProductCard";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("");
  const [material, setMaterial] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const itemsPerPage = 6;

  // 🔽 Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get("/products");
        setProducts(res.data);
      } catch (error) {
        console.error("Failed to fetch products", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // 🔍 Filters
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesRegion = region ? product.region === region : true;
    const matchesMaterial = material ? product.material === material : true;

    return matchesSearch && matchesRegion && matchesMaterial;
  });

  // 📄 Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // 🧩 Unique filter values
  const regions = [...new Set(products.map((p) => p.region))];
  const materials = [...new Set(products.map((p) => p.material))];

  return (
    <section className="px-6 py-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold mb-3 text-gray-900 dark:text-white">
            Artisan Marketplace
          </h1>
          <p className="text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            Discover handcrafted products directly from skilled artisans across regions and traditions.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Search handcrafted products..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />

            <select
              value={region}
              onChange={(e) => {
                setRegion(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            >
              <option value="">All Regions</option>
              {regions.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>

            <select
              value={material}
              onChange={(e) => {
                setMaterial(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            >
              <option value="">All Materials</option>
              {materials.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Products */}
        {loading ? (
          <p className="text-center text-gray-500 dark:text-gray-400">
            Loading products...
          </p>
        ) : paginatedProducts.length === 0 ? (
          <div className="text-center py-20 text-gray-500 dark:text-gray-400">
            No products found matching your filters.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {paginatedProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-3 mt-12">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="px-4 py-2 rounded-lg border"
            >
              Prev
            </button>

            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`w-10 h-10 rounded-lg font-medium ${
                  currentPage === i + 1
                    ? "bg-amber-600 text-white"
                    : "bg-white border"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="px-4 py-2 rounded-lg border"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
