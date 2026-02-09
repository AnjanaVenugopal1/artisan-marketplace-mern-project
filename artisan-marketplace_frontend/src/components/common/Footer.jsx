import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-black/80 backdrop-blur-md border-t border-white/10 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-center gap-8">

        {/* BRAND */}
        <div className="text-center md:text-left">
          <h1
            className="text-2xl font-serif font-semibold
            bg-gradient-to-r from-[#FFD978] via-[#F2B705] to-[#C99700]
            bg-clip-text text-transparent tracking-wide"
          >
            KalaSutra
          </h1>

          <p className="mt-2 text-sm text-gray-400 max-w-sm">
            A curated marketplace celebrating India’s artisans, timeless
            craftsmanship, and cultural heritage.
          </p>

          <p className="mt-3 text-xs text-gray-500">
            © 2025 KalaSutra. All rights reserved.
          </p>
        </div>

        {/* SOCIALS */}
        <div className="flex gap-5">
          <a
            href="#"
            className="p-3 rounded-full bg-white/5 hover:bg-white/10
            text-gray-400 hover:text-[#FFD978]
            transition-all duration-300"
          >
            <FaFacebook size={18} />
          </a>

          <a
            href="#"
            className="p-3 rounded-full bg-white/5 hover:bg-white/10
            text-gray-400 hover:text-[#FFD978]
            transition-all duration-300"
          >
            <FaInstagram size={18} />
          </a>

          <a
            href="#"
            className="p-3 rounded-full bg-white/5 hover:bg-white/10
            text-gray-400 hover:text-[#FFD978]
            transition-all duration-300"
          >
            <FaTwitter size={18} />
          </a>
        </div>
      </div>

      {/* BOTTOM LINE */}
      <div className="border-t border-white/10 py-4 text-center text-xs text-gray-500">
        Preserving heritage. Empowering artisans.

      </div>
    </footer>
  );
}
