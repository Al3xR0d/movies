import './App.css';
import { CardList } from './components/CardList/CardList';
import { TopTabs } from './components/Tabs/Tabs';
import { useEffect, useState } from 'react';
import { MovieApi } from './components/MovieApi/MovieApi';
import { Alert } from 'antd';
import { Genres } from './types/types';
import { GenresContext } from './components/GenresContext/GenresContext';

const movieApi = new MovieApi();

function App() {
  const [actualKey, setActualKey] = useState<string>('1');
  const [loading, setLoading] = useState<boolean>(false);
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
  const [genreList, setGenreList] = useState<Genres[]>([]);

  useEffect(() => {
    movieApi.getGenres().then((item) => {
      setGenreList(item);
    });
  }, []);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    setIsOnline(navigator.onLine);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleKey = (dataKey: string) => {
    setActualKey(dataKey);
  };

  const createGuestSession = async () => {
    if (!localStorage.getItem('expires_at')) {
      try {
        const res = await movieApi.getSessionId();
        localStorage.setItem('guest_session_id', res.guest_session_id);
        localStorage.setItem('expires_at', res.expires_at);
      } catch (e) {
        console.log(e);
      }
    }
    return;
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
              <CardList actualKey={actualKey} setLoading={setLoading} loading={loading} />
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
