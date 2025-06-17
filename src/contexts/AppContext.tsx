
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { UserInfo, SuperstoreData, AnalyticsData } from '@/types';

interface AppContextType {
  userInfo: UserInfo | null;
  setUserInfo: (info: UserInfo) => void;
  rawData: SuperstoreData[] | null;
  setRawData: (data: SuperstoreData[]) => void;
  analyticsData: AnalyticsData | null;
  setAnalyticsData: (data: AnalyticsData) => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [rawData, setRawData] = useState<SuperstoreData[] | null>(null);
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <AppContext.Provider
      value={{
        userInfo,
        setUserInfo,
        rawData,
        setRawData,
        analyticsData,
        setAnalyticsData,
        currentStep,
        setCurrentStep,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
