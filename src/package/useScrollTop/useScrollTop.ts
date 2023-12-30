import { useEffect } from 'react';

const useScrollTop = () => {
  const { pathname } = window.location;
  // just run the effect on pathname and/or search change
  useEffect(() => {
    setTimeout(() => {
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    }, 0);
  }, [pathname]);

  // renders nothing, since nothing is needed
  return null;
};

export { useScrollTop };
