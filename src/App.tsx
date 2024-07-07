import './App.css';
import { MoviePage } from './components/MoviePage/MoviePage';
import { TopTabs } from './components/Tabs/Tabs';
import { useEffect, useState } from 'react';
import { movieApi } from './Api/MovieApi/MovieApi';
import { Alert } from 'antd';
import { Genres } from './types/types';
import { GenresContext } from './components/GenresContext/GenresContext';
import { createGuestSession, useOnlineStatus } from './helpers/helpers';

function App() {
  const [activeTab, setActualKey] = useState<string>('1');
  const [loading, setLoading] = useState<boolean>(false);
  const [genreList, setGenreList] = useState<Genres[]>([]);
  const isOnline = useOnlineStatus();

  useEffect(() => {
    movieApi.getGenres().then((item) => {
      setGenreList(item);
    });
  }, []);

  const handleKey = (dataKey: string) => {
    setActualKey(dataKey);
  };

  useEffect(() => {
    createGuestSession();
  }, []);

  return (
    <>
      <GenresContext.Provider value={genreList}>
        {isOnline ? (
          <div className="app">
            <div className="cards">
              <TopTabs onKeyChange={handleKey} />
              <MoviePage activeTab={activeTab} setLoading={setLoading} loading={loading} />
            </div>
          </div>
        ) : (
          <Alert message="Error" description="Отсутствует подключение к интернету :(" type="error" showIcon />
        )}
      </GenresContext.Provider>
    </>
  );
}

export default App;
