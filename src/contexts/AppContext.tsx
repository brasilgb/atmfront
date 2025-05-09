'use client'
import { useSession } from 'next-auth/react';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

// Create context
const AppContext = createContext({} as any);

interface AppProviderProps {
  children: ReactNode;
}
const SESSION_STORAGE_KEY = 'storage_atm';
// Create a provider component
export const AppProvider = ({ children }: AppProviderProps) => {

  const [user, setUser] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [companyNumber, setCompanyNumber] = useState<number>(1);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const { data: sessionFromHook, status } = useSession();
  const [session, setSession] = useState<any | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedSession = sessionStorage.getItem(SESSION_STORAGE_KEY);
      if (storedSession) {
        setSession(JSON.parse(storedSession));
      }
    }
  }, []);

  useEffect(() => {
    if (sessionFromHook) {
      setSession(sessionFromHook);
      if (typeof window !== 'undefined') {
        sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(sessionFromHook));
      }
    } else if (status === 'unauthenticated') {
      setSession(null);
      if (typeof window !== 'undefined') {
        sessionStorage.removeItem(SESSION_STORAGE_KEY);
      }
    }
  }, [sessionFromHook, status]);

  useEffect(() => {
    const getUser = async () => {
      setUser(session?.user)
    };
    getUser()
  }, [session]);

  return (
    <AppContext.Provider value={{
      user,
      status,
      loading,
      setLoading,
      companyNumber,
      setCompanyNumber,
      selectedDate,
      setSelectedDate
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);