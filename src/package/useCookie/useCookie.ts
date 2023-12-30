import Cookies from 'js-cookie';
import { CookieAttributes } from 'node_modules/@types/js-cookie';

export enum CookiesKeys {
  'eLynet_user_info' = 'eLynet_user_info',
  'eLynet_seller_info' = 'eLynet_seller_info',
}

const getCookie = (name: string) => {
  return JSON.parse(Cookies.get(name) || '{}');
};
const setCookie = <T>(name: string, value: T, options?: CookieAttributes) => {
  return Cookies.set(name, JSON.stringify(value), options);
};
const removeCookie = (name: string) => {
  return Cookies.remove(name);
};
function getCookieExpirationTime(cookieName: string) {
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(`${cookieName}=`)) {
      const cookieParts = cookie.split('=');
      // const cookieValue = decodeURIComponent(cookieParts[1]);
      const cookieOptions = cookieParts[2] ? cookieParts[2].split(';') : [];
      for (let j = 0; j < cookieOptions.length; j++) {
        const option = cookieOptions[j].trim();
        if (option.startsWith('expires=')) {
          const expiresValue = option.substring('expires='.length);
          return new Date(expiresValue).toUTCString();
        }
      }
    }
  }
  return null; // Cookie not found or expiration time not set
}

function useCookie(key: string) {
  return {
    get: () => getCookie(key),
    set: (value: string, options?: CookieAttributes) => setCookie(key, value, options),
    remove: () => removeCookie(key),
    getExpirationTime: () => getCookieExpirationTime(key),
  };
}

export { getCookie, getCookieExpirationTime, removeCookie, setCookie, useCookie };
