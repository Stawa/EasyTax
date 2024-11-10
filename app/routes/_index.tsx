import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import {
  FaBullhorn,
  FaChartLine,
  FaCalculator,
  FaFileAlt,
  FaClock,
  FaArrowRight,
} from "react-icons/fa";
import { motion } from "framer-motion";
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
    icon: <FaCalculator className="h-6 w-6 sm:h-8 sm:w-8" />,
    title: "Kalkulasi Pajak",
    description: "Hitung pajak Anda dengan mudah dan akurat",
  },
  {
    icon: <FaFileAlt className="h-6 w-6 sm:h-8 sm:w-8" />,
    title: "Lapor SPT Online",
    description: "Laporkan SPT secara digital dengan aman",
  },
  {
    icon: <FaChartLine className="h-6 w-6 sm:h-8 sm:w-8" />,
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
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: index * 0.2 }}
    className="bg-white p-4 sm:p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
  >
    <div className="text-blue-600 mb-3 sm:mb-4">{feature.icon}</div>
    <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base 2xl:text-lg">
      {feature.title}
    </h3>
    <p className="text-xs sm:text-sm 2xl:text-base text-gray-600">
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
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="p-4 sm:p-6 hover:bg-gray-50 transition-colors"
  >
    <div className="flex gap-4 sm:gap-6">
      <div className="h-24 w-32 sm:h-32 sm:w-40 flex-shrink-0">
        <img
          src={card.imageUrl}
          alt={card.title}
          className="h-full w-full rounded-lg object-cover shadow-md hover:shadow-lg transition-shadow"
        />
      </div>
      <div className="flex flex-col flex-1 justify-between">
        <div>
          <h3 className="font-semibold text-gray-900 text-base sm:text-lg 2xl:text-xl line-clamp-2 mb-2">
            {card.title}
          </h3>
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-flex items-center rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
              <FaClock className="h-3 w-3 mr-1.5" />
              {card.formatedDate}
            </span>
          </div>
          <motion.a
            href={card.pageUrl}
            target="_blank"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-50 text-sm font-medium text-blue-700 hover:bg-blue-100 transition-colors"
          >
            Pelajari Lebih Lanjut
            <FaArrowRight className="h-3.5 w-3.5 ml-2" />
          </motion.a>
        </div>
      </div>
    </div>
  </motion.div>
);

const NewsSkeletonLoader = ({ index }: { index: number }) => (
  <div key={index} className="p-4 sm:p-6 animate-pulse">
    <div className="flex gap-4 sm:gap-6">
      <div className="h-24 w-32 sm:h-32 sm:w-40 flex-shrink-0 bg-gray-200 rounded-lg"></div>
      <div className="flex-1">
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-3"></div>
        <div className="flex gap-2 mb-3">
          <div className="h-6 w-20 bg-gray-200 rounded-full"></div>
          <div className="h-6 w-32 bg-gray-200 rounded-full"></div>
        </div>
        <div className="h-8 w-36 bg-gray-200 rounded-lg"></div>
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
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="container mx-auto px-4 sm:px-6 lg:px-8 2xl:px-16 py-8 sm:py-16 lg:py-24 2xl:py-32 max-w-full"
        >
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 2xl:gap-16 items-center">
            {/* Left Section */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6 lg:space-y-8 2xl:space-y-12"
            >
              <div className="space-y-4 sm:space-y-6">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl 2xl:text-7xl font-bold text-gray-900">
                  <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                    EASYTAX
                  </span>
                </h1>
                <p className="text-base sm:text-lg lg:text-xl 2xl:text-2xl text-gray-600 leading-relaxed">
                  Kelola perpajakan Anda dengan lebih efisien menggunakan
                  EasyTax. Platform digital terpercaya untuk perhitungan pajak,
                  pelaporan SPT, dan informasi perpajakan terkini.
                </p>
              </div>

              <div className="flex flex-wrap gap-3 sm:gap-4">
                <Link
                  to="/sign-in"
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base 2xl:text-lg rounded-lg shadow-lg hover:shadow-xl transition-all"
                >
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center gap-2"
                  >
                    Mulai Sekarang
                    <FaArrowRight className="h-3 w-3 sm:h-4 sm:w-4" />
                  </motion.div>
                </Link>
                <Link
                  to="/services"
                  className="flex items-center gap-2 bg-white text-blue-600 border-2 border-blue-600 font-medium px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base 2xl:text-lg rounded-lg shadow-lg hover:shadow-xl transition-all"
                >
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center gap-2"
                  >
                    Pelajari Lebih Lanjut
                  </motion.div>
                </Link>
              </div>

              {/* Features Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mt-8 sm:mt-12">
                {features.map((feature, index) => (
                  <FeatureCard key={index} feature={feature} index={index} />
                ))}
              </div>
            </motion.div>

            {/* Right Section */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="lg:pl-8 2xl:pl-16"
            >
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-4 sm:p-6">
                  <div className="flex items-center gap-3">
                    <FaBullhorn
                      size={20}
                      className="text-white sm:h-6 sm:w-6 2xl:h-8 2xl:w-8"
                    />
                    <h2 className="text-xl sm:text-2xl 2xl:text-3xl font-semibold text-white">
                      Berita & Informasi Terkini
                    </h2>
                  </div>
                </div>

                <div className="divide-y divide-gray-100">
                  {isLoading
                    ? [...Array(3)].map((_, index) => (
                        <NewsSkeletonLoader key={index} index={index} />
                      ))
                    : newsCards.map((card, index) => (
                        <NewsCard
                          key={card.intidberita}
                          card={card}
                          index={index}
                        />
                      ))}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
        <LowerNavBar />
      </div>
    </div>
  );
}
