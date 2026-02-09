import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get(`/products/${id}`)
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching product:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <p className="mt-24 text-center text-gray-500 dark:text-gray-400">
        Loading product...
      </p>
    );
  }

  if (!product) {
    return (
      <p className="mt-24 text-center text-gray-500 dark:text-gray-400">
        Product not found.
      </p>
    );
  }

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Product added to cart");
    navigate("/cart");
  };

  const handleAddToWishlist = () => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    wishlist.push(product);
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    alert("Added to wishlist");
    navigate("/customer/wishlist");
  };

  return (
    <section className="px-6 py-12">
      <Link
        to="/products"
        className="mb-8 inline-flex items-center text-sm font-medium text-amber-600 hover:underline"
      >
        ← Back to Marketplace
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-7xl mx-auto">
        <div className="overflow-hidden rounded-3xl bg-gray-100 dark:bg-gray-800 shadow-lg">
         <img
    src={
      product.image
        ? `http://localhost:5000${product.image}`
        : "/images/placeholder.jpg"
    }
    alt={product.name}
    className="w-full h-full object-cover"
  />

        </div>

        <div className="space-y-6">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
            {product.name}
          </h1>

          <p className="text-3xl font-bold text-amber-600">
            ₹{product.price}
          </p>

          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            {product.description}
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <button
              onClick={handleAddToCart}
              className="rounded-lg bg-amber-600 px-8 py-3 text-white font-medium hover:bg-amber-700 transition shadow-md"
            >
              Add to Cart
            </button>

            <button
              onClick={handleAddToWishlist}
              className="rounded-lg border px-8 py-3 font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition shadow-sm"
            >
              Add to Wishlist
            </button>
          </div>

          {/* Artisan */}
          {product.artisan && (
            <Link
              to={`/artisans/${product.artisan._id}`}
              className="mt-8 block rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 hover:shadow-lg transition"
            >
              <p className="text-sm text-gray-500">Meet the Artisan</p>
              <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {product.artisan.fullName}
              </p>
              <p className="text-sm text-gray-500">
                {product.artisan.region}
              </p>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
