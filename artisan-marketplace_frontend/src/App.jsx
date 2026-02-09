import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

import MainLayout from "./layouts/MainLayout";
import Loader from "./components/common/Loader";
import ProtectedRoute from "./components/common/ProtectedRoute";

// Public pages
import Home from "./pages/public/Home";
import Products from "./pages/public/Products";
import ProductDetails from "./pages/public/ProductDetails";
import Artisans from "./pages/public/Artisans";
import ArtisanDetails from "./pages/public/ArtisanDetails";
import Stories from "./pages/public/Stories";
import About from "./pages/public/About";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import PaymentSuccess from "./pages/public/PaymentSuccess";
import PaymentCancel from "./pages/public/PaymentCancel";
import NotFound from "./pages/public/NotFound";

// Customer pages
import Cart from "./pages/cart/Cart";
import Checkout from "./pages/customer/Checkout";
import Orders from "./pages/customer/Orders";
import Wishlist from "./pages/customer/Wishlist";
import Profile from "./pages/customer/Profile";

// Artisan & Admin
import ArtisanDashboard from "./pages/artisan/Dashboard";
import AdminDashboard from "./pages/admin/Dashboard";
import AddProduct from "./pages/admin/AddProduct";


export default function App() {
  const [showLoader] = useState(false);

  if (showLoader) return <Loader />;

  return (
    <Router>
      <Routes>
        {/* 🔥 PAYMENT CALLBACKS (outside layout) */}
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/payment-cancel" element={<PaymentCancel />} />

        {/* 🔹 MAIN LAYOUT */}
        <Route path="/" element={<MainLayout />}>
          {/* Public */}
          <Route index element={<Home />} />
          <Route path="products" element={<Products />} />
          <Route path="products/:id" element={<ProductDetails />} />
          <Route path="artisans" element={<Artisans />} />
          <Route path="artisans/:id" element={<ArtisanDetails />} />
          <Route path="stories" element={<Stories />} />
          <Route path="about" element={<About />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />

          {/* Customer */}
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="orders" element={<Orders />} />
          <Route path="wishlist" element={<Wishlist />} />
          <Route path="profile" element={<Profile />} />

          {/* 404 inside layout */}
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* 🔐 PROTECTED DASHBOARDS */}
        <Route
          path="/artisan/dashboard"
          element={
            <ProtectedRoute role="artisan">
              <ArtisanDashboard />
            </ProtectedRoute>
          }
        />



        <Route path="/admin/add-product" element={<AddProduct />} />

        <Route
  path="/admin/"
  element={
    <ProtectedRoute role="artisan">
      <AddProduct />
    </ProtectedRoute>
  }
/>


        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}
