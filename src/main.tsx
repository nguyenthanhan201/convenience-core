import './index.css';

import { Header, useUUID } from 'my-package';
import { ElementRef, useRef } from 'react';
import ReactDOM from 'react-dom/client';

function App() {
  const h1Ref = useRef<ElementRef<'h1'>>(null);
  const id = useUUID();

  return (
    <>
      {id}{' '}
      <div ref={h1Ref} className='text-3xl font-bold underline card text-subHeading shadow-modal'>
        Hello world!
      </div>
      <Header />
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
