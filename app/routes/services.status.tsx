import type { MetaFunction } from "@remix-run/node";
import { motion } from "framer-motion";
import {
  FaCheckCircle,
  FaSpinner,
  FaExclamationCircle,
  FaDownload,
  FaPrint,
} from "react-icons/fa";
import LowerNavBar from "~/components/LowerNavBar";

export const meta: MetaFunction = () => {
  return [
    { title: "Status Pajak EasyTax - Pantau Status Pajak Anda" },
    {
      name: "description",
      content:
        "Pantau dan periksa status perpajakan Anda dengan mudah menggunakan EasyTax.",
    },
  ];
};

interface TaxStatus {
  status: "not_started" | "on_progress" | "completed";
  receipt: {
    transactionNumber: string;
    receiptDate: string;
    receiptTime: string;
    npwp: string;
    taxpayerName: string;
    taxType: string;
    taxPeriod: string;
    reportedFile: string;
    fileSize: string;
  };
}

export default function Status() {
  const notes = {
    not_started: "Laporan sedang dalam proses verifikasi oleh petugas pajak.",
    on_progress: "Laporan sedang dalam proses verifikasi oleh petugas pajak.",
    completed: "Laporan telah disetujui dan diterima oleh petugas pajak.",
  };

  const taxStatus: TaxStatus = {
    status: "completed", // can be 'not_started', 'on_progress', 'completed'
    receipt: {
      transactionNumber: "TX-20240215-001",
      receiptDate: "15 Februari 2024",
      receiptTime: "14:30 WIB",
      npwp: "1234567890",
      taxpayerName: "PT. Sample Indonesia",
      taxType: "PPh Pasal 21",
      taxPeriod: "Januari 2024",
      reportedFile: "SPT-PPH21-012024.pdf",
      fileSize: "2.4 MB",
    },
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <FaCheckCircle className="h-16 w-16 text-green-500" />;
      case "on_progress":
        return <FaSpinner className="h-16 w-16 text-yellow-500 animate-spin" />;
      default:
        return <FaExclamationCircle className="h-16 w-16 text-red-500" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed":
        return "Selesai";
      case "on_progress":
        return "Sedang Diproses";
      default:
        return "Belum Dimulai";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-50 text-green-700 ring-green-600/20";
      case "on_progress":
        return "bg-yellow-50 text-yellow-700 ring-yellow-600/20";
      default:
        return "bg-red-50 text-red-700 ring-red-600/20";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 2xl:px-16 py-8 sm:py-16 lg:py-24 2xl:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Status <span className="text-blue-600">Pajak</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Pantau status perpajakan dan unduh dokumen Anda
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 2xl:gap-16">
          {/* Left Container - Details Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-br from-white via-white to-blue-50 rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300 p-6 sm:p-8 border border-blue-100 relative overflow-hidden"
          >
            <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent mb-8 relative">
              Informasi Detail
            </h2>

            <div className="space-y-6 relative">
              <div className="bg-gradient-to-br from-indigo-50 via-blue-50 to-white p-6 rounded-xl border border-indigo-100 shadow-sm hover:shadow-md transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className="bg-indigo-100 rounded-full p-2 mr-3">
                    <svg
                      className="w-5 h-5 text-indigo-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-indigo-900">
                    Informasi Penerimaan
                  </h3>
                </div>

                <div className="space-y-4 divide-y divide-indigo-100">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-4">
                    <div className="bg-white/70 backdrop-blur-sm p-3 rounded-lg shadow-sm">
                      <p className="text-sm font-medium text-indigo-600 mb-1">
                        Nomor Transaksif
                      </p>
                      <p className="font-medium text-gray-800">
                        {taxStatus.receipt.transactionNumber}
                      </p>
                    </div>
                    <div className="bg-white/70 backdrop-blur-sm p-3 rounded-lg shadow-sm">
                      <p className="text-sm font-medium text-indigo-600 mb-1">
                        Tanggal & Waktu
                      </p>
                      <p className="font-medium text-gray-800">
                        {taxStatus.receipt.receiptDate}{" "}
                        {taxStatus.receipt.receiptTime}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4">
                    <div className="bg-white/70 backdrop-blur-sm p-3 rounded-lg shadow-sm">
                      <p className="text-sm font-medium text-indigo-600 mb-1">
                        NPWP
                      </p>
                      <p className="font-medium text-gray-800">
                        {taxStatus.receipt.npwp}
                      </p>
                    </div>
                    <div className="bg-white/70 backdrop-blur-sm p-3 rounded-lg shadow-sm">
                      <p className="text-sm font-medium text-indigo-600 mb-1">
                        Nama Wajib Pajak
                      </p>
                      <p className="font-medium text-gray-800">
                        {taxStatus.receipt.taxpayerName}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                    <div className="bg-white/70 backdrop-blur-sm p-3 rounded-lg shadow-sm">
                      <p className="text-sm font-medium text-indigo-600 mb-1">
                        Jenis Pajak
                      </p>
                      <p className="font-medium text-gray-800">
                        {taxStatus.receipt.taxType}
                      </p>
                    </div>
                    <div className="bg-white/70 backdrop-blur-sm p-3 rounded-lg shadow-sm">
                      <p className="text-sm font-medium text-indigo-600 mb-1">
                        Masa Pajak
                      </p>
                      <p className="font-medium text-gray-800">
                        {taxStatus.receipt.taxPeriod}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Container - Status and Progress */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-br from-white to-blue-50 rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300 p-6 sm:p-8 border border-blue-100"
          >
            <div className="flex flex-col items-center mb-8">
              {getStatusIcon(taxStatus.status)}
              <h2 className="mt-4 text-2xl font-bold bg-gradient-to-r from-blue-900 to-blue-600 bg-clip-text text-transparent">
                Status Laporan
              </h2>
              <span
                className={`mt-3 px-6 py-2 rounded-full text-base font-medium shadow-sm ${getStatusColor(
                  taxStatus.status
                )}`}
              >
                {getStatusText(taxStatus.status)}
              </span>
            </div>

            <div className="bg-gradient-to-br from-indigo-50 via-blue-50 to-white p-6 rounded-xl border border-indigo-100 mb-6 shadow-inner">
              <h3 className="text-lg font-semibold text-indigo-900 mb-3">
                Catatan
              </h3>
              <p className="text-gray-700 mb-4">{notes[taxStatus.status]}</p>
              <p className="text-sm font-medium text-indigo-600">
                File Dilaporkan:
              </p>
              <p className="font-medium text-gray-800">
                {taxStatus.receipt.reportedFile}
              </p>
              <p className="text-sm font-medium text-indigo-600">
                Ukuran File:
              </p>
              <p className="font-medium text-gray-800">
                {taxStatus.receipt.fileSize}
              </p>
            </div>

            <div className="flex gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 inline-flex items-center justify-center px-6 py-3 rounded-xl bg-gradient-to-r from-green-600 via-green-600 to-green-700 text-white hover:from-green-700 hover:via-green-700 hover:to-green-800 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <FaDownload className="mr-2" />
                Unduh PDF
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 inline-flex items-center justify-center px-6 py-3 rounded-xl bg-gradient-to-r from-gray-50 via-blue-50 to-indigo-50 text-indigo-700 hover:from-gray-100 hover:via-blue-100 hover:to-indigo-100 transition-all duration-300 shadow-md hover:shadow-lg border border-indigo-100"
              >
                <FaPrint className="mr-2" />
                Cetak
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
      <LowerNavBar currentActive="/services/status" />
    </div>
  );
}
