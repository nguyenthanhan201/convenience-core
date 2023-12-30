import { createStorage, IStorageProperties } from './createStorage';

function useLocalStorage<T = string>(props: IStorageProperties<T>) {
  return createStorage<T>('localStorage', 'use-local-storage')(props);
}

export { useLocalStorage };
