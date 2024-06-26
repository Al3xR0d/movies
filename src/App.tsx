import './App.css';
// import { SearchInput } from './components/Input/Input';
import { CardList } from './components/CardList/CardList';
import { TopTabs } from './components/Tabs/Tabs';
import { useEffect, useState } from 'react';
import { MovieApi } from './components/MovieApi/MovieApi';
import { Alert } from 'antd';

// import { Flex, Spin } from 'antd';

const movieApi = new MovieApi();

function App() {
  const [actualKey, setActualKey] = useState();
  const [loading, setLoading] = useState<boolean>(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

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

  const handleKey = (dataKey: any) => {
    setActualKey(dataKey);
    // console.log(actualKey);
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
    </>
  );
}

export default App;
