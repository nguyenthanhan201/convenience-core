import './index.css';

import { Popover, usePopover } from 'my-package';
import { ElementRef, useRef } from 'react';
import ReactDOM from 'react-dom/client';

function App() {
  const h1Ref = useRef<ElementRef<'h1'>>(null);
  const divRef = useRef<ElementRef<'div'>>(null);
  const { onOpen: onOpenPopover1, ...popoverProps1 } = usePopover();

  return (
    <>
      <div ref={h1Ref} className='text-3xl font-bold underline card shadow-modal text-h1'>
        Hello world!
      </div>
      <button onClick={onOpenPopover1}>Open Popover</button>
      <Popover {...popoverProps1} placement='bottom-start' dismissDivs={[divRef.current]}>
        toi la ai
      </Popover>
      <div
        ref={divRef}
        id='oki'
        className='grid place-items-center bg-background-scrim z-modal fixed bottom-0'
      >
        123123123
      </div>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
  <App />,
  // </React.StrictMode>,
);
