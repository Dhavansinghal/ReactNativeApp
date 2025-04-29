import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type OnboardingData = {
  phoneNumber: string;
  city: string;
  goldOn: number;
  silverOn: number;
  isComplete: boolean;
};

type OnboardingContextType = {
  onboardingData: OnboardingData;
  updateOnboardingData: (data: Partial<OnboardingData>) => Promise<void>;
  isLoading: boolean;
};

const defaultOnboardingData: OnboardingData = {
  phoneNumber: '',
  city: '',
  goldOn: 0,
  silverOn: 0,
  isComplete: false,
};

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export function OnboardingProvider({ children }: { children: React.ReactNode }) {
  const [onboardingData, setOnboardingData] = useState<OnboardingData>(defaultOnboardingData);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadOnboardingData();
  }, []);

  async function loadOnboardingData() {
    try {
      const data = await AsyncStorage.getItem('onboardingData');
      if (data) {
        setOnboardingData(JSON.parse(data));
      }
    } catch (error) {
      console.error('Error loading onboarding data:', error);
    } finally {
      setIsLoading(false);
    }
  }

  async function updateOnboardingData(newData: Partial<OnboardingData>) {
    try {
      const updatedData = { ...onboardingData, ...newData };
      await AsyncStorage.setItem('onboardingData', JSON.stringify(updatedData));
      setOnboardingData(updatedData);
    } catch (error) {
      console.error('Error saving onboarding data:', error);
    }
  }

  return (
    <OnboardingContext.Provider value={{ onboardingData, updateOnboardingData, isLoading }}>
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
}