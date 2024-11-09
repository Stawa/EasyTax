import { useState } from "react";
import { motion } from "framer-motion";
import type { MetaFunction } from "@remix-run/node";
import {
  FaEdit,
  FaTrash,
  FaCalculator,
  FaSave,
  FaQuestionCircle,
} from "react-icons/fa";
import Notiflix from "notiflix";
import LowerNavBar from "~/components/LowerNavBar";

export const meta: MetaFunction = () => {
  return [
    { title: "Kalkulator Pajak EasyTax - Hitung Pajak dengan Mudah" },
    {
      name: "description",
      content:
        "Hitung pajak Anda dengan mudah menggunakan kalkulator pajak EasyTax.",
    },
  ];
};

interface TaxRecord {
  id: number;
  ptkp: string;
  sumberDana: string;
  tanggal: string;
  keterangan: string;
  nominal: string;
}

export default function Calculator() {
  const [formData, setFormData] = useState({
    ptkp: "",
    sumberDana: "",
    tanggal: "",
    keterangan: "",
    nominal: "",
  });

  const [records, setRecords] = useState<TaxRecord[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [savedRecords, setSavedRecords] = useState<TaxRecord[]>([]);
  const [showInfo, setShowInfo] = useState(false);

  const ptkpOptions = [
    { value: "TK/0", label: "TK/0 - Rp 54.000.000/tahun" },
    { value: "TK/1", label: "TK/1 - Rp 58.500.000/tahun" },
    { value: "TK/2", label: "TK/2 - Rp 63.000.000/tahun" },
    { value: "TK/3", label: "TK/3 - Rp 67.500.000/tahun" },
    { value: "K/0", label: "K/0 - Rp 58.500.000/tahun" },
    { value: "K/1", label: "K/1 - Rp 63.000.000/tahun" },
    { value: "K/2", label: "K/2 - Rp 67.500.000/tahun" },
    { value: "K/3", label: "K/3 - Rp 72.000.000/tahun" },
  ];

  const sumberDanaOptions = [
    { value: "Gaji dan Tunjangan", label: "Gaji dan Tunjangan" },
    { value: "Pekerjaan Bebas", label: "Pekerjaan Bebas" },
    { value: "Penghasilan Usaha", label: "Penghasilan Usaha" },
    { value: "Hasil Investasi", label: "Hasil Investasi" },
  ];

  const formatNumber = (num: string) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name === "nominal") {
      const numericValue = value.replace(/\D/g, "");
      const formattedValue = formatNumber(numericValue);
      setFormData((prev) => ({
        ...prev,
        [name]: formattedValue,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const validateForm = () => {
    const { ptkp, sumberDana, tanggal, keterangan, nominal } = formData;
    if (!ptkp || !sumberDana || !tanggal || !keterangan || !nominal) {
      Notiflix.Notify.failure("Semua field harus diisi!");
      return false;
    }
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    if (editingId !== null) {
      setRecords(
        records.map((record) =>
          record.id === editingId ? { ...formData, id: editingId } : record
        )
      );
      setEditingId(null);
      Notiflix.Notify.success("Data berhasil diperbarui!");
    } else {
      setRecords([...records, { ...formData, id: Date.now() }]);
      setShowTable(true);
      Notiflix.Notify.success("Data berhasil ditambahkan!");
    }

    setFormData({
      ptkp: "",
      sumberDana: "",
      tanggal: "",
      keterangan: "",
      nominal: "",
    });
  };

  const handleSave = () => {
    setSavedRecords([...records]);
    setShowResults(true);
    setShowTable(false);
    setShowInfo(false);
    Notiflix.Notify.success("Data berhasil disimpan!");
  };

  const handleEdit = (record: TaxRecord) => {
    setEditingId(record.id);
    setFormData(record);
  };

  const handleDelete = (id: number) => {
    setRecords(records.filter((record) => record.id !== id));
    Notiflix.Notify.success("Data berhasil dihapus!");
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({
      ptkp: "",
      sumberDana: "",
      tanggal: "",
      keterangan: "",
      nominal: "",
    });
  };

  const calculateTotalTax = () => {
    const totalIncome = records.reduce(
      (sum, record) => sum + parseInt(record.nominal.replace(/,/g, ""), 10),
      0
    );
    return totalIncome * 0.1;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 max-w-full1920px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Kalkulator <span className="text-blue-600">Pajak</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Hitung pajak Anda dengan mudah dan akurat menggunakan kalkulator
            pajak EasyTax
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-full1920px] mx-auto bg-white rounded-xl shadow-lg p-6 sm:p-8"
        >
          {!showResults && (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="ptkp"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    PTKP (Penghasilan Tidak Kena Pajak){" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="ptkp"
                    name="ptkp"
                    value={formData.ptkp}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Pilih PTKP</option>
                    {ptkpOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="sumberDana"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Sumber Dana <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="sumberDana"
                    name="sumberDana"
                    value={formData.sumberDana}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Pilih Sumber Dana</option>
                    {sumberDanaOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="tanggal"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Tanggal <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    id="tanggal"
                    name="tanggal"
                    value={formData.tanggal}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="nominal"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Nominal <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="nominal"
                    name="nominal"
                    value={formData.nominal}
                    onChange={handleChange}
                    required
                    placeholder="Masukkan nominal"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <label
                    htmlFor="keterangan"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Keterangan Hasil <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="keterangan"
                    name="keterangan"
                    value={formData.keterangan}
                    onChange={handleChange}
                    required
                    placeholder="Masukkan keterangan"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="pt-4 flex gap-4">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  {editingId !== null
                    ? "Perbarui"
                    : records.length > 0
                    ? "Tambahkan"
                    : "Simpan"}
                </motion.button>
                {records.length > 0 && !editingId && (
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={handleSave}
                    className="flex-1 bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <FaSave />
                    Simpan
                  </motion.button>
                )}
                {editingId !== null && (
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={handleCancel}
                    className="flex-1 bg-gray-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-600 transition-colors"
                  >
                    Batal
                  </motion.button>
                )}
              </div>
            </form>
          )}

          {showResults && savedRecords.length > 0 && (
            <>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mt-8 w-full overflow-hidden rounded-xl border border-gray-200 shadow-lg"
              >
                <div className="overflow-x-auto">
                  <table
                    className="w-full divide-y divide-gray-200"
                    style={{ borderCollapse: "collapse" }}
                  >
                    <thead className="bg-gradient-to-r from-blue-600 to-blue-700">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider border border-gray-300">
                          No
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider border border-gray-300">
                          PTKP
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider border border-gray-300">
                          Sumber Dana
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider border border-gray-300">
                          Tanggal
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider border border-gray-300">
                          Nominal
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider border border-gray-300">
                          Keterangan
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {savedRecords.map((record, index) => (
                        <tr
                          key={record.id}
                          className="hover:bg-gray-50 transition-colors"
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium border border-gray-300">
                            {index + 1}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium border border-gray-300">
                            {record.ptkp}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 border border-gray-300">
                            {record.sumberDana}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 border border-gray-300">
                            {record.tanggal}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold border border-gray-300">
                            Rp {formatNumber(record.nominal)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 border border-gray-300">
                            {record.keterangan}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>

              <div className="mt-6 flex justify-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center gap-2"
                  onClick={() => setShowInfo(!showInfo)}
                >
                  <FaQuestionCircle />
                  Info Perhitungan
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-green-600 text-white px-6 py-3 rounded-lg flex items-center gap-2"
                  onClick={() => {
                    setShowResults(false);
                    setShowTable(true);
                  }}
                >
                  <FaEdit />
                  Edit
                </motion.button>
              </div>

              {showInfo && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-4 bg-blue-50 rounded-lg"
                >
                  <h4 className="font-semibold text-blue-900 mb-2">
                    Informasi Perhitungan Pajak:
                  </h4>
                  <ul className="list-disc list-inside text-blue-800 space-y-1">
                    <li>
                      Perhitungan pajak menggunakan tarif progresif sesuai UU
                      PPh
                    </li>
                    <li>
                      PTKP disesuaikan dengan status perkawinan dan tanggungan
                    </li>
                    <li>Penghasilan di bawah PTKP tidak dikenakan pajak</li>
                    <li>Laporan dapat digunakan untuk pelaporan SPT Tahunan</li>
                  </ul>
                </motion.div>
              )}
            </>
          )}

          {showTable && records.length > 0 && !showResults && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-8 w-full overflow-hidden rounded-xl border border-gray-200 shadow-lg"
            >
              <div className="overflow-x-auto">
                <table className="w-full divide-y divide-gray-200">
                  <thead className="bg-gradient-to-r from-blue-600 to-blue-700">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                        PTKP
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                        Sumber Dana
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                        Tanggal
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                        Nominal
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                        Keterangan
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                        Aksi
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {records.map((record, index) => (
                      <motion.tr
                        key={record.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                          {record.ptkp}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          {record.sumberDana}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          {record.tanggal}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold">
                          Rp {formatNumber(record.nominal)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          {record.keterangan}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex space-x-3">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => handleEdit(record)}
                              className="text-blue-600 hover:text-blue-800 transition-colors p-1 rounded-full hover:bg-blue-100"
                            >
                              <FaEdit className="w-4 h-4" />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => handleDelete(record.id)}
                              className="text-red-600 hover:text-red-800 transition-colors p-1 rounded-full hover:bg-red-100"
                            >
                              <FaTrash className="w-4 h-4" />
                            </motion.button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}
          {!showResults && showTable && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-8 bg-gradient-to-r from-blue-500 to-blue-700 rounded-xl p-6 text-white shadow-lg"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <FaCalculator className="text-3xl mr-4" />
                  <h3 className="text-2xl font-bold">
                    Hasil Perhitungan Pajak
                  </h3>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white/10 rounded-lg p-4">
                  <h4 className="text-lg font-semibold mb-2">
                    Total Penghasilan
                  </h4>
                  <p className="text-2xl font-bold">
                    Rp{" "}
                    {formatNumber(
                      records
                        .reduce(
                          (sum, record) =>
                            sum +
                            parseInt(record.nominal.replace(/,/g, ""), 10),
                          0
                        )
                        .toString()
                    )}
                  </p>
                </div>

                <div className="bg-white/10 rounded-lg p-4">
                  <h4 className="text-lg font-semibold mb-2">Tarif Pajak</h4>
                  <p className="text-2xl font-bold">10%</p>
                </div>

                <div className="bg-white/10 rounded-lg p-4">
                  <h4 className="text-lg font-semibold mb-2">Total Pajak</h4>
                  <p className="text-2xl font-bold">
                    Rp{" "}
                    {formatNumber(Math.round(calculateTotalTax()).toString())}
                  </p>
                </div>
              </div>

              <div className="mt-6 bg-white/10 rounded-lg p-4">
                <h4 className="text-lg font-semibold mb-2">
                  Penghasilan Setelah Pajak
                </h4>
                <p className="text-2xl font-bold">
                  Rp{" "}
                  {formatNumber(
                    (
                      records.reduce(
                        (sum, record) =>
                          sum + parseInt(record.nominal.replace(/,/g, ""), 10),
                        0
                      ) - Math.round(calculateTotalTax())
                    ).toString()
                  )}
                </p>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
      <LowerNavBar currentActive="/services/calculator" />
    </div>
  );
}
