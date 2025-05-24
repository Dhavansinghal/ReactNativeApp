import { useCallback, useEffect, useState } from 'react';
import { View,Text,  StyleSheet, TouchableOpacity, Platform} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { useTheme } from '@/context/ThemeContext';
import Header from '@/components/Header';
import { connectWebSocket, closeWebSocket } from '@/services/websocketService';
import { MetalPrice , MetalData } from '@/types/metals';
import PriceCard2 from '@/components/PriceCard2';
import { ChevronLeft, MapPinHouse, Phone, Store, User } from 'lucide-react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';


export default function PricesScreen() {
  const { theme } = useTheme();

    const { id } = useLocalSearchParams<{ id: string }>();
    const router = useRouter();
    const [shop, setShop] = useState({
        id: '1',
        shopName: 'Mangal Jewellers',
        shopCity: 'Sabalgarh MP',
        phoneNumber: 'xxxxxxxxx',
        goldBuy: 2000,
        goldSell: 0.59,
        silverBuy: 0.59,
        silverSell: 0.59,
        timestamp: '10:34 AM, Today'
    });

    const fetchShopData = async () => {
        if (!id) return;
        
        try {
        setShop({
            id: '1',
            shopName: 'Mangal Jewellers',
            shopCity: 'Sabalgarh MP',
            phoneNumber: 'xxxxxxxxx',
            goldBuy: 2000,
            goldSell: 0.59,
            silverBuy: 0.59,
            silverSell: 0.59,
            timestamp: '10:34 AM, Today'
        });
        
        } catch (err) {
        console.error('Error fetching shop data:', err);
        } finally {
        setLoading(false);
        }
    };

    useEffect(() => {
        fetchShopData();
    }, [id]);

    const handleGoBack = () => {
        router.back();
    };

  
  const [goldPrice, setGoldPrice] = useState<MetalPrice | null>(null);
  const [silverPrice, setSilverPrice] = useState<MetalPrice | null>(null);

  const [loading, setLoading] = useState(true);

  const updateListingPrice = (data: any) => {

    const liveGold = data.find((item: any) => item.symbol === 'gold');
    const liveSilver = data.find((item: any) => item.symbol === 'silver');

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


   return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      
        <TouchableOpacity 
            style={styles.backButton} 
            onPress={handleGoBack}
        >
            <ChevronLeft size={24} color={"#333"} />
        </TouchableOpacity>
        <Header title="Marketplace" />

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Shop Information
          </Text>
          
          <View style={[styles.settingItem, { backgroundColor: theme.colors.cardBackground }]}>
            
            <View style={styles.valueContainer}>
              <Phone size={18} color={theme.colors.secondaryText} />
              <Text style={[styles.valueText, { color: theme.colors.secondaryText }]}>{shop.phoneNumber}</Text>
            </View>
            <View style={styles.valueContainer}>
                <Store size={18} color={theme.colors.secondaryText} />
              <Text style={[styles.valueText, { color: theme.colors.secondaryText }]}>{shop.shopName}</Text>
            </View>
            <View style={styles.valueContainer}>
                <MapPinHouse size={18} color={theme.colors.secondaryText} />
              <Text style={[styles.valueText, { color: theme.colors.secondaryText }]}>{shop.shopCity}</Text>
            </View>
          </View>
          

        </View>

        <View style={styles.cardContainer}>
          <PriceCard2
            title="Gold (995)"
            symbol="Au"
            buy={goldPrice?.buy}
            sell={goldPrice?.sell}
            change={goldPrice?.change}
            changePercent={goldPrice?.changePercent}
            time={goldPrice?.time}
            loading={loading}
            priceBuyOn={2000}
            priceSellOn={2000}
            perValue={'per 10Gm'}
            metalType="gold"
          />

          <PriceCard2
            title="Silver (9999)"
            symbol="Ag"
            buy={silverPrice?.buy}
            sell={silverPrice?.sell}
            change={silverPrice?.change}
            changePercent={silverPrice?.changePercent}
            time={goldPrice?.time}
            priceBuyOn={2000}
            priceSellOn={2000}
            perValue={'per 1Kg'}
            loading={loading}
            metalType="silver"
          />
        </View>

    </SafeAreaView>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backButton: {
    top: Platform.OS === 'android' ? 16 : 8,
    left: 16,
    zIndex: 10,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    elevation: 2,
  },
  section: {
    marginBottom: 24,
    padding:20
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  valueText: {
    marginLeft: 10,
    fontSize: 14,
  },
  settingItem: {
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  settingLabel: {
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
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
