import { useId } from 'react';

function useUUID() {
  const id = useId();

  return id;
}

export { useUUID };

// export const getUUID = () => useId();
