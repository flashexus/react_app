import { createContext, useContext } from "react";
import { useLocalStorage, reloadLocalStorage} from '../hooks/useLocalStorage';

const CountContext = createContext();

export function useCountContext(){
  return useContext(CountContext)
}

export function CountProvider( {children}){
  const [count,setCount] = useLocalStorage('count', 100);
  const Reload = () =>{ 
    const keyValue = reloadLocalStorage('count');
    setCount(keyValue)
  }
  const value ={
    count,setCount,Reload
  };

  return(
    <CountContext.Provider value={value}>
      {children}
    </CountContext.Provider>
  )
}