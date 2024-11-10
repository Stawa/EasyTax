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

export type { NewsResponse };
