import { useCallback, useState } from 'react';

export default function useToggle(init = false) {
  const [isOn, setIsOn] = useState(init);

  const toggle = useCallback(() => setIsOn((prev) => !prev), []);

  return [isOn, toggle] as const;
}

export { useToggle };
