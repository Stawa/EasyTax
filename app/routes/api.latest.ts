import { json } from "@remix-run/node";
import type { LoaderFunction } from "@remix-run/node";
import { NewsResponse } from "~/types/news";

interface ErrorResponse {
  error: string;
}

const NEWS_API_URL = "https://www.cnbcindonesia.com/api/channelbox/search";
const NEWS_TAG = "pajak";
const NEWS_LIMIT = 3;

const fetchNews = async (): Promise<NewsResponse> => {
  const url = new URL(NEWS_API_URL);
  url.searchParams.append("tag", NEWS_TAG);
  url.searchParams.append("limit", NEWS_LIMIT.toString());

  try {
    const response = await fetch(url.toString(), {
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0 (compatible)",
        Accept: "application/json",
      },
      // Add CORS mode to allow requests from any origin
      mode: "cors",
      // Add cache control for better performance
      cache: "no-cache",
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch news: ${response.status} ${response.statusText}`
      );
    }

    const data: NewsResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching news:", error);
    throw error;
  }
};

export const loader: LoaderFunction = async ({ request }) => {
  try {
    // Add CORS headers to allow requests from any origin
    const headers = new Headers({
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET",
      "Access-Control-Allow-Headers": "Content-Type",
    });

    const response = await fetchNews();
    return json<NewsResponse>(response, { headers });
  } catch (error) {
    return json<ErrorResponse>(
      { error: "Failed to fetch news data" },
      {
        status: 500,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  }
};
