interface NewsResponse {
  message: string;
  total: number;
  data: {
    title: string;
    link: string;
    contentSnippet: string;
    isoDate: string;
    image: {
      small: string;
      large: string;
    };
  }[];
}

export type { NewsResponse };
