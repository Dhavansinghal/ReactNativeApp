import React, { createContext, useContext, useState, useCallback } from 'react';

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
};

type Theme = {
  dark: boolean;
  colors: ThemeColors;
};

// Define theme context type
type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
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
  },
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