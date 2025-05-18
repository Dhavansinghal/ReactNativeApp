import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { ArrowUp, ArrowDown } from 'lucide-react-native';

type PriceCardProps = {
  title: string;
  symbol: string;
  buy?: number;
  sell?: number;
  change?: number;
  changePercent?: number;
  loading: boolean;
  time?: string;
  priceBuyOn?:number;
  priceSellOn?:number;
  perValue?:string;
  metalType: 'gold' | 'silver';
};

const formatPrice = (price: number) => {
    return price.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 });
};

export default function PriceCard2({
  title,
  symbol,
  buy,
  sell,
  change,
  changePercent,
  loading,
  time,
  priceBuyOn,
  priceSellOn,
  perValue,
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
    if (!loading && (buy || sell)) {
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
  }, [buy,sell , loading, pulseAnim]);

  const isPositiveChange = change && change > 0;
  const changeColor = isPositiveChange ? theme.colors.success : theme.colors.error;
  const metalColor = metalType === 'gold' ? theme.colors.gold : theme.colors.silver;
  const metalBgColor = metalType === 'gold' ? theme.colors.goldBackground : theme.colors.silverBackground;


  const styless = StyleSheet.create({
    card: {
      width: '100%',
      borderRadius: 8,
      overflow: 'hidden',
      elevation: 3, // For Android shadow
      shadowColor: '#000', // For iOS shadow
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    goldCard: {
      backgroundColor: theme.primary,
    },
    silverCard: {
      backgroundColor: theme.neutral200,
    },
    cardHeader: {
      paddingBottom: 8,
      paddingTop: 12,
      alignItems: 'center',
    },
    cardTitle: {
      fontSize: 16,
      fontWeight: '600',
      letterSpacing: 0.5,
    },
    goldTitle: { color: theme.primaryForeground },
    silverTitle: { color: theme.neutral900 },
    cardContent: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      paddingHorizontal: 8,
      paddingBottom: 12,
    },
    infoSection: {
      alignItems: 'center',
    },
    labelText: {
      fontSize: 10,
      textTransform: 'uppercase',
      opacity: 0.9,
    },
    premiumText: {
      fontSize: 10,
      opacity: 0.8,
    },
    priceText: {
      fontSize: 30,
      fontWeight: 'bold',
      marginTop: 2,
    },
    divider: {
      height: '60%',
      width: 1,
      alignSelf: 'center',
    },
    goldDivider: { backgroundColor:  theme.colors.text + '80' }, // opacity 50%
    silverDivider: { backgroundColor:  theme.colors.text + '80' },
  });

  const isGold = metalType === 'gold';
  const dividerStyle = isGold ? styless.goldDivider : styless.silverDivider;

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
                {isPositiveChange ? '+' : ''}{change} 
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
            <>
            <View style={styless.cardContent}>
                <View style={styless.infoSection}>
                    <Text style={[styless.labelText, { color:  theme.colors.text }]}>Buy</Text>
                    <Text style={[styless.premiumText, { color:  theme.colors.text }]}>({(priceBuyOn?priceBuyOn:0)})</Text>
                    <Text style={[styless.priceText, { color:  theme.colors.text }]}>₹ {formatPrice((buy?buy:0) + (priceBuyOn?priceBuyOn:0))}</Text>
                </View>
                <View style={[styless.divider, dividerStyle]} />
                <View style={styless.infoSection}>
                    <Text style={[styless.labelText, { color:  theme.colors.text }]}>Sell</Text>
                    <Text style={[styless.premiumText, { color:  theme.colors.text }]}>({(priceSellOn?priceSellOn:0)})</Text>
                    <Text style={[styless.priceText, { color:  theme.colors.text }]}>₹ {formatPrice((sell?sell:0) + (priceSellOn?priceSellOn:0))}</Text>
                </View>
            </View>
            </>
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