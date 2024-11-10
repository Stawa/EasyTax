import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { motion } from "framer-motion";
import { FaQuestionCircle, FaHeadset } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

export const meta: MetaFunction = () => {
  return [
    { title: "Pusat Bantuan EasyTax - Dukungan Perpajakan Digital" },
    {
      name: "description",
      content:
        "Temukan jawaban untuk pertanyaan Anda seputar layanan perpajakan digital EasyTax.",
    },
  ];
};

export default function Help() {
  const helpCategories = [
    {
      icon: <FaQuestionCircle className="h-8 w-8 text-blue-600" />,
      title: "FAQ",
      description: "Temukan jawaban untuk pertanyaan yang sering diajukan",
      link: "/help/faq",
    },
    {
      icon: <MdEmail className="h-8 w-8 text-blue-600" />,
      title: "Email",
      description: "Kirim pertanyaan Anda ke support@easytax.id",
      link: "#contact",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Pusat Bantuan <span className="text-blue-600">EasyTax</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Kami siap membantu Anda dengan segala pertanyaan seputar layanan
            perpajakan digital
          </p>
        </motion.div>

        {/* Help Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-16"
        >
          {helpCategories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-4">{category.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {category.title}
                </h3>
                <p className="text-gray-600 mb-4">{category.description}</p>
                <Link
                  to={category.link}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Pelajari Lebih Lanjut →
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-white rounded-2xl p-8 sm:p-12 shadow-lg"
          id="contact"
        >
          <div className="text-center mb-12">
            <FaHeadset className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Hubungi Tim Dukungan Kami
            </h2>
            <p className="text-gray-600">Tim kami siap membantu Anda 24/7</p>
          </div>

          <form className="max-w-lg mx-auto space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Nama Lengkap
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Pesan
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Kirim Pesan
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
