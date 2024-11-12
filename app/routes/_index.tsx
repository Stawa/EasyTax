import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import {
  FaBullhorn,
  FaChartLine,
  FaCalculator,
  FaFileAlt,
  FaClock,
  FaArrowRight,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import LowerNavBar from "~/components/LowerNavBar";
import { Link, useLoaderData } from "@remix-run/react";
import { useState, useEffect } from "react";
import { NewsResponse } from "~/types/news";

export async function loader({ request }: LoaderFunctionArgs) {
  try {
    const response = await fetch(`${request.url}api/latest`);
    if (!response.ok) {
      throw new Error("Failed to fetch news data");
    }
    return await response.json();
  } catch (error) {
    console.error("Error in loader:", error);
    return { error: "Failed to fetch news data" };
  }
}

export const meta: MetaFunction = () => {
  return [
    { title: "EasyTax - Solusi Perpajakan Digital" },
    {
      name: "description",
      content:
        "EasyTax adalah platform digital terpercaya untuk mengelola perpajakan, pelaporan SPT, dan informasi keuangan terkini.",
    },
  ];
};

interface Feature {
  icon: JSX.Element;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: <FaCalculator className="h-5 w-5 xs:h-6 xs:w-6 sm:h-7 sm:w-7" />,
    title: "Kalkulasi Pajak",
    description: "Hitung pajak Anda dengan mudah dan akurat",
  },
  {
    icon: <FaFileAlt className="h-5 w-5 xs:h-6 xs:w-6 sm:h-7 sm:w-7" />,
    title: "Lapor SPT Online",
    description: "Laporkan SPT secara digital dengan aman",
  },
  {
    icon: <FaChartLine className="h-5 w-5 xs:h-6 xs:w-6 sm:h-7 sm:w-7" />,
    title: "Analisis Keuangan",
    description: "Pantau dan analisis data perpajakan Anda",
  },
];

const FeatureCard = ({
  feature,
  index,
}: {
  feature: Feature;
  index: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.2 }}
    className="bg-white p-3 xs:p-4 sm:p-5 rounded-xl shadow-md hover:shadow-lg transition-shadow"
  >
    <div className="text-blue-600 mb-2 xs:mb-3 sm:mb-3">{feature.icon}</div>
    <h3 className="font-semibold text-gray-900 mb-1.5 xs:mb-2 text-xs xs:text-sm sm:text-base">
      {feature.title}
    </h3>
    <p className="text-xs xs:text-sm sm:text-base text-gray-600">
      {feature.description}
    </p>
  </motion.div>
);

