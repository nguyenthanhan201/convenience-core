/* eslint-disable no-console */
import { useEffect, useState } from 'react';

type SetValue<T> = (value: T | ((prevValue: T) => T)) => void;

type LocalStorageKey =
  | 'session'
  | 'elynet_cache_register'
  | 'time-send-otp'
  | 'delivery_info'
  | 'location_info';

function useLocalStorage<T>(key: LocalStorageKey, defaultValue: T): [T, SetValue<T>] {
  const [state, setState] = useState<T>(() => {
    const storedValue = localStorage.getItem(key);
    if (storedValue) {
      try {
        return JSON.parse(storedValue);
      } catch (error) {
        console.error(`Error parsing localStorage value for key "${key}":`, error);
      }
    }
    return defaultValue;
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch (error) {
      console.error(`Error saving localStorage value for key "${key}":`, error);
    }
  }, [key, state]);

  return [state, setState];
}

export default useLocalStorage;

// Hook
// function useLocalStorage(key: string, initialValue: any) {
//   // State to store our value
//   // Pass initial state function to useState so logic is only executed once
//   const [storedValue, setStoredValue] = useState(() => {
//     if (typeof window === "undefined") {
//       return initialValue;
//     }
//     try {
//       // Get from local storage by key
//       const item = window.localStorage.getItem(key);
//       // Parse stored json or if none return initialValue
//       // return item ? JSON.parse(item) : initialValue;
//       return item ? item : initialValue;
//     } catch (error) {
//       // If error also return initialValue
//       console.log(error);
//       return initialValue;
//     }
//   });
//   // Return a wrapped version of useState's setter function that ...
//   // ... persists the new value to localStorage.
//   const setValue = (value: any) => {
//     // console.log("👌 ~ value", value);
//     try {
//       // Allow value to be a function so we have same API as useState
//       const valueToStore =
//         value instanceof Function
//           ? value(storedValue)
//           : typeof value === "string"
//           ? value
//           : JSON.stringify(value);
//       // Save state
//       setStoredValue(valueToStore);
//       // Save to local storage
//       if (typeof window !== "undefined") {
//         window.localStorage.setItem(key, valueToStore);
//       }
//     } catch (error) {
//       // A more advanced implementation would handle the error case
//       console.log(error);
//     }
//   };
//   return [storedValue, setValue];
// }
// export default useLocalStorage;
