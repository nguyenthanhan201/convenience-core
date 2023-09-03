import './index.css';

import { useDebounce, useIntersection, useLoading } from 'my-package';
import { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom/client';

function App() {
  const [selected, setSelected] = useState(0);
  const { isLoading, startLoading, stopLoading } = useLoading();

  const [steps] = useState<any[]>(
    Array(4)
      .fill(0)
      .map((item) => ({
        id: item,
        // eslint-disable-next-line react-hooks/rules-of-hooks
        ref: useRef<HTMLDivElement>(null),
      })),
  );

  const listEntries = steps.map((step) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useIntersection(step.ref, {
      threshold: 0.9,
      rootMargin: '-24px 0px -24px 0px',
    });
  });

  const handleScroll = useDebounce(() => {
    stopLoading();
  }, 1000);

  useEffect(() => {
    if (steps[selected].ref?.current) {
      steps[selected].ref?.current?.scrollIntoView({
        block: 'center',
        behavior: 'smooth',
      });
    }
  }, [selected]);

  useEffect(() => {
    if (isLoading) return;
    switch (true) {
      case listEntries[0]?.isIntersecting:
        return setSelected(0);
      case listEntries[1]?.isIntersecting:
        return setSelected(1);
      case listEntries[2]?.isIntersecting:
        return setSelected(2);
      case listEntries[3]?.isIntersecting:
        return setSelected(3);
    }
  }, [listEntries[0], listEntries[1], listEntries[2], listEntries[3]]);

  useEffect(() => {
    addEventListener('scroll', handleScroll);

    return () => {
      removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className='p-4 pt-2'>
      <div className='flex w-3/4 flex-col gap-4'>
        {steps.map((step, index) => (
          <div key={index} ref={step.ref} className='h-[500px] bg-gray-500'>
            {index + 1}
          </div>
        ))}
      </div>
      <div className='sticky top-0 h-fit w-1/4'>
        <h3>Table of contents</h3>
        <ul>
          {Array(4)
            .fill(0)
            .map((_, index) => (
              <li key={index}>
                <button
                  className={selected === index ? 'bg-blue-500 text-white' : 'bg-white text-black'}
                  onClick={() => {
                    startLoading();
                    setSelected(index);
                  }}
                >
                  Go to {index + 1}
                </button>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
  <App />,
  // </React.StrictMode>,
);
