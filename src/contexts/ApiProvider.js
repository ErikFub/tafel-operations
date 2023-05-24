import { createContext, useContext } from 'react';
import TafelApiClient from '../TafelApiClient';

const ApiContext = createContext();

export default function TafelApiProvider({ children }) {
  const api = new TafelApiClient();

  return (
    <ApiContext.Provider value={api}>
      {children}
    </ApiContext.Provider>
  );
}

export function useTafelApi() {
  return useContext(ApiContext);
}