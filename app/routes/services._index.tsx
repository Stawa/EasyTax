import { Link } from "@remix-run/react";
import { motion } from "framer-motion";
import {
  FaCalendarAlt,
  FaCalculator,
  FaFileAlt,
  FaCheckCircle,
  FaHistory,
  FaRegCalendarCheck,
} from "react-icons/fa";
import { HiArrowNarrowRight } from "react-icons/hi";
import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Layanan EasyTax - Solusi Perpajakan Terpadu" },
    {
      name: "description",
      content:
        "Akses berbagai layanan perpajakan EasyTax untuk memudahkan pengelolaan pajak Anda.",
    },
  ];
};

export default function Services() {
  const services = [
    {
      icon: <FaCalendarAlt className="h-10 w-10" />,
      title: "Tanggal Jatuh Tempo",
      description: "Pantau dan kelola jadwal pembayaran pajak Anda",
      to: "/services/due-date",
      color: "blue",
      gradient: "from-blue-400 to-blue-600",
    },
    {
      icon: <FaCalculator className="h-10 w-10" />,
      title: "Kalkulator Pajak",
      description: "Hitung estimasi pajak dengan mudah dan akurat",
      to: "/services/calculator",
      color: "green",
      gradient: "from-green-400 to-green-600",
    },
    {
      icon: <FaFileAlt className="h-10 w-10" />,
      title: "Formulir dan Dokumen",
      description: "Akses dan unduh dokumen perpajakan yang Anda butuhkan",
      to: "/services/documents",
      color: "yellow",
      gradient: "from-yellow-400 to-yellow-600",
    },
    {
      icon: <FaCheckCircle className="h-10 w-10" />,
      title: "Status Pajak",
      description: "Periksa status perpajakan terkini",
      to: "/services/status",
      color: "purple",
      gradient: "from-purple-400 to-purple-600",
    },
    {
      icon: <FaHistory className="h-10 w-10" />,
      title: "Riwayat Perhitungan",
      description: "Lihat riwayat perhitungan pajak Anda",
      to: "/services/history",
      color: "red",
      gradient: "from-red-400 to-red-600",
    },
    {
      icon: <FaRegCalendarCheck className="h-10 w-10" />,
      title: "Kalender Pajak",
      description: "Jadwal dan agenda perpajakan lengkap",
      to: "/services/calendar",
      color: "indigo",
      gradient: "from-indigo-400 to-indigo-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 2xl:px-16 py-8 sm:py-16 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Layanan <span className="text-blue-600">EasyTax</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Solusi perpajakan komprehensif dengan antarmuka modern untuk
            memudahkan pengelolaan pajak Anda secara efisien
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 2xl:gap-12">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
              whileHover={{
                scale: 1.03,
                transition: { duration: 0.2 },
              }}
              className="group perspective"
            >
              <div className="block h-full bg-white rounded-xl shadow-lg hover:shadow-2xl transform-gpu transition-all duration-300 overflow-hidden">
                <div
                  className={`bg-gradient-to-br ${service.gradient} p-8 text-white`}
                >
                  <div className="flex items-center justify-between">
                    <motion.div className="bg-white/20 rounded-xl p-4">
                      {service.icon}
                    </motion.div>
                  </div>
                </div>
                <div className="p-6 flex flex-col justify-between h-full">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-1">
                      {service.title}
                    </h2>
                    <p className="text-gray-600 text-lg mb-4">
                      {service.description}
                    </p>
                    <Link
                      to={service.to}
                      className="flex items-center gap-1 text-blue-600 hover:text-blue-800 transition-all duration-300 group"
                    >
                      Mulai Sekarang
                      <span className="text-lg mt-1 transform group-hover:translate-x-1 transition-transform duration-300">
                        <HiArrowNarrowRight />
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
