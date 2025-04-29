import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useTheme } from '@/context/ThemeContext';

interface HighLowPriceCardProps {
  label: string;
  value: string;
  highValue: string;
  lowValue: string;
  ltp: string;
  close: string;
  time: string;
  isCurrency?: boolean;
}


export default function HighLowPriceCard({ 
  label, 
  value, 
  highValue, 
  lowValue,
  ltp,
  close,
  time,
  isCurrency = false
}: HighLowPriceCardProps) {

    const { theme } = useTheme();
  return (
    <View style={[
        styles.container, 
        { 
          backgroundColor: theme.colors.cardBackground
        }
      ]}>
      <View style={styles.header}>
        <Text style={styles.label}>{label.toUpperCase()}</Text>
        <Text style={styles.value}>{value}</Text>
      </View>
      
      <View style={styles.highLowContainer}>
        <View style={styles.highLowItem}>
          <Text style={styles.highLowLabel}>HIGH</Text>
          <Text style={styles.highValue}>{highValue}</Text>
        </View>
        
        <View style={styles.highLowItem}>
          <Text style={styles.highLowLabel}>LOW</Text>
          <Text style={styles.lowValue}>{lowValue}</Text>
        </View>
      </View>

      <View style={styles.highLowContainer}>
        <View style={styles.highLowItem}>
          <Text style={styles.highLowLabel}>LTP</Text>
          <Text style={styles.highValue}>{ltp}</Text>
        </View>
        
        <View style={styles.highLowItem}>
          <Text style={styles.highLowLabel}>Close</Text>
          <Text style={styles.lowValue}>{close}</Text>
        </View>
      </View>

      <View style={styles.highLowContainer}>
        <View style={styles.highLowItem}>
          <Text style={styles.highLowLabel}></Text>
          <Text style={styles.highValue}></Text>
        </View>
        
        <View style={styles.highLowItem}>
          <Text style={styles.timeLable}>Time</Text>
          <Text style={styles.timeValue}>{time}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    borderRadius: 12,
    padding: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  label: {
    color: 'white',
    fontSize: 18,
    fontWeight: '500',
  },
  value: {
    color: 'white',
    fontSize: 18,
    fontWeight: '500',
  },
  highLowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  highLowItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  highLowLabel: {
    color: 'white',
    fontSize: 16,
    marginRight: 12,
  },
  highValue: {
    color: '#4CAF50', // Green color
    fontSize: 16,
    fontWeight: 'bold',
  },
  lowValue: {
    color: '#F44336', // Red color
    fontSize: 16,
    fontWeight: 'bold',
  },
  timeLable:{
    color: 'white',
    fontSize: 10,
    marginRight: 12,
  },
  timeValue:{
    color: 'white',
    fontSize: 10,
    marginRight: 12,
  },
});