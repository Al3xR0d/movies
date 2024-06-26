import './CardList.css';
import { useEffect, useState } from 'react';
import { Card } from '../Card/Card';
import { MovieApi } from '../MovieApi/MovieApi';
import { FooterPagination } from '../FooterPagination/FooterPagination';
import debounce from 'debounce';
import { Input, Spin } from 'antd';
import { Alert } from 'antd';

const movieApi = new MovieApi();

export function CardList({ actualKey, setLoading, loading }: any) {
  const [movieList, setMovieList] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [ratedPage, setRatedPage] = useState<number>(1);
  const [text, setText] = useState<string>('');
  const [totalPages, setTotalPages] = useState();

  const getCurrPage = (e: any) => {
    if (actualKey == 2) {
      setRatedPage(e);
      getRatedMovies(e);
      return;
    }

    if (text.length > 0) {
      setCurrentPage(e);
      movieApi.searchMovies(text, e).then((item) => {
        setMovieList(item.results);
        setTotalPages(item.total_results);
      });
      return;
    }

    setCurrentPage(e);
    getPopularMovies(e);
  };

  const search = (e: any) => {
    if (e.target.value.trim().length == 0) {
      getPopularMovies(currentPage);
      return;
    }
    setCurrentPage(1);
    setLoading(true);
    movieApi
      .searchMovies(e.target.value, currentPage)
      .then((item) => {
        setMovieList(item.results);
        setTotalPages(item.total_results);
      })
      .then(() => setLoading(false));
    setText(e.target.value);
  };

  const getRatedMovies = (ratedPage: number) => {
    setLoading(true);
    movieApi
      .getRatedMovies(localStorage.getItem('guest_session_id'), ratedPage)
      .then((item) => {
        setMovieList(item.results);
        setTotalPages(item.total_results);
      })
      .then(() => setLoading(false));
  };

  const getPopularMovies = (pageNum: number) => {
    setLoading(true);
    movieApi
      .getMovies(pageNum)
      .then((item) => {
        setMovieList(item.results);
        setTotalPages(item.total_results);
      })
      .then(() => setLoading(false));
  };

  useEffect(() => {
    if (text.trim().length === 0) {
      getPopularMovies(currentPage);
    }
  }, [text, currentPage]);

  useEffect(() => {
    if (actualKey == 2) {
      getRatedMovies(ratedPage);
    } else {
      getPopularMovies(currentPage);
    }
  }, [actualKey]);

  return (
    <div className="cardList">
      <Input placeholder="Type to search..." onChange={debounce(search, 1000)} />
      {loading ? (
        <div
          style={{
            width: '100%',
            // border: '1px solid red',
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Spin size="large" />
        </div>
      ) : (
        <>
          {movieList.length === 0 ? (
            <Alert message="Informational Notes" description="Ничего не найдено :(" type="info" showIcon />
          ) : (
            <>
              {movieList.map((item) => {
                return (
                  <Card
                    title={item.title}
                    id={item.id}
                    date={item.release_date}
                    overview={item.overview}
                    vote_average={item.vote_average}
                    picture={item.poster_path}
                    genres={item.genre_ids}
                  />
                );
              })}{' '}
              <FooterPagination
                onChange={getCurrPage}
                currentPage={actualKey == 2 ? ratedPage : currentPage}
                totalPages={totalPages}
              />
            </>
          )}
        </>
      )}
    </div>
  );
}
