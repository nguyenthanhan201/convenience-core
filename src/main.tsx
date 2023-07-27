import './index.css';

import { ElementRef, useRef } from 'react';
import ReactDOM from 'react-dom/client';

function App() {
  const h1Ref = useRef<ElementRef<'h1'>>(null);

  return (
    <>
      <div ref={h1Ref} className='text-3xl font-bold underline card shadow-modal text-h1'>
        Hello world!
      </div>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
