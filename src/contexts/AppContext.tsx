'use client'
import { useSession } from 'next-auth/react';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

// Create context
const AppContext = createContext({} as any);

interface AppProviderProps {
  children: ReactNode;
}
// Create a provider component
export const AppProvider = ({ children }: AppProviderProps) => {
  const { data: session } = useSession();
  const [user, setUser] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [companyNumber, setCompanyNumber] = useState<number>(0);
  
  useEffect(() => {
    const getUser = async () => {
      setUser(session?.user)
    };
    getUser()
  }, [session]);

  return (
    <AppContext.Provider value={{
      loading,
      setLoading,
      companyNumber,
      setCompanyNumber,
      user
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);