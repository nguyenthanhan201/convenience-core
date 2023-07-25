import { useState } from 'react';

import { useClickOutside } from '../../lib';

export function Demo() {
  const [opened, setOpened] = useState(false);
  const ref = useClickOutside(() => setOpened(false));

  return (
    <>
      <button onClick={() => setOpened(true)}>Open dropdown</button>

      {opened && (
        <div ref={ref}>
          <span>Click outside to close</span>
        </div>
      )}
    </>
  );
}
