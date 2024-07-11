import './MoviePage.css';
import { useEffect, useState, useCallback } from 'react';
import { movieApi } from '../../Api/MovieApi/MovieApi';
import debounce from 'debounce';
import { Input, Spin, Alert } from 'antd';
import { MovieList } from '../../types/types';
import { CardList } from '../CardList/CardList';
import { FooterPagination } from '../FooterPagination/FooterPagination';
import { TabKeys } from '../../types/types';

interface Props {
  activeTab: string;
  setLoading: (item: boolean) => void;
  loading: boolean;
}

export const MoviePage = ({ activeTab, setLoading, loading }: Props) => {
  const [movieList, setMovieList] = useState<MovieList[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [ratedPage, setRatedPage] = useState<number>(1);
  const [searchText, setSearchText] = useState<string>('');
  const [totalPages, setTotalPages] = useState<number>(1);

  const search = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    setCurrentPage(1);
  }, 1000);

  const getRatedMovies = useCallback(
    (page: number) => {
      setLoading(true);
      movieApi
        .getRatedMovies(page)
        .then((item) => {
          if (!item.results) {
            setMovieList([]);
          } else {
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

  const getCurrPage = useCallback(
    (page: number) => {
      if (activeTab === TabKeys.Rated) {
        setRatedPage(page);
        getRatedMovies(page);
      } else {
        setCurrentPage(page);
      }
    },
    [activeTab, getRatedMovies]
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

  useEffect(() => {
    if (searchText.trim().length > 0) {
      setLoading(true);
      movieApi
        .searchMovies(searchText, currentPage)
        .then((item) => {
          setMovieList(item.results);
        })
        .catch((error) => {
          console.error(error);
          setMovieList([]);
        })
        .finally(() => setLoading(false));
    } else {
      getPopularMovies(currentPage);
    }
  }, [searchText, currentPage, setLoading, getPopularMovies]);

  useEffect(() => {
    if (activeTab === TabKeys.Rated) {
      getRatedMovies(ratedPage);
    } else {
      getPopularMovies(currentPage);
    }
  }, [activeTab, ratedPage, currentPage, getRatedMovies, getPopularMovies]);

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
};
