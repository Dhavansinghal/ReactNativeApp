import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { useOnboarding } from '@/context/OnboardingContext';

export default function Index() {
  const { onboardingData, isLoading } = useOnboarding();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!onboardingData.isComplete) {
        router.replace('/onboarding');
      } else {
        router.replace('/(tabs)'); 
      }
    }
  }, [isLoading, onboardingData]);

  return null; 
}
