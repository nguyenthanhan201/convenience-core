import { useId } from 'react';

export default function useUUID() {
  const id = useId();

  return id;
}

// export const getUUID = () => useId();
