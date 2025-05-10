import { useEffect } from 'react';
import { router } from 'expo-router';
import { Tabs } from 'expo-router';
import { useTheme } from '@/context/ThemeContext';
import { ArrowUpDown, ChartBar as BarChart3, Clock, Settings } from 'lucide-react-native';

import { useOnboarding } from '@/context/OnboardingContext';


export default function TabLayout() {
  const { theme } = useTheme();
  const { onboardingData, updateOnboardingData, isLoading } = useOnboarding();

  useEffect(() => {
      if (!onboardingData.isComplete) {
        
        router.replace('/onboarding');
      }
    }, [isLoading, onboardingData.isComplete]);

    
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.colors.background,
          borderTopColor: theme.colors.border,
          height: 60,
          paddingBottom: 10,
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.text,
      }}>
      
      {/* <Tabs.Screen
        name="charts"
        options={{
          title: 'Charts',
          tabBarIcon: ({ size, color }) => (
            <BarChart3 size={size} color={color} />
          ),
        }}
      /> */}
      <Tabs.Screen
        name="history"
        options={{
          title: 'History',
          tabBarIcon: ({ size, color }) => (
            <Clock size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: 'Prices',
          tabBarIcon: ({ size, color }) => (
            <ArrowUpDown size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ size, color }) => (
            <Settings size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}