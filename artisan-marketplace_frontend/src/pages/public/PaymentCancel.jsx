import { Link } from "react-router-dom";

export default function PaymentCancel() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-red-50 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-md">
        <h1 className="text-3xl font-bold text-red-600 mb-4">
          Payment Cancelled ❌
        </h1>

        <p className="text-gray-600 mb-6">
          Your payment was not completed. You can try again or continue browsing
          products.
        </p>

        <Link
          to="/products"
          className="inline-block bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-900 transition"
        >
          Back to Products
        </Link>
      </div>
    </div>
  );
}
