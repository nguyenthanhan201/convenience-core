import { useState } from 'react';

import { useClickOutside } from '@/package/useClickOutSide';

export const Demo = () => {
  const [opened, setOpened] = useState(false);
  const ref = useClickOutside(() => setOpened(false));

  return (
    <>
      <button onClick={() => setOpened(true)} type='button'>
        Open dropdown
      </button>

      {opened ? (
        <div ref={ref}>
          <span>Click outside to close</span>
        </div>
      ) : null}
    </>
  );
};
