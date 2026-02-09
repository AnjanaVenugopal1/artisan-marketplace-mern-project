import { useEffect, useState } from "react";
import api from "../../api/axios";
import ProductCard from "../../components/products/ProductCard";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("");
  const [material, setMaterial] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const limit = 6;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const res = await api.get("/products", {
          params: {
            search,
            region,
            material,
            page: currentPage,
            limit,
          },
        });

        let productsData = [];
        let pages = 1;

        if (Array.isArray(res.data)) {
          productsData = res.data;
        } else if (Array.isArray(res.data?.products)) {
          productsData = res.data.products;
          pages = res.data.totalPages || 1;
        } else if (Array.isArray(res.data?.data)) {
          productsData = res.data.data;
        }

        productsData = productsData.filter(
  (p) => p.status === "Approved" || p.status === "Pending"
);

        setProducts(productsData);
        setTotalPages(pages);
      } catch (err) {
        console.error("Error fetching products:", err);
        setProducts([]);
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [search, region, material, currentPage]);

  return (
    <section className="bg-gradient-to-b from-black to-gray-950 text-white">

      {/* ================= HERO ================= */}
      <section className="relative h-[65vh] flex items-center justify-center px-6">
        <img
          src="/images/products-bg2.jpg"
          alt="Handcrafted products"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/70 "></div>

        <div className="relative z-10 text-center max-w-3xl">
          <p className="uppercase tracking-[0.35em] text-sm text-amber-400 mb-6">
            Marketplace
          </p>

          <h1 className="text-4xl md:text-5xl font-serif font-semibold mb-6">
            Artisan Marketplace
          </h1>

          <p className="text-lg text-gray-300 leading-relaxed">
            Discover handcrafted products directly from skilled artisans
            across regions and traditions.
          </p>
        </div>
      </section>

      {/* ================= FILTERS ================= */}
      <section className="relative -mt-20 px-6">
        <div
          className="max-w-6xl mx-auto
          bg-white/5 backdrop-blur-md border border-white/10
          rounded-3xl p-8 shadow-xl"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            <input
              type="text"
              placeholder="Search handcrafted products…"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full px-5 py-3 rounded-xl
                bg-gray-900 border border-white/10
                text-white placeholder-gray-500
                focus:ring-2 focus:ring-amber-500/40 outline-none"
            />

            <select
              value={region}
              onChange={(e) => {
                setRegion(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full px-5 py-3 rounded-xl
                bg-gray-900 border border-white/10
                text-white focus:ring-2 focus:ring-amber-500/40 outline-none"
            >
              <option value="">All Regions</option>
              <option value="Jaipur">Jaipur</option>
              <option value="Kutch">Kutch</option>
              <option value="Odisha">Odisha</option>
            </select>

            <select
              value={material}
              onChange={(e) => {
                setMaterial(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full px-5 py-3 rounded-xl
                bg-gray-900 border border-white/10
                text-white focus:ring-2 focus:ring-amber-500/40 outline-none"
            >
              <option value="">All Materials</option>
              <option value="Clay">Clay</option>
              <option value="Cotton">Cotton</option>
              <option value="Bamboo">Bamboo</option>
            </select>

          </div>
        </div>
      </section>

      {/* ================= PRODUCTS ================= */}
      <section className="px-6 py-28">
        <div className="max-w-7xl mx-auto">

          {loading ? (
            <div className="text-center py-20 text-gray-400">
              Loading products…
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              No products found.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}

          {/* ================= PAGINATION ================= */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-3 mt-16">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-11 h-11 rounded-xl font-medium transition
                    ${
                      currentPage === i + 1
                        ? "bg-gradient-to-r from-[#FFD978] to-[#F2B705] text-black"
                        : "bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10"
                    }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>
    </section>
  );
}
