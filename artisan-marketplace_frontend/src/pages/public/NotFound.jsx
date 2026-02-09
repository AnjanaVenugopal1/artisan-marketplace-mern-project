import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 px-6">
      <div className="text-center max-w-md">
        {/* 404 */}
        <h1 className="text-7xl font-extrabold text-amber-500 mb-4">
          404
        </h1>

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Page Not Found
        </h2>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Sorry, the page you are looking for doesn’t exist or has been moved.
        </p>

        {/* Actions */}
        <div className="flex justify-center gap-4">
          <Link
            to="/"
            className="px-6 py-2 rounded-lg bg-amber-600 text-white font-semibold hover:bg-amber-500 transition"
          >
            Go Home
          </Link>

          <Link
            to="/products"
            className="px-6 py-2 rounded-lg border border-amber-600 text-amber-600 font-semibold hover:bg-amber-50 dark:hover:bg-gray-800 transition"
          >
            Browse Products
          </Link>
        </div>
      </div>
    </section>
  );
}
