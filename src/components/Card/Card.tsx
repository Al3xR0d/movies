import './Card.css';
import { useEffect, useState } from 'react';
import { Tag, Rate } from 'antd';
import { format, parseISO } from 'date-fns';
import { MovieApi } from '../MovieApi/MovieApi';

const movieApi = new MovieApi();

export function Card({ title, id, date, overview, vote_average, picture, genres }: any) {
  const [genreList, setGenreList] = useState<any[]>([]);
  const [raiting, setRaiting] = useState<number>(0);

  useEffect(() => {
    movieApi.getGenres().then((item) => {
      setGenreList(item);
    });
  }, []);

  const cutDescription = (text: string, limit: number) => {
    if (text.length <= limit) return text;
    const spaceIndex = text.indexOf(' ', limit);
    text = text.slice(0, spaceIndex);
    return text + ' ...';
  };

  const getRatingBorderColor = (rating: number) => {
    if (rating >= 0 && rating < 3) {
      return '#E90000';
    } else if (rating >= 3 && rating < 5) {
      return '#E97E00';
    } else if (rating >= 5 && rating < 7) {
      return '#E9D100';
    } else if (rating >= 7) {
      return '#66E900';
    }
  };

  const setMovieRaiting = (e: any) => {
    setRaiting(e);
    movieApi.setRating(id, localStorage.getItem('guest_session_id'), e);
    localStorage.setItem(id, e);
  };

  return (
    <div className="card" key={id}>
      <div className="picture">
        <img className="poster" src={`https://image.tmdb.org/t/p/w500${picture}`}></img>
      </div>
      <div className="text">
        <div className="textHeader">
          <h3>{title}</h3>
          {/* <span className="raiting">{parseFloat(vote_average.toFixed(1))}</span> */}
          <span style={{ borderColor: getRatingBorderColor(parseFloat(vote_average.toFixed(1))) }} className="raiting">
            {parseFloat(vote_average.toFixed(1))}
          </span>
        </div>
        <div className="textContainer">
          {date && <div>{format(parseISO(date), 'MMMM d, yyyy')}</div>}
          {/* <div>{format(parseISO(date), 'MMMM d, yyyy')}</div> */}
          <div className="tags">
            {genreList?.map((item: any) => {
              if (genres.includes(item.id)) {
                // console.log(item.name);
                return (
                  <Tag key={item.id} color="#108ee9">
                    {item.name}
                  </Tag>
                );
              }
            })}
          </div>
          <div> {cutDescription(overview, 200)} </div>
          <div className="satrsContainer">
            <Rate
              value={Number(localStorage.getItem(id)) || raiting}
              className="stars"
              onChange={setMovieRaiting}
              count={10}
              style={{ fontSize: '16px' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
