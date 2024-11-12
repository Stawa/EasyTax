import { json } from "@remix-run/node";
import type { LoaderFunction } from "@remix-run/node";
import { NewsResponse } from "~/types/news";

interface ErrorResponse {
  error: string;
  reason: string;
}

const fetchNews = async (): Promise<NewsResponse> => {
  const url = new URL(
    "https://berita-indo-api-next.vercel.app/api/cnbc-news/news"
  );
  url.searchParams.append("search", "pajak");

  const headers = {
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36",
    Accept: "*/*",
  };

  try {
    const response = await fetch(url.toString(), { headers });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch news: ${response.status} ${response.statusText}`
      );
    }

    const data: NewsResponse = await response.json();
    return {
      ...data,
      total: Math.min(data.total, 3),
      data: data.data.slice(0, 3),
    };
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
