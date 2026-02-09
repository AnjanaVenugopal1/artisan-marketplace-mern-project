import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import {
  FaMoon,
  FaSun,
  FaBell,
  FaShoppingCart,
  FaSearch,
  FaHeart,
  FaUser,
} from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";

export default function Navbar({ darkMode, setDarkMode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const { isAuthenticated, userRole, logout } = useAuth();
  const navigate = useNavigate();

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleSearch = (e) => {
    if (e.key === "Enter" && search.trim()) {
      navigate(`/products?search=${search}`);
      setSearch("");
    }
  };

  const dashboardLink =
    userRole === "admin"
      ? "/admin/dashboard"
      : userRole === "artisan"
      ? "/artisan/dashboard"
      : "/";

  return (
    <nav className="sticky top-0 z-50 bg-black/90 backdrop-blur-md border-b border-white/10">
      <div className="w-full h-16 flex items-center px-4">

        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2 mr-10">
          <img
            src="/images/logo.jpg"
            alt="KalaSutra Logo"
            className="h-9 w-9 object-cover rounded-md"
          />
          <span className="text-2xl font-serif font-semibold bg-gradient-to-r from-[#FFD978] via-[#F2B705] to-[#C99700] bg-clip-text text-transparent">
            KalaSutra
          </span>
        </Link>

        {/* CENTER LINKS */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-200">
          <Link to="/products" className="hover:text-[#FFD978]">Products</Link>
          <Link to="/artisans" className="hover:text-[#FFD978]">Artisans</Link>
          <Link to="/stories" className="hover:text-[#FFD978]">Stories</Link>
          <Link to="/about" className="hover:text-[#FFD978]">About</Link>
        </div>

        {/* RIGHT SIDE */}
        <div className="hidden md:flex items-center gap-4 ml-auto">

          {/* SEARCH */}
          <div className="flex items-center bg-white/10 rounded-full px-4 py-1.5 w-64">
            <FaSearch className="text-gray-400 mr-2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleSearch}
              placeholder="Search crafts..."
              className="bg-transparent outline-none text-sm text-gray-200 w-full"
            />
          </div>

          {/* DARK MODE */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-white/10 text-gray-200"
          >
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>

          {/* AUTHENTICATED */}
          {isAuthenticated ? (
            <>
              {/* CUSTOMER ICONS */}
              {userRole === "customer" && (
                <>
                  <Link to="/cart" className="p-2 hover:bg-white/10 rounded-full text-gray-200">
                    <FaShoppingCart />
                  </Link>

                  <Link to="/wishlist" className="p-2 hover:bg-white/10 rounded-full text-gray-200">
                    <FaHeart />
                  </Link>

                  <Link to="/orders" className="p-2 hover:bg-white/10 rounded-full text-gray-200">
                    <FaBell />
                  </Link>

                  <Link to="/profile" className="p-2 hover:bg-white/10 rounded-full text-gray-200">
                    <FaUser />
                  </Link>
                </>
              )}

              {/* DASHBOARD */}
              {userRole !== "customer" && (
                <Link to={dashboardLink} className="text-sm hover:text-[#FFD978]">
                  Dashboard
                </Link>
              )}

              {/* ROLE BADGE */}
              <span className="px-3 py-1 text-xs rounded-full bg-[#FFD978]/20 text-[#FFD978] capitalize">
                {userRole}
              </span>

              {/* LOGOUT */}
              <button
                onClick={handleLogout}
                className="px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-sm text-gray-200"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="px-5 py-1.5 rounded-full text-sm font-medium text-black bg-gradient-to-r from-[#FFD978] via-[#F2B705] to-[#C99700]"
            >
              Login
            </Link>
          )}
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden ml-auto text-gray-200"
        >
          {isOpen ? <HiX size={24} /> : <HiMenu size={24} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {isOpen && (
        <div className="md:hidden bg-black/95 px-4 py-4 space-y-3 text-gray-200">
          <Link to="/products" className="block">Products</Link>
          <Link to="/artisans" className="block">Artisans</Link>
          <Link to="/stories" className="block">Stories</Link>
          <Link to="/about" className="block">About</Link>

          <button onClick={toggleDarkMode} className="block w-full text-left">
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>

          {isAuthenticated ? (
            <>
              {userRole === "customer" && (
                <>
                  <Link to="/cart">Cart</Link>
                  <Link to="/wishlist">Wishlist</Link>
                  <Link to="/orders">My Orders</Link>
                  <Link to="/profile">Profile</Link>
                </>
              )}

              {userRole !== "customer" && (
                <Link to={dashboardLink}>Dashboard</Link>
              )}

              <button
                onClick={handleLogout}
                className="w-full py-2 rounded bg-white/10"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="block text-center py-2 rounded bg-yellow-500 text-black"
            >
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
