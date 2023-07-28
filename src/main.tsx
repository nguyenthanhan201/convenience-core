import './index.css';

import { ElementRef, useRef } from 'react';
import ReactDOM from 'react-dom/client';

import { Popover, usePopover } from './lib/components/Popover';

function App() {
  const h1Ref = useRef<ElementRef<'h1'>>(null);
  const { onOpen: onOpenPopover1, ...popoverProps1 } = usePopover();

  return (
    <>
      <div ref={h1Ref} className='text-3xl font-bold underline card shadow-modal text-h1'>
        Hello world!
      </div>
      <button onClick={onOpenPopover1}>Open Popover</button>
      <Popover {...popoverProps1} placement='bottom-start'>
        toi la ai
      </Popover>
      <div id='oki' className='grid place-items-center bg-background-scrim z-modal fixed bottom-0'>
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
