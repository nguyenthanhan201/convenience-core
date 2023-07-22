import { useDeferredValue, useMemo } from 'react';

import { isArray } from './utils';

interface SelectOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export default function useFilterOptions<T extends SelectOption>({
  options,
  searchParam,
  searchFunc,
}: {
  options?: T[];
  searchParam?: string;
  searchFunc?: (item: T, search: string) => boolean;
}) {
  const keyword = useDeferredValue(searchParam ?? '');

  return useMemo(() => {
    if (!isArray(options)) return [];
    if (!keyword) return options;
    if (!searchFunc)
      return options.filter((item) => item.label.toLowerCase().includes(keyword.toLowerCase()));
    return options.filter((item) => searchFunc(item, keyword));
  }, [keyword, options, searchFunc]);
}
