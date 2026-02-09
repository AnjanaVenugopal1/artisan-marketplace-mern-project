import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  // 🔐 Normal login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", { email, password });

      // ✅ FIX HERE
      login(res.data.user.role, res.data.token);

      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Login failed");
    }
  };

  // 🔐 Google login
  const handleGoogleSuccess = async (credentialResponse) => {
  console.log("Google credentialResponse:", credentialResponse);

  try {
    const res = await api.post("/auth/google", {
      token: credentialResponse.credential,
    });

    login(res.data.user.role, res.data.token);
    navigate("/");
  } catch (err) {
    console.error("Google login error:", err.response?.data || err);
    alert("Google login failed");
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-white">
          Login
        </h2>

        {/* Normal Login */}
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 rounded border"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 rounded border"
            required
          />
          <button
            type="submit"
            className="w-full bg-amber-600 text-white py-2 rounded hover:bg-amber-700"
          >
            Login
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 text-center text-gray-400">OR</div>

        {/* Google Login */}
        <div className="flex justify-center">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => alert("Google Login Failed")}
          />
        </div>
      </div>
    </div>
  );
}
