import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '@/context/ThemeContext';

type TimeframeSelectorProps = {
  selectedTimeframe: 'day' | 'week' | 'month' | 'year';
  onSelectTimeframe: (timeframe: 'day' | 'week' | 'month' | 'year') => void;
};

export default function TimeframeSelector({
  selectedTimeframe,
  onSelectTimeframe,
}: TimeframeSelectorProps) {
  const { theme } = useTheme();
  
  const timeframes = [
    { label: '1D', value: 'day' },
    { label: '1W', value: 'week' },
    { label: '1M', value: 'month' },
    { label: '1Y', value: 'year' },
  ] as const;
  
  return (
    <View style={styles.container}>
      {timeframes.map((timeframe) => (
        <TouchableOpacity
          key={timeframe.value}
          style={[
            styles.button,
            selectedTimeframe === timeframe.value && {
              backgroundColor: theme.colors.primary,
            },
          ]}
          onPress={() => onSelectTimeframe(timeframe.value)}
        >
          <Text
            style={[
              styles.buttonText,
              {
                color:
                  selectedTimeframe === timeframe.value
                    ? '#FFFFFF'
                    : theme.colors.secondaryText,
              },
            ]}
          >
            {timeframe.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 16,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginHorizontal: 4,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '600',
  },
});