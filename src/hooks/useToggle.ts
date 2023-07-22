import { useEffect, useState } from 'react';

export default function useToggle(init = false) {
  const [isOn, setIsOn] = useState(init);

  useEffect(() => {
    setIsOn(init);
  }, [init]);

  return [isOn, () => setIsOn((prev) => !prev)] as const;
}
