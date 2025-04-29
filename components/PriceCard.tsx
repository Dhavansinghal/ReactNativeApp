import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { ArrowUp, ArrowDown } from 'lucide-react-native';

type PriceCardProps = {
  title: string;
  symbol: string;
  price?: number;
  change?: number;
  changePercent?: number;
  loading: boolean;
  time?: string;
  priceOn?:number;
  metalType: 'gold' | 'silver';
};

export default function PriceCard({
  title,
  symbol,
  price,
  change,
  changePercent,
  loading,
  time,
  priceOn,
  metalType,
}: PriceCardProps) {
  const { theme } = useTheme();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);
  
  useEffect(() => {
    if (!loading && price) {
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.05,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        })
      ]).start();
    }
  }, [price, loading, pulseAnim]);

  const isPositiveChange = change && change > 0;
  const changeColor = isPositiveChange ? theme.colors.success : theme.colors.error;
  const metalColor = metalType === 'gold' ? theme.colors.gold : theme.colors.silver;
  const metalBgColor = metalType === 'gold' ? theme.colors.goldBackground : theme.colors.silverBackground;

  return (
    <Animated.View 
      style={[
        styles.card, 
        { 
          backgroundColor: theme.colors.cardBackground,
          opacity: fadeAnim,
          transform: [{ scale: pulseAnim }]
        }
      ]}
    >
      <View style={styles.row}>
        <View style={[styles.symbolContainer, { backgroundColor: metalBgColor }]}>
          <Text style={[styles.symbol, { color: metalColor }]}>{symbol}</Text>
        </View>
        <View>
          <Text style={[styles.title, { color: theme.colors.text }]}>{title}</Text>
          {!loading && change !== undefined && (
            <View style={styles.changeRow}>
              {isPositiveChange ? (
                <ArrowUp size={14} color={changeColor} />
              ) : (
                <ArrowDown size={14} color={changeColor} />
              )}
              <Text style={[styles.changeText, { color: changeColor }]}>
                {isPositiveChange ? '+' : ''}{change.toFixed(2)} 
                ({isPositiveChange ? '+' : ''}{changePercent?.toFixed(2)}%)
              </Text>
            </View>
          )}
        </View>
      </View>
      
      <View style={styles.priceContainer}>
        {loading ? (
          <View style={[styles.loadingBar, { backgroundColor: theme.colors.border }]} />
        ) : (
         
            <Text style={[styles.price, { color: theme.colors.text }]}>
              ₹ {(price ? (parseFloat(price.toFixed(2)) + parseFloat(price.toFixed(2))).toFixed(2) : '0.00') + ' '}
               <Text style={[styles.unit, { color: theme.colors.secondaryText }]}>
                per Gm
              </Text>
            </Text>
        )}
        <Text style={[styles.unit, { color: theme.colors.secondaryText }]}>
          Time : {time}
        </Text>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  symbolContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  symbol: {
    fontSize: 20,
    fontWeight: '700',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  changeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  changeText: {
    fontSize: 14,
    marginLeft: 4,
  },
  priceContainer: {
    marginTop: 16,
  },
  loadingBar: {
    height: 32,
    width: '70%',
    borderRadius: 4,
    opacity: 0.3,
  },
  price: {
    fontSize: 36,
    fontWeight: '700',
  },
  unit: {
    fontSize: 14,
    marginTop: 4,
  },
});