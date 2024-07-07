import './MoviePage.css';
import { useEffect, useState, useCallback, useRef } from 'react';
import { movieApi } from '../../Api/MovieApi/MovieApi';
import debounce from 'debounce';
import { Input, Spin, Alert } from 'antd';
import { MovieList } from '../../types/types';
import { CardList } from '../CardList/CardList';
import { FooterPagination } from '../FooterPagination/FooterPagination';
import { TabKeys } from '../../types/types';

export interface MoviePageTypes {
  activeTab: string;
  setLoading: (item: boolean) => void;
  loading: boolean;
}

export function MoviePage({ activeTab, setLoading, loading }: MoviePageTypes) {
  const [movieList, setMovieList] = useState<MovieList[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [ratedPage, setRatedPage] = useState<number>(1);
  const [searchText, setSearchText] = useState<string>('');
  const [totalPages, setTotalPages] = useState<number>(1);

  const request = useRef<AbortController | null>(null);

  const getCurrPage = (page: number) => {
    if (activeTab === TabKeys.Rated) {
      setRatedPage(page);
      getRatedMovies(page);
    } else {
      setCurrentPage(page);
    }
  };

  const search = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    setCurrentPage(1);
  }, 1000);

  const abortPreviousRequest = () => {
    if (request.current) {
      request.current.abort();
    }
  };

  const getRatedMovies = useCallback(
    (page: number) => {
      setLoading(true);
      movieApi
        .getRatedMovies(page)
        .then((item) => {
          console.log(item);
          if (!item.results) {
            console.log('тут нет саксесс');
            setMovieList([]);
          } else {
            console.log('попали в элс');
            setMovieList(item.results);
            setTotalPages(item.total_results);
          }
        })
        .catch((error) => {
          console.error(error);
          setMovieList([]);
        })
        .finally(() => setLoading(false));
    },
    [setLoading]
  );

  const getPopularMovies = useCallback(
    (page: number) => {
      setLoading(true);
      movieApi
        .getMovies(page)
        .then((item) => {
          setMovieList(item.results);
          setTotalPages(item.total_results);
        })
        .catch((error) => {
          console.error(error);
          setMovieList([]);
        })
        .finally(() => setLoading(false));
    },
    [setLoading]
  );

  const searchMovies = useCallback(
    (text: string, page: number) => {
      abortPreviousRequest();
      const controller = new AbortController();
      request.current = controller;
      setLoading(true);
      movieApi
        .searchMovies(text, page, controller.signal)
        .then((item) => {
          //  console.log(item);
          setMovieList(item.results);
          setTotalPages(item.total_results);
          // setLoading(false);
        })
        .catch((error) => {
          if (error.name !== 'AbortError') {
            // console.error(error);
            console.error(error);
            setMovieList([]);
            // setLoading(false);
          }
        })
        .finally(() => {
          if (!controller.signal.aborted) {
            setLoading(false);
          }
        });
    },
    [setLoading]
  );

  useEffect(() => {
    if (searchText.trim().length > 0) {
      searchMovies(searchText, currentPage);
    } else {
      getPopularMovies(currentPage);
    }
  }, [searchText, currentPage]);

  useEffect(() => {
    if (activeTab === TabKeys.Rated) {
      getRatedMovies(ratedPage);
    } else {
      getPopularMovies(currentPage);
    }
  }, [activeTab]);

  return (
    <>
      <div className="moviePage">
        <Input placeholder="Type to search..." onChange={search} />
        {loading ? (
          <div className="spin">
            <Spin size="large" />
          </div>
        ) : (
          <>
            {movieList?.length === 0 && !loading ? (
              <Alert
                className="alert"
                message="Informational Notes"
                description="Ничего не найдено :("
                type="info"
                showIcon
              />
            ) : (
              <CardList movieList={movieList} />
            )}
          </>
        )}
      </div>
      <div className="pagination">
        <FooterPagination
          onChange={getCurrPage}
          currentPage={activeTab === TabKeys.Rated ? ratedPage : currentPage}
          totalPages={totalPages}
        />
      </div>
    </>
  );
}
