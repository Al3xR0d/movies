import './CardList.css';
import { MovieList } from '../../types/types';
import { Card } from '../Card/Card';

export function CardList({ movieList }: { movieList: MovieList[] }) {
  return (
    <div className="cardList">
      {movieList?.map((item) => (
        <div key={item.id}>
          <Card
            title={item.title}
            id={item.id}
            date={item.release_date}
            overview={item.overview}
            vote_average={item.vote_average}
            picture={item.poster_path}
            genres={item.genre_ids}
          />
        </div>
      ))}
    </div>
  );
}
