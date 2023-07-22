import { useEffect, useState } from 'react';

export default function useNetWork() {
  const [status, setStatus] = useState(true);

  const handleChange = () => {
    if (typeof navigator !== 'undefined' && 'onLine' in navigator) {
      setStatus(navigator.onLine);
    }
  };

  useEffect(() => {
    window.addEventListener('online', handleChange);
    window.addEventListener('offline', handleChange);
    () => {
      window.removeEventListener('online', handleChange);
      window.removeEventListener('offline', handleChange);
    };
  }, []);
  return status;
}
