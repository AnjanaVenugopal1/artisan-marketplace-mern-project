import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Register() {
  const { login } = useAuth(); // demo auto-login
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
    role: "customer",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData.role);

    if (formData.role === "customer") navigate("/");
    else if (formData.role === "artisan") navigate("/artisan/dashboard");
    else navigate("/admin/dashboard");
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="w-full max-w-lg rounded-2xl bg-white dark:bg-gray-800 p-8 shadow-xl">
        
        {/* Header */}
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Create your KalaSutra account
          </h2>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Join a marketplace that celebrates handmade and heritage crafts
          </p>
        </div>

        {/* Role Selection */}
        <div className="mb-6">
          <p className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            I want to join as
          </p>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setFormData({ ...formData, role: "customer" })}
              className={`rounded-lg py-3 font-medium transition ${
                formData.role === "customer"
                  ? "bg-yellow-600 text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
              }`}
            >
              Customer
            </button>
            <button
              type="button"
              onClick={() => setFormData({ ...formData, role: "artisan" })}
              className={`rounded-lg py-3 font-medium transition ${
                formData.role === "artisan"
                  ? "bg-gray-900 text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
              }`}
            >
              Artisan
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Full Name */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
              className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-3 text-sm focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 dark:focus:ring-yellow-400 outline-none"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
              className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-3 text-sm focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 dark:focus:ring-yellow-400 outline-none"
            />
          </div>


          {/* Password */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Minimum 6 characters"
              required
              className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-3 text-sm focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 dark:focus:ring-yellow-400 outline-none"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full rounded-lg bg-yellow-600 py-3 text-white font-semibold hover:bg-yellow-500 transition shadow-md"
          >
            Create Account
          </button>
        </form>

        {/* Footer */}
        <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-yellow-600 hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </section>
  );
}
