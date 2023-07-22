import { useEffect, useRef } from 'react';

type Callback = () => void;

function useInterval(callback: Callback, delay: number | null) {
  const savedCallback = useRef<Callback>();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay !== null) {
      const intervalId = setInterval(() => {
        if (savedCallback.current) {
          savedCallback.current();
        }
      }, delay);

      return () => {
        clearInterval(intervalId);
      };
    }
  }, [delay]);
}

export default useInterval;
