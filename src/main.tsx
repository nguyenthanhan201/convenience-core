import { useUUID } from 'my-package';
import ReactDOM from 'react-dom/client';

function App() {
  const id = useUUID();
  return <>{id}</>;
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <App />,
);
