import { Link } from "@remix-run/react";
import { FaUser, FaBars, FaTimes } from "react-icons/fa";
import { useLocation } from "@remix-run/react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface NavLink {
  to: string;
  text: string;
}

export default function Navbar() {
  const location = useLocation();
  const currentActive = location.pathname;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks: NavLink[] = [
    { to: "/", text: "Beranda" },
    { to: "/services", text: "Layanan" },
    { to: "/help", text: "Pusat Bantuan" },
    { to: "/about", text: "Tentang Kami" },
  ];

  const isActive = (to: string) => {
    if (to === "/") {
      return currentActive === "/";
    }
    return currentActive.startsWith(to);
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="z-50 bg-gradient-to-r from-blue-600 to-blue-800 px-4 py-4 md:px-8">
      <div className="flex items-center justify-between md:hidden">
        <Link to="/" className="text-xl font-bold text-white">
          EasyTax
        </Link>
        <button
          onClick={toggleMenu}
          className="text-white focus:outline-none"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden"
          >
            <div className="mt-4 flex flex-col space-y-4">
              {navLinks.map(({ to, text }) => (
                <Link
                  key={to}
                  to={to}
                  onClick={() => setIsMenuOpen(false)}
                  className={`text-lg transition-colors duration-200 ease-in-out ${
                    isActive(to)
                      ? "font-semibold text-white"
                      : "text-white/70 hover:text-white"
                  }`}
                >
                  {text}
                </Link>
              ))}
              <div className="flex items-center space-x-3 border-t border-white/20 pt-4">
                <FaUser className="text-white" />
                <Link
                  to="/sign-in"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-lg font-medium text-white transition-colors duration-200 ease-in-out hover:text-blue-200"
                >
                  Masuk
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Menu */}
      <div className="hidden md:flex md:items-center md:justify-between">
        <Link to="/" className="text-xl font-bold text-white">
          EasyTax
        </Link>
        <div className="flex flex-1 justify-center">
          <div className="flex items-center space-x-6 rounded-full bg-white/10 px-8 py-2 backdrop-blur-sm">
            {navLinks.map(({ to, text }) => (
              <motion.div
                key={to}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                whileHover={{ scale: 1.05 }}
              >
                <Link
                  to={to}
                  className={`text-lg transition-colors duration-200 ease-in-out ${
                    isActive(to)
                      ? "font-semibold text-white"
                      : "text-white/70 hover:text-white"
                  }`}
                >
                  {text}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <FaUser className="text-white" />
          <Link
            to="/sign-in"
            className="text-lg font-medium text-white transition-colors duration-200 ease-in-out hover:text-blue-200"
          >
            Masuk
          </Link>
        </div>
      </div>
    </nav>
  );
}
