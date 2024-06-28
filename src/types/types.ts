export interface CardType {
  title: string;
  id: number | string;
  date: string;
  overview: string;
  vote_average: number;
  picture: string;
  genres: number[];
}

export interface Genres {
  id: number;
  name: string;
}

export interface CardListType {
  actualKey: string;
  setLoading: (item: boolean) => void;
  loading: boolean;
}

export type MovieList = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number | string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export interface Footer {
  onChange: (e: number) => void;
  currentPage: number;
  totalPages: number | undefined;
}

export interface GetOptions {
  method: string;
  headers: {
    accept: string;
    Authorization: string;
  };
}
export interface PostOptions {
  method: string;
  headers: Record<string, string>;
  body: string;
}

export interface TabsType {
  onKeyChange: (key: string) => void;
}
