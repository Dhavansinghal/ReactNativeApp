import { useEffect } from 'react';
import { router } from 'expo-router';
import { Tabs } from 'expo-router';
import { useTheme } from '@/context/ThemeContext';
import { ArrowUpDown, Clock, Settings } from 'lucide-react-native';
import { View,  StyleSheet } from 'react-native';
import { useOnboarding } from '@/context/OnboardingContext';


export default function TabLayout() {
  const { theme } = useTheme();
  

  const styles = StyleSheet.create({
    tabBar: {
      backgroundColor: theme.background,
      borderTopColor: theme.border,
      height: 60, 
      paddingBottom: 5, 
      paddingTop: 5,
    },
    tabLabel: {
      fontSize: 10,
      fontWeight: '500',
    },
    bhavButtonContainer: {
      position: 'relative',
      top: -20, 
      alignItems: 'center',
      justifyContent: 'center',
    },
    bhavButton: {
      width: 64,
      height: 64,
      borderRadius: 32,
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    bhavLabel: {
      fontSize: 10,
      fontWeight: '500',
      position: 'absolute',
      bottom: -15,
    },
  });

  const { onboardingData, isLoading } = useOnboarding();
  
  useEffect(() => {
    if (!isLoading && !onboardingData.isComplete) {
      const timeout = setTimeout(() => {
        router.replace('/onboarding');
      }, 0);
  
      return () => clearTimeout(timeout);
    }
  }, [isLoading, onboardingData.isComplete]);  
    
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: theme.mutedForeground,
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabLabel,
      }}>
    
      <Tabs.Screen
        name="history"
        options={{
          title: 'History',
          tabBarIcon: ({ size, color }) => (
            <Clock size={size} color={color} />
          )
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: '',
          tabBarIcon: ({ focused }) => (
            <View style={styles.bhavButtonContainer}>
              <View style={[styles.bhavButton, { backgroundColor: focused ? theme.primary : theme.accent }]}>
                <ArrowUpDown color={focused ? theme.primaryForeground : theme.accentForeground} size={30} />
              </View>
            </View>
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