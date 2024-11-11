import { json } from "@remix-run/node";
import type { LoaderFunction } from "@remix-run/node";
import { NewsResponse } from "~/types/news";

export const config = { runtime: "edge" };

interface ErrorResponse {
  error: string;
  reason: string;
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
        "User-Agent": "Mozilla/5.0 (compatible; MyApp/1.0; +http://myapp.com)",
        Accept: "application/json",
      },
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
    const response = await fetchNews();
    return json<NewsResponse>(response);
  } catch (error) {
    console.error("Loader error:", error);
    return json<ErrorResponse>(
      {
        error: "Failed to fetch news data",
        reason:
          error instanceof Error ? error.message : "Unknown error occurred",
      },
      { status: 500 }
    );
  }
};
