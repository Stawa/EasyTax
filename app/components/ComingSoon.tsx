import { motion } from "framer-motion";
import { Link } from "@remix-run/react";
import { FaArrowLeft } from "react-icons/fa";

interface ComingSoonProps {
  description: string;
}

export function ComingSoon({ description }: ComingSoonProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8 sm:p-12 relative"
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Segera <span className="text-blue-600">Hadir</span>
          </h1>

          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            {description}
          </p>

          <Link to="/services">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
            >
              <FaArrowLeft className="mr-2" />
              Kembali
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
