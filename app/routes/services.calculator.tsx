import { useState } from "react";
import { motion } from "framer-motion";
import type { MetaFunction } from "@remix-run/node";
import {
  FaEdit,
  FaTrash,
  FaCalculator,
  FaSave,
  FaQuestionCircle,
  FaPencilAlt,
  FaCheck,
  FaTimes,
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

interface FormData {
  ptkp: string;
  sumberDana: string;
  tanggal: string;
  keterangan: string;
  nominal: string;
}

interface PTKPOption {
  value: string;
  label: string;
  amount: number;
}

interface SumberDanaOption {
  value: string;
  label: string;
}

const ptkpOptions: PTKPOption[] = [
  { value: "TK/0", label: "TK/0 - Rp 54.000.000/tahun", amount: 54000000 },
  { value: "TK/1", label: "TK/1 - Rp 58.500.000/tahun", amount: 58500000 },
  { value: "TK/2", label: "TK/2 - Rp 63.000.000/tahun", amount: 63000000 },
  { value: "TK/3", label: "TK/3 - Rp 67.500.000/tahun", amount: 67500000 },
  { value: "K/0", label: "K/0 - Rp 58.500.000/tahun", amount: 58500000 },
  { value: "K/1", label: "K/1 - Rp 63.000.000/tahun", amount: 63000000 },
  { value: "K/2", label: "K/2 - Rp 67.500.000/tahun", amount: 67500000 },
  { value: "K/3", label: "K/3 - Rp 72.000.000/tahun", amount: 72000000 },
];

const sumberDanaOptions: SumberDanaOption[] = [
  { value: "all", label: "Semua Sumber Dana" },
  { value: "Gaji / Upah", label: "Gaji / Upah" },
  { value: "Bonus / THR", label: "Bonus / THR" },
];

const initialFormData: FormData = {
  ptkp: "",
  sumberDana: "",
  tanggal: "",
  keterangan: "",
  nominal: "",
};

const formatNumber = (num: string): string => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const calculateDailyTax = (ptkpValue: string, nominal: string): number => {
  const selectedPTKPOption = ptkpOptions.find(
    (option) => option.value === ptkpValue
  );

  if (!selectedPTKPOption) {
    return 0;
  }

  const dailyPTKP = selectedPTKPOption.amount / 360;
  const numericNominal = Number(nominal.replace(/,/g, ""));

  if (numericNominal <= dailyPTKP) {
    return 0;
  }

  const taxableIncome = numericNominal - dailyPTKP;

  let tax = 0;
  if (taxableIncome <= 50000000) {
    tax = taxableIncome * 0.05;
  } else if (taxableIncome <= 250000000) {
    tax = 50000000 * 0.05 + (taxableIncome - 50000000) * 0.15;
  } else if (taxableIncome <= 500000000) {
    tax =
      50000000 * 0.05 + 200000000 * 0.15 + (taxableIncome - 250000000) * 0.25;
  } else {
    tax =
      50000000 * 0.05 +
      200000000 * 0.15 +
      250000000 * 0.25 +
      (taxableIncome - 500000000) * 0.35;
  }

  return tax;
};

export default function Calculator() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [selectedPTKP, setSelectedPTKP] = useState("");
  const [records, setRecords] = useState<TaxRecord[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [savedRecords, setSavedRecords] = useState<TaxRecord[]>([]);
  const [showInfo, setShowInfo] = useState(false);
  const [selectedSumberDana, setSelectedSumberDana] = useState("all");
  const [showPTKPModal, setShowPTKPModal] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === "nominal") {
      const numericValue = value.replace(/\D/g, "");
      const formattedValue = formatNumber(numericValue);
      setFormData((prev) => ({ ...prev, [name]: formattedValue }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validateForm = (): boolean => {
    const { ptkp, sumberDana, tanggal, keterangan, nominal } = formData;
    if (
      (!ptkp && !showTable) ||
      !sumberDana ||
      !tanggal ||
      !keterangan ||
      !nominal
    ) {
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
      setSelectedPTKP(formData.ptkp);
      Notiflix.Notify.success("Data berhasil ditambahkan!");
    }

    setFormData((prev) => ({
      ...prev,
      sumberDana: "",
      tanggal: "",
      keterangan: "",
      nominal: "",
    }));
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
    Notiflix.Confirm.show(
      "Konfirmasi Hapus",
      "Apakah Anda yakin ingin menghapus data ini?",
      "Ya",
      "Tidak",
      () => {
        const updatedRecords = records.filter((record) => record.id !== id);
        setRecords(updatedRecords);
        if (updatedRecords.length === 0) {
          setShowTable(false);
          setFormData(initialFormData);
        }
        Notiflix.Notify.success("Data berhasil dihapus!");
      },
      () => {},
      {
        titleColor: "#DC2626",
        okButtonBackground: "#DC2626",
        cancelButtonBackground: "#6B7280",
      }
    );
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData((prev) => ({
      ...prev,
      sumberDana: "",
      tanggal: "",
      keterangan: "",
      nominal: "",
    }));
  };

  const calculateTotalTax = (): number => {
    return records.reduce((sum, record) => {
      return sum + calculateDailyTax(selectedPTKP, record.nominal);
    }, 0);
  };

  const filteredRecords =
    selectedSumberDana === "all"
      ? records
      : records.filter((record) => record.sumberDana === selectedSumberDana);

  const handlePTKPChange = (newPTKP: string) => {
    setSelectedPTKP(newPTKP);
    setFormData((prev) => ({ ...prev, ptkp: newPTKP }));
    setShowPTKPModal(false);
    Notiflix.Notify.success("PTKP berhasil diubah!");
  };

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
            Kalkulator <span className="text-blue-600">Pajak</span>
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Hitung pajak Anda dengan mudah dan akurat menggunakan kalkulator
            pajak EasyTax
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl shadow-lg p-4 sm:p-6 lg:p-8"
        >
          {!showResults && (
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {!showTable && (
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
                      className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                    >
                      <option value="">Pilih PTKP</option>
                      {ptkpOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

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
                    className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                  >
                    <option value="">Pilih Sumber Dana</option>
                    {sumberDanaOptions.slice(1).map((option) => (
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
                    min={`2000-01-01`}
                    max={`${new Date().getFullYear()}-12-31`}
                    className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
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
                    className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                  />
                </div>

                <div>
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
                    className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                  />
                </div>
              </div>

              <div className="pt-4 flex flex-wrap gap-3 sm:gap-4 justify-end">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  whileHover={{ scale: 1.02 }}
                  type="submit"
                  className="w-full sm:w-fit bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2.5 sm:py-3 px-6 sm:px-8 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2 text-sm sm:text-base"
                >
                  {editingId !== null
                    ? "Perbarui"
                    : records.length > 0
                      ? "Tambahkan"
                      : "Buat Tabel"}
                </motion.button>
                {records.length > 0 && !editingId && (
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    whileHover={{ scale: 1.02 }}
                    type="button"
                    onClick={handleSave}
                    className="w-full sm:w-fit bg-gradient-to-r from-green-600 to-green-700 text-white py-2.5 sm:py-3 px-6 sm:px-8 rounded-xl font-semibold hover:from-green-700 hover:to-green-800 transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2 text-sm sm:text-base"
                  >
                    <FaSave className="w-4 h-4" />
                    Simpan
                  </motion.button>
                )}
                {editingId !== null && (
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    whileHover={{ scale: 1.02 }}
                    type="button"
                    onClick={handleCancel}
                    className="w-full sm:w-fit bg-gradient-to-r from-red-500 to-red-600 text-white py-2.5 sm:py-3 px-6 sm:px-8 rounded-xl font-semibold hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2 text-sm sm:text-base"
                  >
                    <FaTimes className="w-4 h-4" />
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
                className="mt-6 sm:mt-8 space-y-4"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                  <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200 hover:border-blue-400 transition-colors duration-200 w-full sm:w-auto">
                    <span className="font-medium text-gray-700 text-sm sm:text-base">
                      PTKP:{" "}
                      <span className="font-semibold text-blue-600">
                        {selectedPTKP}
                      </span>
                    </span>
                    <button
                      onClick={() => setShowPTKPModal(true)}
                      className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      title="Edit PTKP"
                    >
                      <FaPencilAlt className="w-4 h-4" />
                    </button>
                  </div>
                  <select
                    value={selectedSumberDana}
                    onChange={(e) => setSelectedSumberDana(e.target.value)}
                    className="w-full sm:w-auto px-4 py-2 border border-gray-200 rounded-lg bg-white shadow-sm hover:border-blue-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none transition-colors duration-200 font-medium text-gray-700 text-sm sm:text-base"
                  >
                    {sumberDanaOptions.map((option) => (
                      <option
                        key={option.value}
                        value={option.value}
                        className="py-2 px-4"
                      >
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Mobile View */}
                <div className="block sm:hidden">
                  {filteredRecords.map((record, index) => (
                    <motion.div
                      key={record.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="mb-4 p-4 border rounded-lg bg-white shadow-sm"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-900">
                          {record.tanggal}
                        </span>
                        <div className="flex space-x-2">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleEdit(record)}
                            className="text-blue-600 hover:text-blue-800 transition-colors p-1.5 rounded hover:bg-blue-100"
                            title="Edit"
                          >
                            <FaEdit className="w-4 h-4" />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleDelete(record.id)}
                            className="text-red-600 hover:text-red-800 transition-colors p-1.5 rounded hover:bg-red-100"
                            title="Hapus"
                          >
                            <FaTrash className="w-4 h-4" />
                          </motion.button>
                        </div>
                      </div>
                      <div className="text-xs text-gray-500 mb-2">
                        <div>Keterangan: {record.keterangan}</div>
                        <div>Nominal: Rp {formatNumber(record.nominal)}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Desktop View */}
                <div className="hidden sm:block overflow-x-auto">
                  <table className="min-w-full border border-gray-200 bg-white">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="px-4 lg:px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b border-r border-gray-200">
                          Tanggal
                        </th>
                        <th className="px-4 lg:px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b border-r border-gray-200">
                          Keterangan
                        </th>
                        <th className="px-4 lg:px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b border-r border-gray-200">
                          Nominal
                        </th>
                        <th className="px-4 lg:px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-200">
                          Aksi
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredRecords.map((record, index) => (
                        <motion.tr
                          key={record.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          className="hover:bg-blue-50/50 transition-colors"
                        >
                          <td className="px-4 lg:px-6 py-4 text-sm text-gray-900 border-b border-r border-gray-200">
                            {record.tanggal}
                          </td>
                          <td className="px-4 lg:px-6 py-4 text-sm text-gray-700 border-b border-r border-gray-200">
                            {record.keterangan}
                          </td>
                          <td className="px-4 lg:px-6 py-4 text-sm font-medium text-gray-900 border-b border-r border-gray-200">
                            Rp {formatNumber(record.nominal)}
                          </td>
                          <td className="px-4 lg:px-6 py-4 border-b border-gray-200">
                            <div className="flex space-x-3">
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => handleEdit(record)}
                                className="text-blue-600 hover:text-blue-800 transition-colors p-1.5 rounded hover:bg-blue-100"
                                title="Edit"
                              >
                                <FaEdit className="w-4 h-4" />
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => handleDelete(record.id)}
                                className="text-red-600 hover:text-red-800 transition-colors p-1.5 rounded hover:bg-red-100"
                                title="Hapus"
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

              <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row justify-end gap-3 sm:gap-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full sm:w-auto bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl flex items-center justify-center gap-2 font-medium shadow-sm transition-colors duration-200 text-sm sm:text-base"
                  onClick={() => setShowInfo(!showInfo)}
                >
                  <FaQuestionCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>Info Perhitungan</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl flex items-center justify-center gap-2 font-medium shadow-md hover:from-blue-700 hover:to-blue-800 transition-all duration-200 text-sm sm:text-base"
                  onClick={() => {
                    setShowResults(false);
                    setShowTable(true);
                  }}
                >
                  <FaEdit className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>Edit Data</span>
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

          {/* Front Saved Table */}
          {showTable && records.length > 0 && !showResults && (
            <div className="mt-8 space-y-4">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200 hover:border-blue-400 transition-colors duration-200">
                  <span className="font-medium text-gray-700">
                    PTKP:{" "}
                    <span className="font-semibold text-blue-600">
                      {selectedPTKP}
                    </span>
                  </span>
                  <button
                    onClick={() => setShowPTKPModal(true)}
                    className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    title="Edit PTKP"
                  >
                    <FaPencilAlt className="w-4 h-4" />
                  </button>
                </div>
                <select
                  value={selectedSumberDana}
                  onChange={(e) => setSelectedSumberDana(e.target.value)}
                  className="px-4 py-2 border border-gray-200 rounded-lg bg-white shadow-sm hover:border-blue-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none transition-colors duration-200 font-medium text-gray-700"
                >
                  {sumberDanaOptions.map((option) => (
                    <option
                      key={option.value}
                      value={option.value}
                      className="py-2 px-4"
                    >
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {showPTKPModal && (
                <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4 sm:p-0 overflow-y-auto">
                  <div className="min-h-screen flex items-center justify-center w-full">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="bg-white rounded-xl p-4 sm:p-8 w-full max-w-2xl mx-auto shadow-2xl my-4"
                    >
                      <div className="flex items-center justify-between mb-4 sm:mb-6">
                        <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                          Edit PTKP
                        </h3>
                        <button
                          onClick={() => setShowPTKPModal(false)}
                          className="p-1.5 sm:p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100 transition-colors"
                        >
                          <FaTimes className="w-4 h-4 sm:w-5 sm:h-5" />
                        </button>
                      </div>
                      <div className="space-y-2 mb-4 sm:mb-6 max-h-[60vh] overflow-y-auto">
                        {ptkpOptions.map((option) => (
                          <button
                            key={option.value}
                            onClick={() => handlePTKPChange(option.value)}
                            className={`w-full text-left px-4 sm:px-6 py-3 sm:py-4 rounded-xl transition-colors flex items-center justify-between group ${
                              selectedPTKP === option.value
                                ? "bg-blue-50 text-blue-600"
                                : "hover:bg-blue-50"
                            }`}
                          >
                            <span
                              className={`text-sm sm:text-base font-medium ${
                                selectedPTKP === option.value
                                  ? "text-blue-600"
                                  : "text-gray-800 group-hover:text-blue-600"
                              }`}
                            >
                              {option.label}
                            </span>
                            <motion.span
                              initial={{ opacity: 0 }}
                              animate={{
                                opacity: selectedPTKP === option.value ? 1 : 0,
                              }}
                              className="text-blue-600"
                            >
                              <FaCheck className="w-4 h-4 sm:w-5 sm:h-5" />
                            </motion.span>
                          </button>
                        ))}
                      </div>
                      <button
                        onClick={() => setShowPTKPModal(false)}
                        className="w-full bg-white border-2 border-gray-300 text-gray-700 py-3 sm:py-4 px-6 sm:px-8 rounded-xl text-sm sm:text-base font-semibold hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 shadow-sm flex items-center justify-center gap-2"
                      >
                        <FaTimes className="w-4 h-4" />
                        Batal
                      </button>
                    </motion.div>
                  </div>
                </div>
              )}

              <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-200 bg-white">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="px-4 lg:px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b border-r border-gray-200">
                        Tanggal
                      </th>
                      <th className="px-4 lg:px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b border-r border-gray-200">
                        Keterangan
                      </th>
                      <th className="px-4 lg:px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b border-r border-gray-200">
                        Nominal
                      </th>
                      <th className="px-4 lg:px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-200">
                        Aksi
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredRecords.map((record, index) => (
                      <motion.tr
                        key={record.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="hover:bg-blue-50/50 transition-colors"
                      >
                        <td className="px-4 lg:px-6 py-4 text-sm text-gray-900 border-b border-r border-gray-200">
                          {record.tanggal}
                        </td>
                        <td className="px-4 lg:px-6 py-4 text-sm text-gray-700 border-b border-r border-gray-200">
                          {record.keterangan}
                        </td>
                        <td className="px-4 lg:px-6 py-4 text-sm font-medium text-gray-900 border-b border-r border-gray-200">
                          Rp {formatNumber(record.nominal)}
                        </td>
                        <td className="px-4 lg:px-6 py-4 border-b border-gray-200">
                          <div className="flex space-x-3">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => handleEdit(record)}
                              className="text-blue-600 hover:text-blue-800 transition-colors p-1.5 rounded hover:bg-blue-100"
                              title="Edit"
                            >
                              <FaEdit className="w-4 h-4" />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => handleDelete(record.id)}
                              className="text-red-600 hover:text-red-800 transition-colors p-1.5 rounded hover:bg-red-100"
                              title="Hapus"
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
            </div>
          )}

          {/* Front Results */}
          {!showResults && showTable && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-8 space-y-6 sm:space-y-8"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-blue-50 rounded-lg">
                  <FaCalculator className="text-2xl text-blue-600" />
                </div>
                <h3 className="text-xl sm:text-2xl font-semibold text-gray-900">
                  Ringkasan Perhitungan
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  className="bg-white rounded-lg p-5 border border-gray-200 shadow-sm hover:border-blue-200 transition-colors duration-200"
                >
                  <h4 className="text-sm font-medium text-gray-600 mb-2">
                    Total Penghasilan
                  </h4>
                  <p className="text-2xl font-bold text-gray-900 tracking-tight">
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
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.01 }}
                  className="bg-white rounded-lg p-5 border border-gray-200 shadow-sm hover:border-blue-200 transition-colors duration-200"
                >
                  <h4 className="text-sm font-medium text-gray-600 mb-2">
                    Tarif Pajak
                  </h4>
                  <p className="text-2xl font-bold text-gray-900 tracking-tight">
                    {formatNumber(
                      (
                        (calculateTotalTax() /
                          records.reduce(
                            (sum, record) =>
                              sum +
                              parseInt(record.nominal.replace(/,/g, ""), 10),
                            0
                          )) *
                        100
                      ).toFixed(2)
                    )}
                    %
                  </p>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.01 }}
                  className="bg-white rounded-lg p-5 border border-gray-200 shadow-sm hover:border-blue-200 transition-colors duration-200"
                >
                  <h4 className="text-sm font-medium text-gray-600 mb-2">
                    Total Pajak
                  </h4>
                  <p className="text-2xl font-bold text-gray-900 tracking-tight">
                    Rp{" "}
                    {formatNumber(Math.round(calculateTotalTax()).toString())}
                  </p>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.01 }}
                  className="bg-white rounded-lg p-5 border border-gray-200 shadow-sm hover:border-blue-200 transition-colors duration-200"
                >
                  <h4 className="text-sm font-medium text-gray-600 mb-2">
                    Penghasilan Bersih
                  </h4>
                  <p className="text-2xl font-bold text-gray-900 tracking-tight">
                    Rp{" "}
                    {formatNumber(
                      (
                        records.reduce(
                          (sum, record) =>
                            sum +
                            parseInt(record.nominal.replace(/,/g, ""), 10),
                          0
                        ) - Math.round(calculateTotalTax())
                      ).toString()
                    )}
                  </p>
                </motion.div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
      <LowerNavBar currentActive="/services/calculator" />
    </div>
  );
}
