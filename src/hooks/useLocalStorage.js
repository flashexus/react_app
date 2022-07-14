import {useEffect , useState} from 'react';

export const useLocalStorage = (key,initialValue) => {
  const [value, setValue] = useState(() => {
    const keyValue = localStorage.getItem(key);
    return keyValue ? JSON.parse(keyValue) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key,JSON.stringify(value))
  }, [key,value] );
  return [value,setValue];
};

export const reloadLocalStorage = (key) => {
  return localStorage.getItem(key);
};

