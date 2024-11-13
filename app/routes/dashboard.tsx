import { json, LoaderFunction } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";
import {
  FaFileAlt,
  FaHistory,
  FaCalendarAlt,
  FaChartBar,
  FaUserCircle,
} from "react-icons/fa";
import { getSession } from "~/auth/cookie.server";
import { firestoreService } from "~/auth/firebase.server";
import type { UserProfile } from "~/types/user";
import { motion } from "framer-motion";

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request);
  const userId = session.get("userId");

  try {
    const userProfile = (await firestoreService.getDocument(
      "users",
      userId
    )) as UserProfile;

    if (!userProfile) {
      throw new Error("User profile not found");
    }

    return json({ userProfile });
  } catch (error) {
    throw new Error("Failed to load user data");
  }
};

export default function Dashboard() {
  const { userProfile } = useLoaderData<{ userProfile: UserProfile }>();

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Modern Header with Accounting Theme */}
      <header className="relative overflow-hidden py-8 sm:py-12 bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="absolute inset-0 bg-grid-white/[0.1] bg-grid"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/[0.3] to-transparent"></div>

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex-shrink-0"
            >
              {userProfile.photoURL ? (
                <img
                  src={userProfile.photoURL}
                  alt={userProfile.fullname}
                  className="h-16 w-16 sm:h-20 sm:w-20 rounded-full object-cover border-4 border-white/60 shadow-xl"
                />
              ) : (
                <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center">
                  <FaUserCircle className="h-10 w-10 sm:h-12 sm:w-12 text-white" />
                </div>
              )}
            </motion.div>

            <div className="flex-grow">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-2 sm:space-y-3"
              >
                <div className="max-w-2xl">
                  <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white drop-shadow-md">
                    Selamat datang,
                  </h1>
                  <p className="text-lg sm:text-xl md:text-2xl text-white font-medium break-words drop-shadow-md">
                    {userProfile.fullname}
                  </p>
                  <p className="text-white/90 text-sm md:text-base drop-shadow-sm">
                    {userProfile.email}
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Stats Overview */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          initial="initial"
          animate="animate"
          variants={fadeIn}
        >
          {[
            {
              icon: <FaFileAlt />,
              title: "Total Dokumen",
              value: userProfile.documents.length,
              link: "/documents",
              color: "blue",
            },
            {
              icon: <FaChartBar />,
              title: "Laporan",
              value: userProfile.reports.length,
              link: "/reports",
              color: "green",
            },
            {
              icon: <FaHistory />,
              title: "Riwayat",
              value: userProfile.history.length,
              link: "/history",
              color: "purple",
            },
            {
              icon: <FaCalendarAlt />,
              title: "Catatan",
              value: userProfile.note ? "Ada" : "Kosong",
              link: "/notes",
              color: "pink",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              whileHover={{ scale: 1.02 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="p-6">
                <div className={`text-${item.color}-500 text-2xl mb-4`}>
                  {item.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">
                  {item.title}
                </h3>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {item.value}
                </p>
                <Link
                  to={item.link}
                  className={`mt-4 inline-block text-${item.color}-600 hover:text-${item.color}-700 font-medium text-sm`}
                >
                  Lihat detail →
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          className="mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg">
            <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Aktivitas Terbaru
              </h3>
            </div>
            <div className="p-6">
              {userProfile.history.length > 0 ? (
                <ul className="space-y-4">
                  {userProfile.history.slice(0, 5).map((activity, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                    >
                      <div className="flex-shrink-0 mr-4">
                        <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                          <FaHistory className="h-5 w-5 text-blue-600 dark:text-blue-300" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-800 dark:text-gray-200">
                          {activity}
                        </p>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              ) : (
                <div className="text-center py-8">
                  <FaHistory className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-4 text-gray-500 dark:text-gray-400">
                    Belum ada aktivitas tercatat
                  </p>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}