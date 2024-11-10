import type { MetaFunction } from "@remix-run/node";
import { motion } from "framer-motion";
import { FaDownload, FaFilePdf, FaHistory } from "react-icons/fa";
import LowerNavBar from "~/components/LowerNavBar";

export const meta: MetaFunction = () => {
  return [
    { title: "Riwayat Pajak EasyTax - Lihat Riwayat Pajak Anda" },
    {
      name: "description",
      content:
        "Lihat dan kelola riwayat perpajakan Anda dengan mudah menggunakan EasyTax.",
    },
  ];
};

export default function History() {
  const taxDocuments = [
    {
      id: 1,
      name: "Laporan Pajak 2023",
      date: "31 Des 2023",
      size: "2.4 MB",
      url: "#",
    },
    {
      id: 2,
      name: "Bukti Pembayaran PPh 21",
      date: "15 Nov 2023",
      size: "1.2 MB",
      url: "#",
    },
    {
      id: 3,
      name: "SPT Tahunan 2022",
      date: "31 Mar 2023",
      size: "3.1 MB",
      url: "#",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 2xl:px-16 py-6 sm:py-12 lg:py-16 2xl:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 sm:mb-12"
        >
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            Riwayat <span className="text-blue-600">Dokumen Pajak</span>
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Akses dan unduh dokumen perpajakan Anda dengan mudah
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl shadow-lg"
        >
          <div className="p-4 sm:p-6 lg:p-8">
            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
              <div className="bg-blue-100 rounded-full p-1.5 sm:p-2">
                <FaHistory className="text-blue-600 h-4 w-4 sm:h-5 sm:w-5" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                Dokumen Tersimpan
              </h2>
            </div>

            {/* Mobile View */}
            <div className="block sm:hidden">
              {taxDocuments.map((doc, index) => (
                <motion.div
                  key={doc.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="mb-4 p-4 border rounded-lg"
                >
                  <div className="flex items-center mb-2">
                    <FaFilePdf className="h-4 w-4 text-red-500 mr-2" />
                    <span className="text-sm font-medium text-gray-900">
                      {doc.name}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 mb-2">
                    <div>Tanggal: {doc.date}</div>
                    <div>Ukuran: {doc.size}</div>
                  </div>
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href={doc.url}
                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <FaDownload className="h-3 w-3 mr-1" />
                    Unduh
                  </motion.a>
                </motion.div>
              ))}
            </div>

            {/* Desktop View */}
            <div className="hidden sm:block overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nama Dokumen
                    </th>
                    <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tanggal
                    </th>
                    <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ukuran
                    </th>
                    <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Unduh
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {taxDocuments.map((doc, index) => (
                    <motion.tr
                      key={doc.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <FaFilePdf className="h-4 w-4 lg:h-5 lg:w-5 text-red-500 mr-2 lg:mr-3" />
                          <span className="text-sm text-gray-900">
                            {doc.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {doc.date}
                      </td>
                      <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {doc.size}
                      </td>
                      <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                        <motion.a
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          href={doc.url}
                          className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          <FaDownload className="h-3 w-3 lg:h-4 lg:w-4 mr-1" />
                          Unduh
                        </motion.a>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      </div>
      <LowerNavBar currentActive="/services/history" />
    </div>
  );
}
