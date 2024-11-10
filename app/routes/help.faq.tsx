import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  FaChevronDown,
  FaChevronLeft,
  FaChevronUp,
  FaQuestionCircle,
} from "react-icons/fa";

export const meta: MetaFunction = () => {
  return [
    { title: "FAQ - EasyTax" },
    {
      name: "description",
      content:
        "Temukan jawaban untuk pertanyaan yang sering diajukan tentang layanan EasyTax.",
    },
  ];
};

interface FAQItem {
  question: string;
  answer: string;
  color: string;
}

const faqItems: FAQItem[] = [
  {
    question: "Apa itu EasyTax?",
    answer:
      "EasyTax adalah platform perpajakan digital yang dirancang untuk membantu Anda mengelola dan menghitung kewajiban pajak dengan mudah dan akurat. Kami menyediakan berbagai fitur dan layanan untuk memastikan kepatuhan pajak Anda.",
    color: "blue",
  },
  {
    question: "Bagaimana cara memulai menggunakan EasyTax?",
    answer:
      "Untuk memulai, Anda cukup mendaftar akun di platform kami. Setelah verifikasi, Anda dapat langsung mengakses berbagai fitur seperti kalkulator pajak, kalender pajak, dan layanan konsultasi.",
    color: "green",
  },
  {
    question: "Apakah data saya aman di EasyTax?",
    answer:
      "Ya, keamanan data adalah prioritas utama kami. Kami menggunakan enkripsi end-to-end dan mengikuti standar keamanan industri terkini untuk melindungi informasi pribadi dan data pajak Anda.",
    color: "purple",
  },
  {
    question: "Bagaimana cara menghubungi dukungan pelanggan?",
    answer:
      "Anda dapat menghubungi tim dukungan kami melalui halaman Bantuan kami. Di sana Anda dapat mengisi formulir kontak atau melihat opsi dukungan lainnya. Tim kami siap membantu 24/7.",
    color: "pink",
  },
  {
    question: "Apakah layanan EasyTax berbayar?",
    answer:
      "Kami menyediakan paket layanan gratis dan berbayar. Paket gratis mencakup fitur dasar, sementara paket berbayar menawarkan fitur lebih lengkap seperti konsultasi pribadi dan analisis pajak mendalam.",
    color: "orange",
  },
];

export default function FAQ() {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems((current) =>
      current.includes(index)
        ? current.filter((item) => item !== index)
        : [...current, index]
    );
  };

  const getGradientClass = (color: string) => {
    const gradients = {
      blue: "from-blue-500 to-blue-600",
      green: "from-green-500 to-green-600",
      purple: "from-purple-500 to-purple-600",
      pink: "from-pink-500 to-pink-600",
      orange: "from-orange-500 to-orange-600",
    };
    return gradients[color as keyof typeof gradients];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16"
        >
          <div className="flex justify-center mb-6">
            <FaQuestionCircle className="h-16 w-16 text-blue-600" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Pertanyaan yang Sering Diajukan
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Temukan jawaban untuk pertanyaan umum seputar layanan EasyTax
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-3xl mx-auto space-y-6"
        >
          {faqItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <button
                onClick={() => toggleItem(index)}
                className={`w-full px-6 py-5 text-left flex items-center justify-between ${
                  openItems.includes(index) ? "rounded-t-2xl" : "rounded-2xl"
                } bg-gradient-to-r ${getGradientClass(item.color)}`}
              >
                <span className="font-semibold text-white text-lg">
                  {item.question}
                </span>
                {openItems.includes(index) ? (
                  <FaChevronUp className="w-5 h-5 text-white" />
                ) : (
                  <FaChevronDown className="w-5 h-5 text-white" />
                )}
              </button>
              {openItems.includes(index) && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="px-6 py-5"
                >
                  <p className="text-gray-600 leading-relaxed text-lg">
                    {item.answer}
                  </p>
                </motion.div>
              )}
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-12 sm:mt-16"
        >
          <Link
            to="/help"
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-xl text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl gap-2"
          >
            <FaChevronLeft className="w-5 h-5" />
            Kembali
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
