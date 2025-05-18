import { useCallback, useEffect, useState,useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl, FlatList,TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { useTheme } from '@/context/ThemeContext';
import Header from '@/components/Header';
import { connectWebSocket, closeWebSocket } from '@/services/websocketService';
import { MetalPrice , MetalData } from '@/types/metals';
import { router } from 'expo-router';
import { useOnboarding } from '@/context/OnboardingContext';
import { addPriceUpdate } from '@/services/appwrite';
import PriceCard2 from '@/components/PriceCard2';
import { McxItemCard } from '@/components/lib/McxItemCard'; 

interface PremiumDetails {
  buy: number;
  sell: number;
}


export default function PricesScreen() {
  const { theme } = useTheme();
  const [goldPrice, setGoldPrice] = useState<MetalPrice | null>(null);
  const [silverPrice, setSilverPrice] = useState<MetalPrice | null>(null);

  const [listingData, setListingData] = useState<MetalData[]>();

  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  const { onboardingData, updateOnboardingData } = useOnboarding();

  const [selectedGoldId, setSelectedGoldId] = useState(onboardingData.selectedGoldId);
  const [selectedSilverId, setSelectedSilverId] = useState(onboardingData.selectedSilverId);

  const selectedGoldIdRef = useRef(selectedGoldId);
  useEffect(() => {
    selectedGoldIdRef.current = selectedGoldId;
  }, [selectedGoldId]);

  const selectedSilverIdRef = useRef(selectedSilverId);
  useEffect(() => {
    selectedSilverIdRef.current = selectedSilverId;
  }, [selectedSilverId]);

  const [goldPremiums, setGoldPremiums] = useState<PremiumDetails>({ buy: onboardingData.goldBuyOn, sell: onboardingData.goldSellOn });
  const [silverPremiums, setSilverPremiums] = useState<PremiumDetails>({ buy: onboardingData.silverBuyOn, sell: onboardingData.silverSellOn });

  useEffect(() => {
      if (!onboardingData.isComplete) {
        router.replace('/onboarding');
      }
  }, [ onboardingData.isComplete]);


  const handlePremiumChange = async (metal: 'gold' | 'silver', type: 'buy' | 'sell', value: string) => {
    const regex = /^-?\d*$/;
    if (!regex.test(value)) {
      return;
    }
    
    const numericValue = value === '' || value === '-' ? value : parseInt(value, 10);
    
    if (metal === 'gold') {
      setGoldPremiums(prev => ({ ...prev, [type]: numericValue }));
    } else {
      setSilverPremiums(prev => ({ ...prev, [type]: numericValue }));
    }
  };
  

  const handlePremiumChangeBlur = async (whichOne: string) => {

    if (whichOne === 'goldBuy') {
      updateOnboardingData({ 
        goldBuyOn: parseFloat(goldPremiums.buy.toString()) || 0,
      });
      await addPriceUpdate(onboardingData.phoneNumber , onboardingData.city, 'Gold', 'buy', parseFloat(goldPremiums.buy.toString()) || 0); 
    }
    else if (whichOne === 'goldSell') {
      updateOnboardingData({ 
        goldSellOn: parseFloat(goldPremiums.sell.toString()) || 0,
      });
      await addPriceUpdate(onboardingData.phoneNumber , onboardingData.city, 'Gold', 'sell', parseFloat(goldPremiums.sell.toString()) || 0); 

    }
    else if  (whichOne === 'silverBuy') {
      updateOnboardingData({ 
        silverBuyOn: parseFloat(silverPremiums.buy.toString()) || 0,
      });
      await addPriceUpdate(onboardingData.phoneNumber , onboardingData.city, 'Gold', 'buy', parseFloat(silverPremiums.buy.toString()) || 0); 
    }
    else if  (whichOne === 'silverSell') {
      updateOnboardingData({ 
        silverSellOn: parseFloat(silverPremiums.sell.toString()) || 0,
      });
      await addPriceUpdate(onboardingData.phoneNumber , onboardingData.city, 'Gold', 'sell', parseFloat(silverPremiums.sell.toString()) || 0); 
    }
    
  };
  
  const updateListingPrice = (data: any) => {
    setListingData(data);


    const liveGold = data.find((item: any) => item.symbol === selectedGoldIdRef.current);
    const liveSilver = data.find((item: any) => item.symbol === selectedSilverIdRef.current);
    if (liveGold) {
      setGoldPrice({
        buy: parseFloat(liveGold.Bid),
        sell: parseFloat(liveGold.Ask),
        change: parseFloat(liveGold.Difference),
        changePercent: (parseFloat(liveGold.Difference) / parseFloat(liveGold.Bid)) * 100,
        time: liveGold.Time
      });

    }
    if (liveSilver) {
      setSilverPrice({
        buy: parseFloat(liveSilver.Bid),
        sell: parseFloat(liveSilver.Ask),   
        change: parseFloat(liveSilver.Difference),
        changePercent: (parseFloat(liveSilver.Difference) / parseFloat(liveSilver.Bid)) * 100,
        time: liveSilver.Time
      });
    }
  };

  const setupWebSocket = useCallback(() => {
    connectWebSocket({
      // onGoldUpdate: updateGoldPrice,
      // onSilverUpdate: updateSilverPrice,
      onFullRefresh: updateListingPrice,
      onOpen: () => setLoading(false),
    });
  }, []);

  useFocusEffect(
    useCallback(() => {
      setupWebSocket();
      return () => {
        closeWebSocket();
      };
    }, [setupWebSocket])
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    closeWebSocket();
    setupWebSocket();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, [setupWebSocket]);


  const handleSelect = (item: MetalData) => {
    if (item.symbol.toLowerCase().includes('gold')) {
      updateOnboardingData({ 
        selectedGoldId: item.symbol,
      });

      setSelectedGoldId(item.symbol);

      setGoldPrice({ 
        buy: parseFloat((item.Bid).toString()),
        sell:parseFloat((item.Ask).toString()),
        change:parseFloat((item.Difference).toString()),
        changePercent: parseFloat(((item.Difference / item.Bid) * 100).toFixed(2)),
        time: item.Time
      });

    } else if (item.symbol.toLowerCase().includes('silver')) {
      updateOnboardingData({ 
        selectedSilverId: item.symbol,
      });
      setSelectedSilverId(item.symbol);

      setSilverPrice({ 
        buy: parseFloat((item.Bid).toString()),
        sell: parseFloat((item.Ask).toString()),
        change: parseFloat((item.Difference).toString()),
        changePercent: parseFloat(((item.Difference / item.Bid) * 100).toFixed(2)),
        time: item.Time
      });
    }
  };

  const styless = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: theme.background,
    },
    premiumCard: {
      backgroundColor: theme.card,
      borderRadius: 8,
      padding: 16,
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
    },
    premiumCardHeader: {
      alignItems: 'center',
      marginBottom: 12,
    },
    premiumCardTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: theme.foreground,
    },
    premiumContent: {
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    metalPremiumSection: {
      flex: 1,
      alignItems: 'center',
      paddingHorizontal: 8,
    },
    metalTitle: {
      fontSize: 14,
      fontWeight: '500',
      marginBottom: 8,
      textAlign: 'center',
    },
    goldMetalTitle: { color: theme.primary },
    silverMetalTitle: { color: theme.neutral500 },
    inputGroup: {
      width: '100%',
      marginBottom: 8,
    },
    inputLabel: {
      fontSize: 10,
      color: theme.mutedForeground,
      textAlign: 'center',
      marginBottom: 2,
    },
    textInput: {
      backgroundColor: theme.inputBackground,
      color: theme.inputText,
      textAlign: 'center',
      paddingVertical: 10,
      paddingHorizontal: 8,
      borderRadius: 4,
      fontSize: 14,
      borderWidth: 1,
      borderColor: theme.border,
    },
    noteText: {
      textAlign: 'center',
      fontSize: 10,
      color: theme.mutedForeground,
      marginTop: 12,
      paddingHorizontal:16,
    },
    divider: {
      width: 1,
      backgroundColor: theme.border,
      marginHorizontal: 8,
    }
  });

   return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Header title="Bhav" />
     

        <FlatList
          contentContainerStyle={styles.scrollContent}
          data={[1]} 
          keyExtractor={(item) => item.toString()}

          ListHeaderComponent={
            <>

              <View style={styles.cardContainer}>
                <PriceCard2
                  title="Gold (XAU)"
                  symbol="Au"
                  buy={goldPrice?.buy}
                  sell={goldPrice?.sell}
                  change={goldPrice?.change}
                  changePercent={goldPrice?.changePercent}
                  time={goldPrice?.time}
                  loading={loading}
                  priceBuyOn={onboardingData.goldBuyOn}
                  priceSellOn={onboardingData.goldSellOn}
                  perValue={'per 10Gm'}
                  metalType="gold"
                />

                <PriceCard2
                  title="Silver (XAG)"
                  symbol="Ag"
                  buy={silverPrice?.buy}
                  sell={silverPrice?.sell}
                  change={silverPrice?.change}
                  changePercent={silverPrice?.changePercent}
                  time={goldPrice?.time}
                  priceBuyOn={onboardingData.silverBuyOn}
                  priceSellOn={onboardingData.silverSellOn}
                  perValue={'per 1Kg'}
                  loading={loading}
                  metalType="silver"
                />
              </View>

              <View style={[
                  styles.premiumContainer, 
                  { 
                    backgroundColor: theme.colors.cardBackground
                  }
                ]}>
                <View style={styless.premiumCardHeader}>
                  <Text style={styless.premiumCardTitle}>Set Premiums</Text>
                </View>
                <View style={styless.premiumContent}>
                  {/* Gold Premiums */}
                  <View style={styless.metalPremiumSection}>
                    <Text style={[styless.metalTitle, styless.goldMetalTitle]}>Gold MCX Next</Text>
                    <View style={styless.inputGroup}>
                      <Text style={styless.inputLabel}>SELL</Text>
                      <TextInput
                        style={styles.input}
                        keyboardType="number-pad"
                        value={goldPremiums.sell === 0 ? '' : String(goldPremiums.sell)}
                        onChangeText={(text) => handlePremiumChange('gold', 'sell', text)}
                        onBlur={() => handlePremiumChangeBlur('goldSell')}
                        placeholder="0"
                        placeholderTextColor={theme.mutedForeground}
                        maxLength={5}
                      />

                    </View>
                    <View style={styless.inputGroup}>
                      <Text style={styless.inputLabel}>BUY</Text>
                      <TextInput
                        style={styles.input}
                        keyboardType="number-pad"
                        value={goldPremiums.buy === 0 ? '' : String(goldPremiums.buy)}
                        onChangeText={(text) => handlePremiumChange('gold', 'buy', text)}
                        onBlur={() => handlePremiumChangeBlur('goldBuy')}
                        placeholder="0"
                        placeholderTextColor={theme.mutedForeground}
                        maxLength={5}
                      />
                    </View>
                  </View>
                  
                  <View style={styless.divider} />

                  {/* Silver Premiums */}
                  <View style={styless.metalPremiumSection}>
                    <Text style={[styless.metalTitle, styless.silverMetalTitle]}>Silver MCX Next</Text>
                    <View style={styless.inputGroup}>
                      <Text style={styless.inputLabel}>SELL</Text>
                      <TextInput
                        style={styles.input}
                        keyboardType="number-pad"
                        value={silverPremiums.sell === 0 ? '' : String(silverPremiums.sell)}
                        onChangeText={(text) => handlePremiumChange('silver', 'sell', text)}
                        onBlur={() => handlePremiumChangeBlur('silverSell')}
                        placeholder="0"
                        placeholderTextColor={theme.mutedForeground}
                        maxLength={5}
                      />
                    </View>
                    <View style={styless.inputGroup}>
                      <Text style={styless.inputLabel}>BUY</Text>
                      <TextInput
                        style={styles.input}
                        keyboardType="number-pad"
                        value={silverPremiums.buy === 0 ? '' : String(silverPremiums.buy)}
                        onChangeText={(text) => handlePremiumChange('silver', 'buy', text)}
                        onBlur={() => handlePremiumChangeBlur('silverBuy')}
                        placeholder="0"
                        placeholderTextColor={theme.mutedForeground}
                        maxLength={5}
                      />
                    </View>
                  </View>
                </View>
                <Text style={styless.noteText}>
                  Note: please enter the premiums for gold &amp; silver up to 5 positive or 4 negative digits.
                </Text>
              </View>
              
            </>
          }
          renderItem={({ item }) => (
            <View style={styles.otherListingContainer}>
              <FlatList
                data={listingData}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => {
                  const symbol = item.symbol?.toLowerCase();
                  const isGold = symbol?.includes('gold');
                  const isSilver = symbol?.includes('silver');
                  if (isGold || isSilver) {
                    const isSelected = isGold
                      ? item.symbol === selectedGoldId
                      : item.symbol === selectedSilverId;
                    return (
                      <McxItemCard
                        item={item}
                        isSelected={isSelected}
                        onSelect={handleSelect}
                        theme={theme}
                      />
                    );
                  }
                  return null; 
                }}
              />
              <View style={styles.infoContainer}>
                <Text style={[styles.infoText, { color: theme.colors.secondaryText }]}>
                  All prices are in T&C
                </Text>
                <Text style={[styles.infoText, { color: theme.colors.secondaryText }]}>
                  Data refreshes automatically in real-time
                </Text>
                <Text style={[styles.updateTime, { color: theme.colors.secondaryText }]}>
                  Last updated: {new Date().toLocaleTimeString()}
                </Text>
              </View>
            </View>
          )}
          
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={theme.colors.primary}
              colors={[theme.colors.primary]}
            />
          }
        />

    </SafeAreaView>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  premiumContainer: {
    flex: 1,
    borderRadius:25,
    padding: 16,
    marginBottom: 16,
    marginTop:20
  },
  smallContainer: {
    marginBottom: 16,
    borderRadius: 12,
    padding: 12,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  cardContainer: {
    gap: 20,
  },
  infoContainer: {
    marginTop: 30,
    alignItems: 'center',
  },
  infoText: {
    fontSize: 14,
    marginBottom: 4,
  },
  updateTime: {
    fontSize: 12,
    marginTop: 8,
  },
  editableCardsContainer :{
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    marginTop:20
  },
  otherListingContainer :{
    flex:1,
    marginTop:5,
    marginBottom:5,
    paddingHorizontal: 16,
    padding: 8,
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
  input: {
    color: 'white',
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    width: '100%',
    textDecorationLine:'underline'
  },
});
