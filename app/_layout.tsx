import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { ThemeProvider } from '@/context/ThemeContext';
import { OnboardingProvider } from '@/context/OnboardingContext';


import './global.css';

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

  return (
    <ThemeProvider>
      <OnboardingProvider>
        <InitialLayout />
        <StatusBar style="light" />
      </OnboardingProvider>
    </ThemeProvider>
  );
  
}