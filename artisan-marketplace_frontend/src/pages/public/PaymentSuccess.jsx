import { Link } from "react-router-dom";

export default function PaymentSuccess() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-md">
        <h1 className="text-3xl font-bold text-green-600 mb-4">
          Payment Successful 🎉
        </h1>

        <p className="text-gray-600 mb-6">
          Thank you for supporting our artisans. Your order has been placed
          successfully.
        </p>

        <Link
          to="/products"
          className="inline-block bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 transition"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
