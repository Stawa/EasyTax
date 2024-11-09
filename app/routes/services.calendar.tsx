import { useState } from "react";
import { motion } from "framer-motion";
import { FaCalendarAlt, FaSave, FaTrash } from "react-icons/fa";
import LowerNavBar from "~/components/LowerNavBar";
import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Kalender Pajak EasyTax - Kelola Jadwal Pajak Anda" },
    {
      name: "description",
      content:
        "Kelola dan pantau jadwal pajak Anda dengan mudah menggunakan Kalender Pajak EasyTax.",
    },
  ];
};

interface Note {
  id: number;
  text: string;
}

export default function Calendar() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [noteText, setNoteText] = useState("");

  const taxDates = [
    {
      date: "2024-12-20",
      description: "Batas Waktu Pembayaran PPh Masa",
    },
    {
      date: "2024-12-24",
      description: "Batas Waktu Pelaporan SPT Tahunan PPh OP",
    },
    {
      date: "2024-12-29",
      description: "Batas Waktu Pelaporan SPT Tahunan PPh Badan",
    },
  ];

  const calculateTimeRemaining = (date: string) => {
    const today = new Date();
    const targetDate = new Date(date);
    const diffTime = targetDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const handleSubmitNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteText.trim()) return;

    const newNote = {
      id: Date.now(),
      text: noteText,
    };
    setNotes([...notes, newNote]);
    setNoteText("");

    // TODO: Save to database
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 2xl:px-16 py-8 sm:py-16 lg:py-24 2xl:py-32 max-w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Kalender <span className="text-blue-600">Pajak</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Pantau jadwal pajak dan buat catatan pribadi Anda
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 2xl:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl shadow-lg p-6 sm:p-8"
          >
            <h2 className="text-xl font-semibold mb-4">Jadwal Pajak</h2>
            <div className="space-y-4">
              {taxDates.map((item, index) => {
                const days = calculateTimeRemaining(item.date);
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-blue-50 rounded-lg p-6"
                  >
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center gap-4">
                        <div className="bg-blue-100 rounded-full p-3">
                          <FaCalendarAlt className="text-blue-600 h-6 w-6" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {item.description}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {new Date(item.date).toLocaleDateString("id-ID", {
                              weekday: "long",
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}{" "}
                            {new Date(item.date).toLocaleTimeString("id-ID", {
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: true,
                            })}
                          </p>
                          <span className="text-sm font-medium text-blue-600">
                            {days} hari tersisa
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl shadow-lg p-6 sm:p-8 h-full flex flex-col"
          >
            <h2 className="text-xl font-semibold mb-4">Catatan Pribadi</h2>
            <form
              onSubmit={handleSubmitNote}
              className="flex-1 flex flex-col"
            >
              <textarea
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                className="flex-1 h-full w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 resize-none"
                placeholder="Tulis catatan Anda di sini..."
              />
              <div className="mt-auto pt-4">
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200 flex items-center justify-center gap-2"
                >
                  <FaSave /> Simpan Catatan
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
      <LowerNavBar currentActive="/services/calendar" />
    </div>
  );
}
