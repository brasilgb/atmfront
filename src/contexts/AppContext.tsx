'use client'
import React, { createContext, ReactNode, useContext, useState } from 'react';

// Create context
const AppContext = createContext({} as any);

interface AppProviderProps {
    children: ReactNode;
}
// Create a provider component
export const AppProvider = ({ children }: AppProviderProps) => {
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <AppContext.Provider value={{ 
        loading,
        setLoading
     }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);