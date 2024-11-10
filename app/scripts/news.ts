interface NewsResponse {
  dataname: string;
  status: string;
  message: string;
  source: string;
  total: number;
  data: {
    pageUrl: string;
    intidberita: number;
    imageUrl: string;
    formatedDate: string;
    date: string;
    title: string;
  }[];
}

const NEWS_API_URL = "https://www.cnbcindonesia.com/api/channelbox/search";
const NEWS_TAG = "pajak";
const NEWS_LIMIT = 3;

const fetchNews = async (): Promise<NewsResponse> => {
  const url = new URL(NEWS_API_URL);
  url.searchParams.append("tag", NEWS_TAG);
  url.searchParams.append("limit", NEWS_LIMIT.toString());

  try {
    const response = await fetch(
      `https://cors-anywhere.herokuapp.com/${url.toString()}`
    );

    if (!response.ok) {
      throw new Error(
        `Failed to fetch news: ${response.status} ${response.statusText}`
      );
    }

    const data: NewsResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching news:", error);
    throw new Error("Failed to fetch news data");
  }
};

export { fetchNews, type NewsResponse };
