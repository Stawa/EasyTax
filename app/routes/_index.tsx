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

const NEWS_API_URL = "https://www.cnbcindonesia.com/api/channelbox/search";
const NEWS_TAG = "pajak";
const NEWS_LIMIT = 3;

export async function loader({ request }: LoaderFunctionArgs) {
  try {
    const url = new URL(NEWS_API_URL);
    url.searchParams.append("tag", NEWS_TAG);
    url.searchParams.append("limit", NEWS_LIMIT.toString());

    const response = await fetch(url.toString(), {
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0 (compatible)",
        Accept: "application/json",
      },
      mode: "cors",
      cache: "no-cache",
    });

    if (!response.ok) {
      console.error(
        `Failed to fetch news: ${response.status} ${response.statusText}`
      );
      throw new Error(
        `Failed to fetch news: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    const { data: newsData } = data;

    return { data: newsData };
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
    icon: <FaCalculator className="h-6 w-6 xs:h-7 xs:w-7 sm:h-8 sm:w-8" />,
    title: "Kalkulasi Pajak",
    description: "Hitung pajak Anda dengan mudah dan akurat",
  },
  {
    icon: <FaFileAlt className="h-6 w-6 xs:h-7 xs:w-7 sm:h-8 sm:w-8" />,
    title: "Lapor SPT Online",
    description: "Laporkan SPT secara digital dengan aman",
  },
  {
    icon: <FaChartLine className="h-6 w-6 xs:h-7 xs:w-7 sm:h-8 sm:w-8" />,
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
    className="bg-white p-4 xs:p-5 sm:p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
  >
    <div className="text-blue-600 mb-3 xs:mb-4 sm:mb-4">{feature.icon}</div>
    <h3 className="font-semibold text-gray-900 mb-2 xs:mb-2.5 text-sm xs:text-base sm:text-base 2xl:text-lg">
      {feature.title}
    </h3>
    <p className="text-sm xs:text-base 2xl:text-base text-gray-600">
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
    className="p-4 xs:p-5 sm:p-6 hover:bg-gray-50 transition-colors"
  >
    <div className="flex gap-4 xs:gap-5 sm:gap-6">
      <div className="h-24 w-32 xs:h-28 xs:w-36 sm:h-32 sm:w-40 flex-shrink-0 m-auto">
        <img
          src={card.imageUrl}
          alt={card.title}
          className="h-full w-full rounded-lg object-cover shadow-md hover:shadow-lg transition-shadow"
        />
      </div>
      <div className="flex flex-col flex-1 justify-between">
        <div>
          <h3 className="font-bold text-gray-800 text-base xs:text-lg sm:text-lg 2xl:text-xl line-clamp-2 mb-2.5 xs:mb-3 tracking-tight">
            {card.title}
          </h3>
          <div className="flex items-center gap-2.5 mb-3.5 xs:mb-4">
            <span className="inline-flex items-center rounded-full bg-blue-100 px-4 xs:px-4 py-2 xs:py-2 text-sm xs:text-base font-semibold text-blue-700 ring-1 ring-inset ring-blue-700/20">
              <FaClock className="h-4 w-4 xs:h-4 xs:w-4 mr-2" />
              {card.formatedDate}
            </span>
          </div>
          <motion.a
            href={card.pageUrl}
            target="_blank"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center px-5 xs:px-5 py-2.5 xs:py-2.5 rounded-lg bg-blue-600 text-sm xs:text-base font-semibold text-white hover:bg-blue-700 transition-colors shadow-sm hover:shadow focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 group"
          >
            Pelajari Lebih Lanjut
            <motion.div
              initial={{ x: 0 }}
              whileHover={{ x: 4 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <FaArrowRight className="h-4 w-4 xs:h-4 xs:w-4 ml-2.5 xs:ml-2.5 transition-transform" />
            </motion.div>
          </motion.a>
        </div>
      </div>
    </div>
  </motion.div>
);

const NewsSkeletonLoader = ({ index }: { index: number }) => (
  <div key={index} className="p-4 xs:p-5 sm:p-6 animate-pulse">
    <div className="flex gap-4 xs:gap-5 sm:gap-6">
      <div className="h-24 w-32 xs:h-28 xs:w-36 sm:h-32 sm:w-40 flex-shrink-0 bg-gray-200 rounded-lg"></div>
      <div className="flex-1">
        <div className="h-5 xs:h-6 sm:h-6 bg-gray-200 rounded w-3/4 mb-2 xs:mb-2.5"></div>
        <div className="h-4 xs:h-4.5 sm:h-4 bg-gray-200 rounded w-1/2 mb-2.5 xs:mb-3"></div>
        <div className="flex gap-2.5 mb-2.5 xs:mb-3">
          <div className="h-6 xs:h-7 w-20 xs:w-24 bg-gray-200 rounded-full"></div>
          <div className="h-6 xs:h-7 w-32 xs:w-36 bg-gray-200 rounded-full"></div>
        </div>
        <div className="h-7 xs:h-8 sm:h-8 w-36 xs:w-40 bg-gray-200 rounded-lg"></div>
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
            className="container mx-auto px-4 xs:px-5 sm:px-6 lg:px-8 2xl:px-16 py-8 xs:py-10 sm:py-16 lg:py-24 2xl:py-32 max-w-full"
          >
            <div className="grid lg:grid-cols-2 gap-6 xs:gap-8 lg:gap-12 2xl:gap-16 items-center">
              {/* Left Section */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="space-y-5 xs:space-y-6 lg:space-y-8 2xl:space-y-12"
              >
                <div className="space-y-4 xs:space-y-5 sm:space-y-6">
                  <h1 className="text-3xl xs:text-3xl sm:text-4xl lg:text-5xl 2xl:text-7xl font-bold text-gray-900">
                    <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                      EASYTAX
                    </span>
                  </h1>
                  <p className="text-base xs:text-lg sm:text-lg lg:text-xl 2xl:text-2xl text-gray-600 leading-relaxed">
                    Kelola perpajakan Anda dengan lebih efisien menggunakan
                    EasyTax. Platform digital terpercaya untuk perhitungan
                    pajak, pelaporan SPT, dan informasi perpajakan terkini.
                  </p>
                </div>

                <div className="flex flex-wrap gap-3 xs:gap-4 sm:gap-4">
                  <Link
                    to="/sign-in"
                    className="group flex items-center gap-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 xs:px-5 sm:px-6 py-2.5 xs:py-3 sm:py-3 text-sm xs:text-base sm:text-base 2xl:text-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <motion.div
                      whileHover={{
                        scale: 1.05,
                        transition: { duration: 0.3 },
                      }}
                      className="flex items-center gap-2 xs:gap-2.5"
                    >
                      Mulai Sekarang
                      <FaArrowRight className="h-3.5 w-3.5 xs:h-4 xs:w-4 sm:h-4 sm:w-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                    </motion.div>
                  </Link>
                  <Link
                    to="/services"
                    className="flex items-center gap-2.5 bg-white text-blue-600 border-2 border-blue-600 font-medium px-4 xs:px-5 sm:px-6 py-2.5 xs:py-3 sm:py-3 text-sm xs:text-base sm:text-base 2xl:text-lg rounded-lg shadow-lg hover:shadow-xl transition-all"
                  >
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="flex items-center gap-2 xs:gap-2.5"
                    >
                      Pelajari Lebih Lanjut
                    </motion.div>
                  </Link>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 xs:gap-5 sm:gap-6 mt-8 xs:mt-10 sm:mt-12">
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
                className="lg:pl-8 2xl:pl-16"
              >
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300">
                  <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 p-5 xs:p-6 sm:p-6">
                    <div className="flex items-center gap-4 xs:gap-5">
                      <div className="bg-white/10 rounded-lg p-2.5 backdrop-blur-sm">
                        <FaBullhorn className="h-5 w-5 xs:h-6 xs:w-6 sm:h-6 sm:w-6 2xl:h-8 2xl:w-8 text-white" />
                      </div>
                      <div>
                        <h2 className="text-xl xs:text-2xl sm:text-2xl 2xl:text-3xl font-bold text-white">
                          Berita & Informasi Terkini
                        </h2>
                        <p className="text-sm xs:text-base text-blue-100 mt-1">
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
        </AnimatePresence>
        <LowerNavBar />
      </div>
    </div>
  );
}
