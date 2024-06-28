import './Card.css';
import { useContext, useState } from 'react';
import { Tag, Rate } from 'antd';
import { format, parseISO } from 'date-fns';
import { MovieApi } from '../MovieApi/MovieApi';
import { CardType } from '../../types/types';
import { cutDescription, getRatingBorderColor } from '../../helpers/helpers';
import { GenresContext } from '../GenresContext/GenresContext';

const movieApi = new MovieApi();

export function Card({ title, id, date, overview, vote_average, picture, genres }: CardType) {
  const [raiting, setRaiting] = useState<number | string>();

  const genreList = useContext(GenresContext);

  const value: number | undefined | string = localStorage.getItem(id as string) || raiting;

  const setMovieRaiting = (e: number | string) => {
    setRaiting(e);
    movieApi.setRating(id, localStorage.getItem('guest_session_id'), e);
    localStorage.setItem(id as string, e as string);
  };

  return (
    <div className="card" key={id}>
      <div className="picture">
        <img className="poster" src={`https://image.tmdb.org/t/p/w500${picture}`}></img>
      </div>
      <div className="text">
        <div className="textHeader">
          <h3>{title}</h3>
          <span style={{ borderColor: getRatingBorderColor(parseFloat(vote_average.toFixed(1))) }} className="raiting">
            {parseFloat(vote_average.toFixed(1))}
          </span>
        </div>
        <div className="infoWrapper">
          <div className="textContainer">
            <div className="dateAndGenres">
              {date && <div>{format(parseISO(date), 'MMMM d, yyyy')}</div>}
              <div className="tags">
                {genreList?.map((item) => {
                  if (genres.includes(item.id)) {
                    return (
                      <Tag key={item.id} color="#108ee9">
                        {item.name}
                      </Tag>
                    );
                  }
                })}
              </div>
            </div>
            <div> {cutDescription(overview, 200)} </div>
          </div>
          <div className="satrsContainer">
            <Rate
              value={value as number}
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
