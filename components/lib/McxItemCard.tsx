
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import type { MetalData } from '@/types/metals';
import { CheckCircle2, Circle } from 'lucide-react-native';
import type { Theme } from '@/context/ThemeContext';

type McxItemCardProps = {
  item: MetalData;
  isSelected: boolean;
  onSelect: (item: MetalData) => void;
  theme: Theme;
};

export function McxItemCard({ item, isSelected, onSelect, theme }: McxItemCardProps) {
  const formatNumber = (num: number) => num.toLocaleString();

  const cardBorderColor = isSelected
    ? item.symbol?.toLowerCase().includes('gold')
      ? theme.primary
      : theme.neutral200 
    : theme.card; 
  
  const iconColor = isSelected
    ? item.symbol?.toLowerCase().includes('gold')
      ? theme.primary
      : theme.neutral200 // Silver selection icon color
    : theme.mutedForeground;

  const styles = StyleSheet.create({
    card: {
      backgroundColor: theme.colors.cardBackground,
      borderRadius: 8,
      padding: 16,
      borderWidth: 2,
      borderColor: cardBorderColor,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2,
      margin:15,
    },
    cardHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 12,
    },
    cardTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: theme.foreground,
    },
    cardContent: {
      // main content area
    },
    priceSection: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginBottom: 12,
    },
    priceBox: {
      alignItems: 'center',
    },
    priceLabel: {
      fontSize: 12,
      color: theme.mutedForeground,
      textTransform: 'uppercase',
    },
    priceValue: {
      fontSize: 22,
      fontWeight: 'bold',
      color: theme.foreground,
    },
    statsSection: {
      borderTopWidth: 1,
      borderTopColor: theme.border,
      paddingTop: 12,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    statBox: {
      alignItems: 'center',
      flex: 1,
    },
    statLabel: {
      fontSize: 10,
      color: theme.mutedForeground,
      textTransform: 'uppercase',
    },
    statValue: {
      fontSize: 14,
      fontWeight: '500',
      color: theme.foreground,
    },
    highValue: { color: '#10B981' }, // Emerald 500
    lowValue: { color: '#F43F5E' }, // Rose 500
  });

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onSelect(item)}
      activeOpacity={0.7}
    >
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>{item.symbol.toUpperCase()}</Text>
        {isSelected ? (
          <CheckCircle2 size={24} color={iconColor} />
        ) : (
          <Circle size={24} color={theme.mutedForeground} />
        )}
      </View>
      <View style={styles.cardContent}>
        <View style={styles.priceSection}>
          <View style={styles.priceBox}>
            <Text style={styles.priceLabel}>Buy</Text>
            <Text style={styles.priceValue}>{formatNumber(item.Bid)}</Text>
          </View>
          <View style={styles.priceBox}>
            <Text style={styles.priceLabel}>Sell</Text>
            <Text style={styles.priceValue}>{formatNumber(item.Ask)}</Text>
          </View>
        </View>
        <View style={styles.statsSection}>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>High</Text>
            <Text style={[styles.statValue, styles.highValue]}>{formatNumber(item.High)}</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Low</Text>
            <Text style={[styles.statValue, styles.lowValue]}>{formatNumber(item.Low)}</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Open</Text>
            <Text style={styles.statValue}>{item.Open}</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Close</Text>
            <Text style={styles.statValue}>{item.Close}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
