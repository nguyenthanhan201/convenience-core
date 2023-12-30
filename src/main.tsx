import './index.css';

import { Header, useSEO } from 'my-package';
import ReactDOM from 'react-dom/client';

// import Test from './lib/components/Test';

const App = () => {
  console.log(useSEO);
  // set('123123123');
  // console.log(getCookie('test'));
  // console.log(useCookie('test'));
  // const ref = useRef(null);

  // const ref = useClickOutside(() => console.log('oki'), null, undefined);

  return (
    // <Video
    //   options={{
    //     sources: ,
    //   }}
    // />
    <>
      123
      {/* <div ref={ref}>h1</div>
      <Modal /> */}
      <Header />
    </>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  (<App />) as any,
  // </React.StrictMode>,
);
