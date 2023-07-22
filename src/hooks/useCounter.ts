/* eslint-disable @typescript-eslint/no-inferrable-types */
import { useState } from 'react';

type UseCounterProps = {
  initialValue?: number;
  min?: number;
  max?: number;
};

function useCounter(props: UseCounterProps) {
  const { initialValue, min, max } = props;
  const _initialValue = initialValue || 0;

  const [count, setCount] = useState(_initialValue);
  const increment = () => {
    if (!max) return setCount((prevState) => prevState + 1);
    setCount((prevState) => Math.min(prevState + 1, max));
  };
  const decrement = () => {
    if (!min) return setCount((prevState) => prevState - 1);
    setCount((prevState) => Math.max(prevState - 1, min));
  };
  const reset = () => setCount(_initialValue);
  const set = (value: number) => setCount(value);
  return { count, increment, decrement, reset, set };
}

export default useCounter;
