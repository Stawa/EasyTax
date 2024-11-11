import { json } from "@remix-run/node";
import type { LoaderFunction } from "@remix-run/node";
import { NewsResponse } from "~/types/news";

interface ErrorResponse {
  error: string;
  reason: string;
}

const fetchNews = async (): Promise<NewsResponse> => {
  const url = new URL("https://146.19.24.59/api/channelbox/search");
  url.searchParams.append("tag", "pajak");
  url.searchParams.append("limit", "3");
  url.searchParams.append("__cpo", "aHR0cHM6Ly93d3cuY25iY2luZG9uZXNpYS5jb20");

  const headers = {
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36",
    Accept:
      "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
    "Accept-Language": "en-US,en;q=0.9,id;q=0.8,ru;q=0.7",
    Cookie:
      "__cpcPopShown=1; __cpc=UzhHa3hFSnZDQ1gxR01MRDlDWVUxWHBjQ3JWclpmQXFZeis5L0x2bHhQWExnV3ZkRm04LzJlRGdWZGhjc3owSWhtWVdxM1gzSjRRcmZNSGRPRzBXRzNIWUdTdjhRZEladkZkampxSGhsVFIrMmg3NXNaQUljTVh0TmUxNnErMVg1QU5MakZZS2FSeGUzZno5WFZxZHpHekxZNmtva3NGdlhSTGVzVEhhWFBBPQ==",
    Connection: "keep-alive",
    "Upgrade-Insecure-Requests": "1",
  };

  try {
    const response = await fetch(url.toString(), { headers });

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
