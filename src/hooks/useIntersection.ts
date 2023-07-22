import { RefObject, useEffect, useState } from 'react';

function useIntersection(
  elementRef: RefObject<Element>,
  options?: IntersectionObserverInit | undefined,
): IntersectionObserverEntry | undefined {
  const { threshold = 0, root = null, rootMargin = '0%' } = options || {};
  // A threshold of 1.0 means that when 100% of the target is visible within the element specified by the root option, the callback is invoked.
  const [entry, setEntry] = useState<IntersectionObserverEntry>();

  const updateEntry = ([e]: IntersectionObserverEntry[]): void => {
    setEntry(e);
  };

  useEffect(() => {
    const node = elementRef?.current;
    const hasIOSupport = !!window.IntersectionObserver;

    if (!hasIOSupport || !node) return;

    const observerParams = { threshold, root, rootMargin };
    const observer = new IntersectionObserver(updateEntry, observerParams);

    observer.observe(node);

    return () => observer.disconnect();
  }, [elementRef]);

  return entry;
}

export default useIntersection;
