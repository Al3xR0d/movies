export interface GetOptions {
  method: string;
  headers: {
    accept: string;
    Authorization: string;
  };
  signal?: AbortSignal | null;
}

export interface PostOptions {
  method: string;
  headers: Record<string, string>;
  body: string;
  signal?: AbortSignal | null;
}

export class MovieApi {
  url: string;
  key: string;
  sessionValue: string | null;
  controller: AbortController | null;
  getOptions: GetOptions;

  constructor() {
    this.url = 'https://api.themoviedb.org/3/';
    this.key = 'ec744888e3da6264e226b7c06599deae';
    this.sessionValue = localStorage.getItem('guest_session_id');
    this.controller = null;
    this.getOptions = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYzc0NDg4OGUzZGE2MjY0ZTIyNmI3YzA2NTk5ZGVhZSIsInN1YiI6IjY2NzQ3Nzk5YWI3MTkyMDFiNzRlYjkzMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.iiXFJ015hzFI3p_3JDfF1rSLB-mFcXh2puyGSNwm_H4',
      },
      signal: null,
    };
  }

  abortPreviousRequest = () => {
    if (this.controller) {
      this.controller.abort();
    }
    this.controller = new AbortController();
  };

  async getMovies(currNum: number) {
    const movies = this.url + `movie/popular?language=en-US&page=${currNum}`;
    const moviesResult = await this.getResults(movies, this.getOptions);
    return moviesResult;
  }

  async getGenres() {
    const genres = this.url + `genre/movie/list?api_key=${this.key}&language=en`;
    const genresResult = await this.getResults(genres, this.getOptions);
    return genresResult.genres;
  }

  async getSessionId() {
    const session = this.url + 'authentication/guest_session/new';
    const sessionResult = await this.getResults(session, this.getOptions);
    return sessionResult;
  }

  async setRating(id: number | string, rate: number | string) {
    const urlRating = this.url + `movie/${id}/rating?api_key=${this.key}&guest_session_id=${this.sessionValue}`;
    const body = {
      value: rate,
    };
    const options: PostOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
      body: JSON.stringify(body),
    };
    const result = await this.getResults(urlRating, options);
    return result.success;
  }

  async getRatedMovies(pageNumber: number) {
    const urlRatedMovies =
      this.url + `guest_session/${this.sessionValue}/rated/movies?api_key=${this.key}&page=${pageNumber}`;
    try {
      const result = await this.getResults(urlRatedMovies, this.getOptions);
      return result;
    } catch (err: any) {
      if (err.response && err.response.status === 404) {
        return { results: [], total_results: 0 };
      } else {
        throw err;
      }
    }
  }

  async searchMovies(movie: string, currNum: number) {
    this.abortPreviousRequest();
    this.controller = new AbortController();
    const searchUrl = this.url + `search/movie?api_key=${this.key}&query=${encodeURIComponent(movie)}&page=${currNum}`;
    const newoptions = { ...this.getOptions, signal: this.controller.signal };
    const result = await this.getResults(searchUrl, newoptions);
    return result;
  }

  async getResults(url: string, options: GetOptions | PostOptions) {
    try {
      const response = await fetch(url, options);
      return await response.json();
    } catch (err) {
      console.error('Возникла проблема с fetch запросом:', err);
    }
  }
}

export const movieApi = new MovieApi();
