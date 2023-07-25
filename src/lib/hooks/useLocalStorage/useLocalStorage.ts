import { createStorage, IStorageProperties } from './createStorage';

export default function useLocalStorage<T = string>(props: IStorageProperties<T>) {
  return createStorage<T>('localStorage', 'use-local-storage')(props);
}
