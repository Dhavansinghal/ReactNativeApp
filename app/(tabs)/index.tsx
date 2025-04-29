import { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { useTheme } from '@/context/ThemeContext';
import PriceCard from '@/components/PriceCard';
import Header from '@/components/Header';
import { connectWebSocket, closeWebSocket } from '@/services/websocketService';
import { MetalPrice , MetalData } from '@/types/metals';
import EditableCard from '@/components/EditableCard';
import HighLowPriceCard from '@/components/HighLowPriceCard';
import { router } from 'expo-router';
import { useOnboarding } from '@/context/OnboardingContext';

export default function PricesScreen() {
  const { theme } = useTheme();
  const [goldPrice, setGoldPrice] = useState<MetalPrice | null>(null);
  const [silverPrice, setSilverPrice] = useState<MetalPrice | null>(null);

  const [listingData, setListingData] = useState<MetalData[]>();

  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  const { onboardingData, updateOnboardingData, isLoading } = useOnboarding();
  
  useEffect(() => {
      if (!onboardingData.isComplete) {
        router.replace('/onboarding');
      }
  }, [isLoading, onboardingData.isComplete]);


  const updateOnPrices =({price,type} :{price:String,type:String}) =>{
    if(type == "goldOn"){
      updateOnboardingData({ 
        goldOn: parseFloat(price.toString()) || 0,
      });
    }
    else{ 
      updateOnboardingData({ 
        silverOn: parseFloat(price.toString()) || 0,
      });
    }
  }
  const updateGoldPrice = (data: MetalPrice) => {
    setGoldPrice(data);
  };

  const updateSilverPrice = (data: MetalPrice) => {
    setSilverPrice(data);
  };
  
  const updateListingPrice = (data: any) => {
    setListingData(data);
  };

  const setupWebSocket = useCallback(() => {
    connectWebSocket({
      onGoldUpdate: updateGoldPrice,
      onSilverUpdate: updateSilverPrice,
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

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Header title="MCX Live" />

        <FlatList
          contentContainerStyle={styles.scrollContent}
          data={[1]} 
          keyExtractor={(item) => item.toString()}

          ListHeaderComponent={
            <>

              <View style={styles.cardContainer}>
                <PriceCard
                  title="Gold (XAU)"
                  symbol="Au"
                  price={goldPrice?.price}
                  change={goldPrice?.change}
                  changePercent={goldPrice?.changePercent}
                  time={goldPrice?.time}
                  loading={loading}
                  priceOn={onboardingData.goldOn}
                  metalType="gold"
                />
                <PriceCard
                  title="Silver (XAG)"
                  symbol="Ag"
                  price={silverPrice?.price}
                  change={silverPrice?.change}
                  changePercent={silverPrice?.changePercent}
                  time={goldPrice?.time}
                  priceOn={onboardingData.silverOn}
                  loading={loading}
                  metalType="silver"
                />
              </View>
              <View style={styles.editableCardsContainer}>
                <EditableCard 
                  label="GOLD ON" 
                  type="goldOn"
                  value={onboardingData.goldOn.toString()}
                  onChangeText={({price,type}) => updateOnPrices({ price, type: 'goldOn' })}
                />
                <EditableCard 
                  label="SILVER ON" 
                  type="silverOn"
                  value={onboardingData.silverOn.toString()}
                  onChangeText={({price,type}) => updateOnPrices({ price, type: 'silverOn' })}
                />
              </View>
            </>
          }
          

          renderItem={({ item }) => (
            <View style={styles.otherListingContainer}>
              <FlatList
                data={listingData}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <HighLowPriceCard
                    label={item.symbol}
                    value={"₹ " + item.Bid.toString()} 
                    highValue={item.High.toString()} 
                    lowValue={item.Low.toString()} 
                    ltp={item.LTP.toString()} 
                    close={item.Close.toString()} 
                    time={item.Time}
                    isCurrency={true}
                  />
                )}
              />
              <View style={styles.infoContainer}>
                <Text style={[styles.infoText, { color: theme.colors.secondaryText }]}>
                  All prices are in Rs per Gm ounce
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
    justifyContent: 'space-between',
    marginTop:5,
    marginBottom:5
  }
});