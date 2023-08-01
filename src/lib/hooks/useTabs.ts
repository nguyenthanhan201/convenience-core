import { useState } from 'react';

export type TabPanelProps<T> = {
  tabId: string;
  content: T;
};

type UseTabsResult<T> = {
  currentItem: TabPanelProps<T>;
  handleOnSelect: (tabId: string) => void;
  // setCurrentItem: Dispatch<SetStateAction<TabPanelProps<T>>>;
};

type UseTabsProps<T> = {
  initialTab: number;
  allTabs: TabPanelProps<T>[];
};

export default function useTabs<T>({ initialTab, allTabs }: UseTabsProps<T>): UseTabsResult<T> {
  const [currentItem, setCurrentItem] = useState<TabPanelProps<T>>(allTabs[initialTab]);

  function handleOnSelect(tabId: string) {
    const index = allTabs.findIndex((tab) => tab.tabId === tabId);
    setCurrentItem(allTabs[index]);
  }

  return {
    currentItem,
    handleOnSelect,
    // setCurrentItem,
  };
}
