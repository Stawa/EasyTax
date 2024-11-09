import { Link } from "@remix-run/react";
import { motion } from "framer-motion";

interface ErrorPageProps {
  statusCode: number;
}

export default function ErrorPage({ statusCode }: ErrorPageProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="mb-4 text-9xl font-bold text-blue-600">{statusCode}</h1>
        <h2 className="mb-8 text-2xl font-semibold text-gray-800">
          Halaman Tidak Ditemukan
        </h2>
        <p className="mb-8 text-gray-600">
          Maaf, halaman yang Anda cari tidak dapat ditemukan atau telah
          dipindahkan.
        </p>
        <Link
          to="/"
          className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700"
        >
          Kembali ke Beranda
        </Link>
      </motion.div>
    </div>
  );
}
