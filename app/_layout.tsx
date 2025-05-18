import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { ThemeProvider } from '@/context/ThemeContext';
import { OnboardingProvider } from '@/context/OnboardingContext';
import { ensureSession } from '@/services/appwrite';


import './global.css';
import { useEffect, useState } from 'react';

function InitialLayout() {
  
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="onboarding/index" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" />
    </Stack>
  );

  
}

export default function RootLayout() {
  useFrameworkReady();
  
  const [ready, setReady] = useState(false);
  
  useEffect(() => {
    (async () => {
      await ensureSession();
      setReady(true);
    })();
  }, []);

  if (!ready) return null;  

  return (
    <ThemeProvider>
      <OnboardingProvider>
        <InitialLayout />
        <StatusBar style="light" />
      </OnboardingProvider>
    </ThemeProvider>
  );
  
}