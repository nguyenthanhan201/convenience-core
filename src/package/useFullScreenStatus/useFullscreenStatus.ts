import { RefObject, useLayoutEffect, useState } from 'react';

interface ExtendedDocument extends Document {
  mozFullScreenElement: Element | null;
  msFullscreenElement: Element | null;
  webkitFullscreenElement: Element | null;
}

function useFullscreenStatus(elRef: RefObject<HTMLElement>) {
  const [isFullscreen, setIsFullscreen] = useState(() => {
    const documentExtended = document as ExtendedDocument;
    return documentExtended[getBrowserFullscreenElementProp()] != null;
  });

  const setFullscreen = () => {
    if (elRef.current == null) return;

    elRef.current
      .requestFullscreen()
      .then(() => {
        setIsFullscreen(() => {
          const documentExtended = document as ExtendedDocument;
          return documentExtended[getBrowserFullscreenElementProp()] != null;
        });
      })
      .catch(() => {
        setIsFullscreen(false);
      });
  };

  useLayoutEffect(() => {
    const handleFullscreenChange = () =>
      setIsFullscreen(() => {
        const documentExtended = document as ExtendedDocument;
        return documentExtended[getBrowserFullscreenElementProp()] != null;
      });

    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  return [isFullscreen, setFullscreen] as const;
}

function getBrowserFullscreenElementProp() {
  const documentExtended = document as ExtendedDocument;

  if (typeof documentExtended.fullscreenElement !== 'undefined') {
    return 'fullscreenElement';
  } else if (typeof documentExtended.mozFullScreenElement !== 'undefined') {
    return 'mozFullScreenElement';
  } else if (typeof documentExtended.msFullscreenElement !== 'undefined') {
    return 'msFullscreenElement';
  } else if (typeof documentExtended.webkitFullscreenElement !== 'undefined') {
    return 'webkitFullscreenElement';
  } else {
    throw new Error('fullscreenElement is not supported by this browser');
  }
}

export { useFullscreenStatus };
