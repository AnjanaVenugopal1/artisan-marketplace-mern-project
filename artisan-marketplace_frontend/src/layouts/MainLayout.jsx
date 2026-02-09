import { Outlet } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

export default function MainLayout({ darkMode, setDarkMode }) {
  return (
    <>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

      {/* 🔥 THIS IS THE KEY LINE */}
      <Outlet />

      <Footer />
    </>
  );
}
