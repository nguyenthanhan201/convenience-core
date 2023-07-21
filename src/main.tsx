import React from 'react';
import ReactDOM from 'react-dom/client';

function App() {
  return (
    <>
      <p className='read-the-docs'>Click on the Vite and React logos to learn more</p>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
