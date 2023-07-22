import { useMemo } from 'react';

import useUncontrolled from './useUncontrolled';
import { range } from './utils';

const DOTS = 'dots';

interface PaginationParams {
  /** Page selected on initial render, defaults to 1 */
  initialPage?: number;

  /** Controlled active page number */
  page?: number;

  /** Total amount of pages */
  total: number;

  /** Siblings amount on left/right side of selected page, defaults to 1 */
  siblings?: number;

  /** Amount of elements visible on left/right edges, defaults to 1  */
  boundaries?: number;

  /** Callback fired after change of each page */
  onChange?: (page: number) => void;
}

const usePagination = ({
  total,
  siblings = 1,
  boundaries = 1,
  page,
  initialPage = 1,
  onChange,
}: PaginationParams) => {
  const _total = Math.max(Math.trunc(total), 0);
  const [activePage, setActivePage] = useUncontrolled({
    value: page,
    onChange,
    defaultValue: initialPage,
    finalValue: initialPage,
  });

  const setPage = (pageNumber: number) => {
    if (pageNumber <= 0) {
      setActivePage(1);
    } else if (pageNumber > _total) {
      setActivePage(_total);
    } else {
      setActivePage(pageNumber);
    }
  };

  const next = () => setPage(activePage + 1);
  const previous = () => setPage(activePage - 1);
  const first = () => setPage(1);
  const last = () => setPage(_total);

  const paginationRange = useMemo((): (number | 'dots')[] => {
    const totalPageNumbers = siblings * 2 + 3 + boundaries * 2;
    if (totalPageNumbers >= _total) {
      return range(1, _total);
    }

    const leftSiblingIndex = Math.max(activePage - siblings, boundaries);
    const rightSiblingIndex = Math.min(activePage + siblings, _total - boundaries);

    const shouldShowLeftDots = leftSiblingIndex > boundaries + 2;
    const shouldShowRightDots = rightSiblingIndex < _total - (boundaries + 1);

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = siblings * 2 + boundaries + 2;
      return [...range(1, leftItemCount), DOTS, ...range(_total - (boundaries - 1), _total)];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = boundaries + 1 + 2 * siblings;
      return [...range(1, boundaries), DOTS, ...range(_total - rightItemCount, _total)];
    }

    return [
      ...range(1, boundaries),
      DOTS,
      ...range(leftSiblingIndex, rightSiblingIndex),
      DOTS,
      ...range(_total - boundaries + 1, _total),
    ];
  }, [_total, siblings, activePage]);

  return {
    range: paginationRange,
    active: activePage,
    setPage,
    next,
    previous,
    first,
    last,
  };
};

export default usePagination;

// import { useMemo, useState } from 'react';

// type PaginationProps = {
//   volume?: number;
//   data: any[];

//   /** Amount of elements visible on left/right edges, defaults to 1  */
//   boundaries?: number;

//   /** Siblings amount on left/right side of selected page, defaults to 1 */
//   siblings?: number;
// };

// const usePagination = (props: PaginationProps) => {
//   const { volume = 10, boundaries = 1, siblings = 1, data } = props;
//   /** All pages in total. */
//   const total = useMemo(() => Math.floor(data.length / volume), [volume, data.length]);
//   const [page, setPage] = useState(5);

//   const next = () => {
//     if (page < total) {
//       setPage((prev) => prev + 1);
//     }
//   };

//   const previous = () => {
//     if (page > 1) {
//       setPage((prev) => prev - 1);
//     }
//   };

//   const range = useMemo(() => {
//     const _range = [];
//     for (let i = 1; i <= total; i++) {
//       if (
//         i <= boundaries ||
//         i > total - boundaries ||
//         (i >= page - siblings && i <= page + siblings)
//       ) {
//         _range.push(i);
//       } else if (i === page - siblings - 1 || i === page + siblings + 1) {
//         _range.push('dots');
//       }
//     }
//     return _range;
//   }, [boundaries, page, siblings, total]);

//   /** Data representing one single page. */
//   const slicedData = useMemo(
//     () => data.slice((page - 1) * volume, (page - 1) * volume + volume),
//     [volume, page, data],
//   );

//   return { data: slicedData, page, total, setPage, next, previous, range };
// };

// export default usePagination;
