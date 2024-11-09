import { Link } from "@remix-run/react";
import {
  FaCalendarAlt,
  FaCalculator,
  FaFileAlt,
  FaCheckCircle,
  FaHistory,
  FaRegCalendarCheck,
} from "react-icons/fa";
import { motion } from "framer-motion";

interface LowerNavBarProps {
  currentActive?: string;
}

export default function LowerNavBar({ currentActive }: LowerNavBarProps) {
  const navItems = [
    {
      icon: <FaCalendarAlt className="h-5 w-5 sm:h-6 sm:w-6" />,
      text: "Tanggal Jatuh Tempo",
      to: "/services/due-date",
    },
    {
      icon: <FaCalculator className="h-5 w-5 sm:h-6 sm:w-6" />,
      text: "Kalkulator Pajak",
      to: "/services/calculator",
    },
    {
      icon: <FaFileAlt className="h-5 w-5 sm:h-6 sm:w-6" />,
      text: "Formulir dan Dokumen",
      to: "/services/documents",
    },
    {
      icon: <FaCheckCircle className="h-5 w-5 sm:h-6 sm:w-6" />,
      text: "Status Pajak",
      to: "/services/status",
    },
    {
      icon: <FaHistory className="h-5 w-5 sm:h-6 sm:w-6" />,
      text: "Riwayat Perhitungan",
      to: "/services/history",
    },
    {
      icon: <FaRegCalendarCheck className="h-5 w-5 sm:h-6 sm:w-6" />,
      text: "Kalender Pajak",
      to: "/services/calendar",
    },
  ];

  return (
    <motion.nav
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="mt-auto z-50 bg-gray-50"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 2xl:px-16 mb-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl bg-white p-4 shadow-lg"
        >
          {/* Mobile View */}
          <div className="grid grid-cols-3 gap-4 lg:hidden">
            {navItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className={currentActive === item.to ? "scale-110" : ""}
              >
                <Link
                  to={item.to}
                  className={`flex flex-col items-center justify-center text-center ${
                    currentActive === item.to ? "transform scale-105" : ""
                  }`}
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className={`mb-2 rounded-full p-3 ${
                      currentActive === item.to
                        ? "bg-blue-200 shadow-md"
                        : "bg-blue-100"
                    }`}
                  >
                    <div className={`${
                      currentActive === item.to
                        ? "text-blue-700 scale-110"
                        : "text-blue-600"
                    }`}>{item.icon}</div>
                  </motion.div>
                  <span className={`text-xs font-medium sm:text-sm ${
                    currentActive === item.to
                      ? "text-blue-700 font-semibold"
                      : "text-gray-600"
                  }`}>
                    {item.text}
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Desktop View */}
          <div className="hidden lg:block">
            <div className="flex items-center justify-center space-x-8 xl:space-x-12 2xl:space-x-16">
              {navItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className={currentActive === item.to ? "scale-110" : ""}
                >
                  <Link
                    to={item.to}
                    className={`flex flex-col items-center text-center ${
                      currentActive === item.to ? "transform scale-105" : ""
                    }`}
                  >
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className={`mb-2 rounded-full p-3 ${
                        currentActive === item.to
                          ? "bg-blue-200 shadow-md"
                          : "bg-blue-100"
                      }`}
                    >
                      <div className={`${
                        currentActive === item.to
                          ? "text-blue-700 scale-110"
                          : "text-blue-600"
                      }`}>{item.icon}</div>
                    </motion.div>
                    <span className={`text-sm font-medium xl:text-base ${
                      currentActive === item.to
                        ? "text-blue-700 font-semibold"
                        : "text-gray-600"
                    }`}>
                      {item.text}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
}
