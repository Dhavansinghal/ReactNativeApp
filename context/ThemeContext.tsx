import React, { createContext, useContext, useState, useCallback } from 'react';

// import { darkTheme } from '@/context/Colors';
// Define theme types
type ThemeColors = {
  background: string;
  cardBackground: string;
  text: string;
  secondaryText: string;
  border: string;
  primary: string;
  success: string;
  error: string;
  gold: string;
  silver: string;
  goldBackground: string;
  silverBackground: string;
  muted: string,
};

export type Theme = {
  dark: boolean;
  colors: ThemeColors;
  background: string;
  foreground: string;
  primary: string;
  primaryForeground: string;
  accent: string;
  accentForeground: string;
  card: string;
  cardForeground: string;
  border: string;
  inputBackground: string;
  inputText: string;
  muted: string;
  mutedForeground: string;
  destructive: string;
  destructiveForeground: string;
  neutral200: string;
  neutral900: string;
  neutral500: string;
};

// Define theme context type
type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};

const Colors = {
  background: '#333333', // Dark Gray
  foreground: '#EDEDED', // Light Gray
  primary: '#FFD700',    // Gold
  primaryForeground: '#1A1A1A', // Darker text for Gold buttons
  accent: '#008080',      // Teal
  accentForeground: '#FAFAFA', // White/very light text for Teal buttons
  card: '#404040', // Slightly lighter than BG
  cardForeground: '#EDEDED',
  border: '#4D4D4D',
  input: '#474747',
  muted: '#474747',
  mutedForeground: '#A6A6A6',
  destructive: '#B91C1C', // Standard Red (example)
  destructiveForeground: '#FAFAFA',
  // Neutral colors for Silver display if needed
  neutral200: '#E5E5E5', // Example: light gray for silver card bg
  neutral900: '#171717', // Example: dark text for silver card
  neutral500: '#737373', // Example: border for silver card
};

// Create dark theme
const darkTheme: Theme = {
  dark: true,
  colors: {
    background: '#121212',
    cardBackground: '#1E1E1E',
    text: '#FFFFFF',
    secondaryText: '#AAAAAA',
    border: '#333333',
    primary: '#5E72E4',
    success: '#2DCE89',
    error: '#F5365C',
    gold: '#FFC107',
    silver: '#C0C0C0',
    goldBackground: 'rgba(255, 193, 7, 0.12)',
    silverBackground: 'rgba(192, 192, 192, 0.12)',
    muted:'#474747'
  },
  background: Colors.background,
  foreground: Colors.foreground,
  primary: Colors.primary,
  primaryForeground: Colors.primaryForeground,
  accent: Colors.accent,
  accentForeground: Colors.accentForeground,
  card: Colors.card,
  cardForeground: Colors.cardForeground,
  border: Colors.border,
  inputBackground: Colors.input,
  inputText: Colors.foreground,
  muted: Colors.muted,
  mutedForeground: Colors.mutedForeground,
  destructive: Colors.destructive,
  destructiveForeground: Colors.destructiveForeground,
  neutral200: Colors.neutral200,
  neutral900: Colors.neutral900,
  neutral500: Colors.neutral500,
};

// Create theme context
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Theme provider component
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(darkTheme);

  const toggleTheme = useCallback(() => {
    // For now, we're always in dark mode as requested
    setTheme(darkTheme);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Hook to use theme
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};