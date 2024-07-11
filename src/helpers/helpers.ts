import { movieApi } from '../Api/MovieApi/MovieApi';
import { useEffect, useState } from 'react';

export const cutDescription = (text: string, limit: number) => {
  if (text.length <= limit) return text;
  const spaceIndex = text.indexOf(' ', limit);
  text = text.slice(0, spaceIndex);
  return text + ' ...';
};

export const getRatingBorderColor = (rating: number) => {
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

export const createGuestSession = async () => {
  if (!localStorage.getItem('expires_at')) {
    try {
      const res = await movieApi.getSessionId();
      localStorage.setItem('guest_session_id', res.guest_session_id);
      localStorage.setItem('expires_at', res.expires_at);
    } catch (e) {
      console.error(e);
    }
  }
  return;
};

export const useOnlineStatus = () => {
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);

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
  return isOnline;
};
