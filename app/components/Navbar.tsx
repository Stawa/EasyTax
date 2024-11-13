//

import { Link, useNavigate } from "@remix-run/react";
import {
  FaUser,
  FaBars,
  FaTimes,
  FaHome,
  FaQuestionCircle,
  FaInfoCircle,
  FaCog,
  FaMoon,
  FaSun,
  FaUserCog,
  FaUserCircle,
  FaChartBar,
  FaSignOutAlt,
  FaArrowRight,
  FaUserPlus,
  FaSignInAlt,
} from "react-icons/fa";
import { useLocation } from "@remix-run/react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { UserProfile } from "~/types/user";

interface NavLink {
  to: string;
  text: string;
  icon: React.ReactNode;
}

interface NavbarProps {
  user: UserProfile | null;
}

export default function Navbar({ user }: NavbarProps) {
  const isEmpty = (obj: UserProfile) => Object.keys(obj).length === 0;
  const location = useLocation();
  const currentActive = location.pathname;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navigate = useNavigate();

  const navLinks: NavLink[] = [
    { to: "/", text: "Beranda", icon: <FaHome className="text-xl" /> },
    { to: "/services", text: "Layanan", icon: <FaCog className="text-xl" /> },
    {
      to: "/help",
      text: "Pusat Bantuan",
      icon: <FaQuestionCircle className="text-xl" />,
    },
    {
      to: "/about",
      text: "Tentang Kami",
      icon: <FaInfoCircle className="text-xl" />,
    },
  ];

  const isActive = (to: string) =>
    currentActive === to ||
    (currentActive === "/" && to === "/") ||
    (currentActive.startsWith("/services") && to === "/services") ||
    (currentActive === "/dashboard" && to === "/dashboard") ||
    (currentActive === "/settings" && to === "/settings");

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleProfile = () => setIsProfileOpen(!isProfileOpen);
  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const handleLogout = async () => {
    setIsMenuOpen(false);
    setIsProfileOpen(false);
    navigate("/logout");
  };

  const handleNavigation = () => {
    setIsMenuOpen(false);
    setIsProfileOpen(false);
  };

  return (
    <>
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
                    onClick={handleNavigation}
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
            {user && !isEmpty(user) ? (
              <button
                onClick={toggleProfile}
                className="flex items-center justify-center rounded-full bg-white/10 w-10 h-10 text-white backdrop-blur-sm transition-all hover:bg-white/20"
              >
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user.fullname}
                    className="w-7 h-7 rounded-full"
                  />
                ) : (
                  <FaUserCircle size={20} />
                )}
              </button>
            ) : (
              <>
                <button
                  onClick={toggleProfile}
                  className="flex items-center space-x-2 text-white hover:text-blue-200 transition-colors duration-200"
                >
                  <FaUser className="text-xl" />
                  <span className="font-medium">Menu</span>
                </button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Desktop Profile Sidebar */}
      <AnimatePresence>
        {isProfileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={toggleProfile}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm hidden md:block"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 z-50 w-80 bg-white dark:bg-gray-900 text-gray-800 dark:text-blue-300 shadow-lg flex flex-col overflow-y-auto border-l border-blue-300 dark:border-blue-500 hidden md:block"
            >
              <div className="px-6 pt-6 flex-shrink-0">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-blue-600 dark:text-blue-400">
                    Menu
                  </h2>
                  <button
                    onClick={toggleProfile}
                    className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    <FaTimes className="h-6 w-6 text-blue-600" />
                  </button>
                </div>

                {user && !isEmpty(user) ? (
                  <div className="flex items-center mb-6 pb-4 border-b border-blue-200 dark:border-blue-700">
                    <div className="flex-shrink-0 w-12 h-12 mr-3">
                      {user.photoURL ? (
                        <img
                          src={user.photoURL}
                          alt={user.fullname}
                          className="rounded-full"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center">
                          <FaUser className="text-2xl text-white" />
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="font-medium text-blue-900 dark:text-blue-300">
                        {user.fullname}
                      </div>
                      <div className="text-sm text-blue-500 dark:text-blue-400">
                        {user.email}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="mb-6 pb-4 border-b border-blue-200 dark:border-blue-700">
                    <div className="text-center mb-4">
                      <FaUserCircle className="mx-auto text-6xl text-blue-500 mb-2" />
                      <h3 className="text-lg font-medium text-blue-900 dark:text-blue-300">
                        Selamat Datang di EasyTax
                      </h3>
                      <p className="text-sm text-blue-600 dark:text-blue-400 mb-4">
                        Masuk atau daftar untuk mengakses semua fitur
                      </p>
                    </div>
                    <div className="space-y-3">
                      <Link
                        to="/sign-in"
                        onClick={handleNavigation}
                        className="flex items-center justify-center space-x-2 w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <FaSignInAlt />
                        <span>Masuk</span>
                      </Link>
                      <Link
                        to="/sign-up"
                        onClick={handleNavigation}
                        className="flex items-center justify-center space-x-2 w-full px-4 py-2 border border-blue-500 text-blue-600 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900 transition-colors"
                      >
                        <FaUserPlus />
                        <span>Daftar</span>
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              <div className="px-6 flex-grow">
                <div className="mb-4">
                  <h3 className="text-sm font-semibold text-blue-400 uppercase mb-2 tracking-wide">
                    Menu Pengguna
                  </h3>
                  {user && !isEmpty(user) ? (
                    <>
                      <Link
                        to="/dashboard"
                        onClick={handleNavigation}
                        className={`block px-4 py-3 text-base text-blue-700 rounded-md transition duration-150 ease-in-out flex items-center mb-2 dark:text-blue-300 ${
                          isActive("/dashboard")
                            ? "bg-blue-100 dark:bg-blue-700"
                            : "hover:bg-blue-100 dark:hover:bg-blue-700"
                        }`}
                      >
                        <FaChartBar className="mr-4 text-xl text-blue-600 dark:text-blue-400" />
                        Dashboard
                        <FaArrowRight className="ml-auto text-blue-600 dark:text-blue-400" />
                      </Link>
                      <Link
                        to="/settings"
                        onClick={handleNavigation}
                        className={`block px-4 py-3 text-base text-blue-700 rounded-md transition duration-150 ease-in-out flex items-center mb-2 dark:text-blue-300 ${
                          isActive("/settings")
                            ? "bg-blue-100 dark:bg-blue-700"
                            : "hover:bg-blue-100 dark:hover:bg-blue-700"
                        }`}
                      >
                        <FaUserCog className="mr-4 text-xl text-blue-600 dark:text-blue-400" />
                        Pengaturan
                        <FaArrowRight className="ml-auto text-blue-600 dark:text-blue-400" />
                      </Link>
                    </>
                  ) : (
                    <div className="text-center py-4 text-blue-600 dark:text-blue-400">
                      <p>
                        Silakan masuk atau daftar untuk mengakses fitur lengkap
                      </p>
                    </div>
                  )}
                </div>

                <div className="mb-4">
                  <h3 className="text-sm font-semibold text-blue-400 uppercase mb-2 tracking-wide">
                    Pengaturan
                  </h3>
                  <button
                    onClick={toggleTheme}
                    className="w-full text-left px-4 py-3 text-base text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-700 hover:text-blue-900 dark:hover:text-white rounded-md transition duration-150 ease-in-out flex items-center mb-2"
                  >
                    {isDarkMode ? (
                      <FaSun className="mr-4 text-xl text-blue-500" />
                    ) : (
                      <FaMoon className="mr-4 text-xl text-blue-600" />
                    )}
                    {isDarkMode ? "Mode Terang" : "Mode Gelap"}
                  </button>
                </div>
              </div>

              {user && !isEmpty(user) && (
                <div className="px-6 py-4 mt-auto border-t border-blue-300 dark:border-blue-500">
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-3 text-base text-blue-600 hover:bg-blue-50 hover:text-blue-700 rounded-md transition duration-150 ease-in-out flex items-center"
                  >
                    <FaSignOutAlt className="mr-4 text-xl" />
                    Keluar
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={toggleMenu}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 z-50 w-full sm:w-80 bg-white dark:bg-gray-900 text-gray-800 dark:text-blue-300 shadow-lg flex flex-col overflow-y-auto md:hidden"
            >
              <div className="px-6 pt-6 flex-shrink-0">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-blue-600 dark:text-blue-400">
                    Menu
                  </h2>
                  <button
                    onClick={toggleMenu}
                    className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    <FaTimes className="h-6 w-6 text-blue-600" />
                  </button>
                </div>

                {user && !isEmpty(user) ? (
                  <div className="flex items-center mb-6 pb-4 border-b border-blue-200 dark:border-blue-700">
                    <div className="flex-shrink-0 w-12 h-12 mr-3">
                      {user.photoURL ? (
                        <img
                          src={user.photoURL}
                          alt={user.fullname}
                          className="rounded-full"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center">
                          <FaUser className="text-2xl text-white" />
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="font-medium text-blue-900 dark:text-blue-300">
                        {user.fullname}
                      </div>
                      <div className="text-sm text-blue-500 dark:text-blue-400">
                        {user.email}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="mb-6 pb-4 border-b border-blue-200 dark:border-blue-700">
                    <div className="text-center mb-4">
                      <FaUserCircle className="mx-auto text-6xl text-blue-500 mb-2" />
                      <h3 className="text-lg font-medium text-blue-900 dark:text-blue-300">
                        Selamat Datang di EasyTax
                      </h3>
                      <p className="text-sm text-blue-600 dark:text-blue-400 mb-4">
                        Masuk atau daftar untuk mengakses semua fitur
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div className="px-6 py-4 flex-grow">
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-blue-400 uppercase mb-2 tracking-wide">
                    Menu Utama
                  </h3>
                  {navLinks.map(({ to, text, icon }) => (
                    <Link
                      key={to}
                      to={to}
                      onClick={handleNavigation}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-lg mb-2 ${
                        isActive(to)
                          ? "bg-blue-50 text-blue-600 dark:bg-blue-900 dark:text-blue-300"
                          : "text-blue-700 hover:bg-blue-50 dark:text-blue-300 dark:hover:bg-blue-800"
                      }`}
                    >
                      {icon}
                      <span>{text}</span>
                    </Link>
                  ))}
                </div>

                {user && !isEmpty(user) ? (
                  <>
                    <div className="mb-6">
                      <h3 className="text-sm font-semibold text-blue-400 uppercase mb-2 tracking-wide">
                        Menu Pengguna
                      </h3>
                      <Link
                        to="/dashboard"
                        onClick={handleNavigation}
                        className={`flex items-center space-x-3 px-4 py-3 rounded-lg mb-2 ${
                          isActive("/dashboard")
                            ? "bg-blue-50 text-blue-600 dark:bg-blue-900 dark:text-blue-300"
                            : "text-blue-700 hover:bg-blue-50 dark:text-blue-300 dark:hover:bg-blue-800"
                        }`}
                      >
                        <FaChartBar className="text-xl text-blue-600 dark:text-blue-400" />
                        <span>Dashboard</span>
                        <FaArrowRight className="ml-auto text-blue-600 dark:text-blue-400" />
                      </Link>
                      <Link
                        to="/settings"
                        onClick={handleNavigation}
                        className={`flex items-center space-x-3 px-4 py-3 rounded-lg mb-2 ${
                          isActive("/settings")
                            ? "bg-blue-50 text-blue-600 dark:bg-blue-900 dark:text-blue-300"
                            : "text-blue-700 hover:bg-blue-50 dark:text-blue-300 dark:hover:bg-blue-800"
                        }`}
                      >
                        <FaUserCog className="text-xl text-blue-600 dark:text-blue-400" />
                        <span>Pengaturan</span>
                        <FaArrowRight className="ml-auto text-blue-600 dark:text-blue-400" />
                      </Link>
                    </div>
                  </>
                ) : (
                  <div className="mb-6">
                    <h3 className="text-sm font-semibold text-blue-400 uppercase mb-2 tracking-wide">
                      Akses Pengguna
                    </h3>
                    <div className="space-y-3">
                      <Link
                        to="/sign-in"
                        onClick={handleNavigation}
                        className="flex items-center justify-center space-x-2 w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <FaSignInAlt />
                        <span>Masuk</span>
                      </Link>
                      <Link
                        to="/sign-up"
                        onClick={handleNavigation}
                        className="flex items-center justify-center space-x-2 w-full px-4 py-2 border border-blue-500 text-blue-600 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900 transition-colors"
                      >
                        <FaUserPlus />
                        <span>Daftar</span>
                      </Link>
                    </div>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-blue-400 uppercase mb-2 tracking-wide">
                    Pengaturan
                  </h3>
                  <button
                    onClick={toggleTheme}
                    className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-blue-700 hover:bg-blue-50 dark:text-blue-300 dark:hover:bg-blue-800"
                  >
                    {isDarkMode ? (
                      <FaSun className="text-xl text-blue-500" />
                    ) : (
                      <FaMoon className="text-xl text-blue-600" />
                    )}
                    <span>{isDarkMode ? "Mode Terang" : "Mode Gelap"}</span>
                  </button>
                </div>
              </div>

              {user && !isEmpty(user) && (
                <div className="px-6 py-4 mt-auto border-t border-blue-300 dark:border-blue-700">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-blue-600 hover:bg-blue-50"
                  >
                    <FaSignOutAlt className="text-xl" />
                    <span>Keluar</span>
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