const NewsCard = ({
  card,
  index,
}: {
  card: NewsResponse["data"][0];
  index: number;
}) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="p-3 xs:p-4 sm:p-5 hover:bg-gray-50 transition-colors"
  >
    <div className="flex gap-3 xs:gap-4 sm:gap-5">
      <div className="h-20 w-28 xs:h-24 xs:w-32 sm:h-28 sm:w-36 flex-shrink-0 m-auto">
        <img
          src={`${card.image.large}`}
          alt={card.title}
          className="h-full w-full rounded-lg object-cover shadow-md hover:shadow-lg transition-shadow"
        />
      </div>
      <div className="flex flex-col flex-1 justify-between">
        <div>
          <h3 className="font-bold text-gray-800 text-sm xs:text-base sm:text-lg line-clamp-2 mb-2 xs:mb-2.5 tracking-tight">
            {card.title}
          </h3>
          <div className="flex items-center gap-2 mb-3 xs:mb-3.5">
            <span className="inline-flex items-center rounded-full bg-blue-100 px-3 xs:px-4 py-1.5 xs:py-2 text-xs xs:text-sm font-semibold text-blue-700 ring-1 ring-inset ring-blue-700/20">
              <FaClock className="h-3 w-3 xs:h-4 xs:w-4 mr-1.5 xs:mr-2" />
              {card.isoDate}
            </span>
          </div>
          <motion.a
            href={card.link}
            target="_blank"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center px-4 xs:px-5 py-2 xs:py-2.5 rounded-lg bg-blue-600 text-xs xs:text-sm font-semibold text-white hover:bg-blue-700 transition-colors shadow-sm hover:shadow focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 group"
          >
            Pelajari Lebih Lanjut
            <motion.div
              initial={{ x: 0 }}
              whileHover={{ x: 4 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <FaArrowRight className="h-3 w-3 xs:h-4 xs:w-4 ml-2 xs:ml-2.5 transition-transform" />
            </motion.div>
          </motion.a>
        </div>
      </div>
    </div>
  </motion.div>
);

const NewsSkeletonLoader = ({ index }: { index: number }) => (
  <div key={index} className="p-3 xs:p-4 sm:p-5 animate-pulse">
    <div className="flex gap-3 xs:gap-4 sm:gap-5">
      <div className="h-20 w-28 xs:h-24 xs:w-32 sm:h-28 sm:w-36 flex-shrink-0 bg-gray-200 rounded-lg"></div>
      <div className="flex-1">
        <div className="h-4 xs:h-5 sm:h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="h-3 xs:h-4 sm:h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
        <div className="flex gap-2 mb-2">
          <div className="h-5 xs:h-6 w-16 xs:w-20 bg-gray-200 rounded-full"></div>
          <div className="h-5 xs:h-6 w-28 xs:w-32 bg-gray-200 rounded-full"></div>
        </div>
        <div className="h-6 xs:h-7 w-32 xs:w-36 bg-gray-200 rounded-lg"></div>
      </div>
    </div>
  </div>
);

export default function Index() {
  const { data } = useLoaderData<typeof loader>();

  const [newsCards, setNewsCards] = useState<NewsResponse["data"]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (data) {
      setNewsCards(data);
      setIsLoading(false);
    }
  }, [data]);

  return (
    <div className="min-h-screen bg-gray-50 overflow-hidden">
      <div className="relative">
        <AnimatePresence>
          <motion.div
            key="content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="container mx-auto px-3 xs:px-4 sm:px-5 lg:px-6 2xl:px-8 py-6 xs:py-8 sm:py-12 lg:py-16 2xl:py-24 max-w-full"
          >
            <div className="grid lg:grid-cols-2 gap-4 xs:gap-6 lg:gap-8 2xl:gap-12 items-center">
              {/* Left Section */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="space-y-4 xs:space-y-5 lg:space-y-6 2xl:space-y-8"
              >
                <div className="space-y-3 xs:space-y-4 sm:space-y-5">
                  <h1 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl 2xl:text-6xl font-bold text-gray-900">
                    <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                      EASYTAX
                    </span>
                  </h1>
                  <p className="text-sm xs:text-base sm:text-lg lg:text-xl 2xl:text-2xl text-gray-600 leading-relaxed">
                    Kelola perpajakan Anda dengan lebih efisien menggunakan
                    EasyTax. Platform digital terpercaya untuk perhitungan
                    pajak, pelaporan SPT, dan informasi perpajakan terkini.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 xs:gap-3 sm:gap-4">
                  <Link
                    to="/sign-in"
                    className="group flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-3 xs:px-4 sm:px-5 py-2 xs:py-2.5 sm:py-3 text-xs xs:text-sm sm:text-base rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <motion.div
                      whileHover={{
                        scale: 1.05,
                        transition: { duration: 0.3 },
                      }}
                      className="flex items-center gap-1.5 xs:gap-2"
                    >
                      Mulai Sekarang
                      <FaArrowRight className="h-3 w-3 xs:h-3.5 xs:w-3.5 sm:h-4 sm:w-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                    </motion.div>
                  </Link>
                  <Link
                    to="/services"
                    className="flex items-center gap-2 bg-white text-blue-600 border-2 border-blue-600 font-medium px-3 xs:px-4 sm:px-5 py-2 xs:py-2.5 sm:py-3 text-xs xs:text-sm sm:text-base rounded-lg shadow-lg hover:shadow-xl transition-all"
                  >
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="flex items-center gap-1.5 xs:gap-2"
                    >
                      Pelajari Lebih Lanjut
                    </motion.div>
                  </Link>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 xs:gap-4 sm:gap-5 mt-6 xs:mt-8 sm:mt-10">
                  {features.map((feature, index) => (
                    <FeatureCard key={index} feature={feature} index={index} />
                  ))}
                </div>
              </motion.div>

              {/* Right Section */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="lg:pl-6 2xl:pl-8"
              >
                <div className="bg-white rounded-xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300">
                  <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 p-4 xs:p-5 sm:p-6">
                    <div className="flex items-center gap-3 xs:gap-4">
                      <div className="bg-white/10 rounded-lg p-2 backdrop-blur-sm">
                        <FaBullhorn className="h-4 w-4 xs:h-5 xs:w-5 sm:h-6 sm:w-6 text-white" />
                      </div>
                      <div>
                        <h2 className="text-lg xs:text-xl sm:text-2xl font-bold text-white">
                          Berita & Informasi Terkini
                        </h2>
                        <p className="text-xs xs:text-sm text-blue-100 mt-0.5 xs:mt-1">
                          Update terbaru seputar perpajakan
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="divide-y divide-gray-100 bg-gradient-to-b from-gray-50 to-white">
                    {isLoading
                      ? [...Array(3)].map((_, index) => (
                          <NewsSkeletonLoader key={index} index={index} />
                        ))
                      : newsCards.map((card, index) => (
                          <NewsCard key={index} card={card} index={index} />
                        ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
        <LowerNavBar />
      </div>
    </div>
  );
}
