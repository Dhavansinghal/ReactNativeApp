import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/context/ThemeContext';

type HeaderProps = {
  title: string;
};

export default function Header({ title }: HeaderProps) {
  const { theme } = useTheme();
  
  return (
    <View style={[styles.header, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.title, { color: theme.colors.text }]}>
        {title}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
  },
});