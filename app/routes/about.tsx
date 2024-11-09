import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { motion } from "framer-motion";
import { FaUsers, FaChartLine, FaHandshake, FaLightbulb } from "react-icons/fa";
import LowerNavBar from "~/components/LowerNavBar";

export const meta: MetaFunction = () => {
  return [
    { title: "Tentang EasyTax - Platform Perpajakan Digital" },
    {
      name: "description",
      content:
        "Pelajari lebih lanjut tentang EasyTax, platform perpajakan digital terpercaya di Indonesia.",
    },
  ];
};

export default function About() {
  const values = [
    {
      icon: <FaUsers className="h-8 w-8 sm:h-10 sm:w-10 text-blue-600" />,
      title: "Fokus pada Pengguna",
      description:
        "Kami mengutamakan pengalaman dan kepuasan pengguna dalam setiap layanan yang kami berikan.",
    },
    {
      icon: <FaChartLine className="h-8 w-8 sm:h-10 sm:w-10 text-blue-600" />,
      title: "Inovasi Berkelanjutan",
      description:
        "Terus berinovasi dalam mengembangkan solusi perpajakan digital yang efektif.",
    },
    {
      icon: <FaHandshake className="h-8 w-8 sm:h-10 sm:w-10 text-blue-600" />,
      title: "Kepercayaan",
      description:
        "Membangun kepercayaan melalui transparansi dan keamanan data pengguna.",
    },
    {
      icon: <FaLightbulb className="h-8 w-8 sm:h-10 sm:w-10 text-blue-600" />,
      title: "Solusi Cerdas",
      description:
        "Menyediakan solusi cerdas untuk setiap tantangan perpajakan.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 2xl:px-16 py-12 sm:py-16 lg:py-24">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 sm:mb-24"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Tentang <span className="text-blue-600">EasyTax</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Platform perpajakan digital terdepan yang berkomitmen untuk
            menyederhanakan proses perpajakan di Indonesia melalui teknologi
            inovatif.
          </p>
        </motion.div>

        {/* Vision & Mission */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid lg:grid-cols-2 gap-8 mb-16 sm:mb-24"
        >
          <div className="bg-white rounded-2xl p-8 sm:p-10 shadow-lg">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Visi Kami
            </h2>
            <p className="text-gray-600 text-lg">
              Menjadi platform perpajakan digital terpercaya yang memudahkan
              setiap wajib pajak di Indonesia dalam memenuhi kewajiban
              perpajakannya.
            </p>
          </div>
          <div className="bg-white rounded-2xl p-8 sm:p-10 shadow-lg">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Misi Kami
            </h2>
            <p className="text-gray-600 text-lg">
              Menyediakan solusi perpajakan yang inovatif, mudah digunakan, dan
              dapat diandalkan untuk mendukung kepatuhan pajak di Indonesia.
            </p>
          </div>
        </motion.div>

        {/* Values */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-16 sm:mb-24"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-12">
            Nilai-Nilai Kami
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex justify-center mb-4">{value.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 sm:p-12 text-center text-white"
        >
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            Punya Pertanyaan?
          </h2>
          <p className="text-lg mb-6">
            Tim kami siap membantu Anda dengan solusi perpajakan yang tepat
          </p>
          <Link
            to="/help"
            className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Hubungi Kami
          </Link>
        </motion.div>
      </div>
      <LowerNavBar />
    </div>
  );
}
