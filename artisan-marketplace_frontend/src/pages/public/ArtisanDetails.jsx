import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../api/axios";
import ProductCard from "../../components/products/ProductCard";

export default function ArtisanDetails() {
  const { id } = useParams();

  const [artisan, setArtisan] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArtisanData = async () => {
      try {
        setLoading(true);

        // Fetch artisan
        const artisanRes = await api.get(`/users/${id}`);
        const artisanData = artisanRes.data;

        if (!artisanData || artisanData.role !== "artisan") {
          setArtisan(null);
          setProducts([]);
          return;
        }

        setArtisan(artisanData);

        // Fetch products by artisan
        const productsRes = await api.get(`/products?artisanId=${id}`);
        const productsData = Array.isArray(productsRes.data)
          ? productsRes.data
          : [];

        setProducts(productsData);
      } catch (error) {
        console.error("Error loading artisan details:", error);
        setArtisan(null);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchArtisanData();
  }, [id]);

  if (loading) {
    return (
      <div className="py-40 text-center text-gray-400">
        Loading artisan profile…
      </div>
    );
  }

  if (!artisan) {
    return (
      <div className="py-40 text-center text-gray-400">
        Artisan not found.
      </div>
    );
  }

  return (
    <section className="bg-gradient-to-b from-black to-gray-950 text-white min-h-screen">

      {/* ================= BACK ================= */}
      <div className="max-w-7xl mx-auto px-6 pt-10">
        <Link
          to="/artisans"
          className="text-amber-400 hover:underline"
        >
          ← Back to Artisans
        </Link>
      </div>

      {/* ================= HERO / PROFILE ================= */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex flex-col md:flex-row gap-16 items-center">

          {/* Image */}
          <div className="relative">
            <img
              src={artisan.profileImage || "/images/placeholder.jpg"}
              alt={artisan.fullName}
              className="h-[340px] w-[340px] rounded-3xl object-cover
                border border-white/10 shadow-xl"
            />
          </div>

          {/* Info */}
          <div className="max-w-2xl">
            <p className="uppercase tracking-[0.3em] text-xs text-amber-400 mb-4">
              Master Artisan
            </p>

            <h1 className="text-4xl md:text-5xl font-serif font-semibold mb-4">
              {artisan.fullName}
            </h1>

            <p className="text-gray-400 mb-6">
              {artisan.region} · {artisan.craftType}
            </p>

            <p className="text-lg text-gray-300 leading-relaxed">
              {artisan.bio ||
                "This artisan carries forward a legacy of traditional craftsmanship, preserving cultural heritage through skilled hands and timeless techniques."}
            </p>

            {/* Meta badges */}
            <div className="mt-8 flex flex-wrap gap-4">
              {artisan.region && (
                <span className="px-4 py-2 rounded-full text-sm
                  bg-white/5 border border-white/10">
                  📍 {artisan.region}
                </span>
              )}
              {artisan.craftType && (
                <span className="px-4 py-2 rounded-full text-sm
                  bg-white/5 border border-white/10">
                  🧵 {artisan.craftType}
                </span>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ================= STORY / PHILOSOPHY ================= */}
      <section className="px-6 py-24 bg-black/40">
        <div className="max-w-4xl mx-auto text-center">
          <p className="uppercase tracking-widest text-xs text-amber-400 mb-4">
            Artisan Story
          </p>

          <h2 className="text-3xl font-serif font-semibold mb-6">
            Craft, Culture & Commitment
          </h2>

          <p className="text-lg text-gray-300 leading-relaxed">
            Each creation reflects years of dedication, cultural values,
            and respect for sustainable, handmade processes. Through their
            work, this artisan keeps traditions alive while adapting to
            contemporary design sensibilities.
          </p>
        </div>
      </section>

      {/* ================= PRODUCTS ================= */}
      <section className="px-6 py-24">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-serif font-semibold mb-12">
            Creations by {artisan.fullName}
          </h2>

          {products.length === 0 ? (
            <p className="text-gray-400">
              No products listed yet.
            </p>
          ) : (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-12">
              {products.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </section>
  );
}
