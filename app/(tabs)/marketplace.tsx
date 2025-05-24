import { View, Text, StyleSheet, FlatList, TouchableOpacity,Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/context/ThemeContext';
import Header from '@/components/Header';
import { ChevronRight } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';

export default function MarketplaceScreen() {
  const { theme } = useTheme();
  
  const router = useRouter();

  const mockHistoryData = [
    {
      id: '1',
      metal: 'gold',
      price: 2120.45,
      change: 0.59,
      timestamp: '10:34 AM, Today'
    }
    
  ];

  const handleShopPress = (id : any) => {
    // Provide haptic feedback on iOS/Android
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    
    // Navigate to shop detail screen
    router.push(`/shop/${id}`);
  };

  const renderItem = ({ item }: { item: typeof mockHistoryData[0] }) => (
    <TouchableOpacity 
      style={styles.container}
      onPress={() => handleShopPress(item.id)}
    >


   
      <View style={[styles.historyItem, { backgroundColor: theme.colors.cardBackground }]}>
        <View style={styles.metalInfo}>
          <View style={[styles.symbolCircle, { 
            backgroundColor: item.metal === 'gold' ? theme.colors.goldBackground : theme.colors.silverBackground 
          }]}>
            <Text style={[styles.symbolText, { 
              color: item.metal === 'gold' ? theme.colors.gold : theme.colors.silver 
            }]}>
              Logo
            </Text>
          </View>
          <View>
            <Text style={[styles.metalName, { color: theme.colors.text }]}>
              Mangal Jewellers
            </Text>
            <Text style={[styles.timestamp, { color: theme.colors.secondaryText }]}>
              {item.timestamp}
            </Text>
          </View>
        </View>
        
        <View style={styles.priceInfo}>
          <Text style={[styles.price, { color: theme.colors.text }]}>
            <ChevronRight size={30} color={theme.colors.text} />
          </Text>
        </View>
      </View>
     </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Header title="Marketplace" />
      
      <FlatList
        data={mockHistoryData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListHeaderComponent={() => (
          <Text style={[styles.headerText, { color: theme.colors.secondaryText }]}>
            {'Checkout price from other sellers'}
          </Text>
        )}
      />

      <View style={styles.infoContainer}>
        <Text style={[styles.infoText, { color: theme.colors.secondaryText }]}>
          To list your shop in Marketplace
        </Text>
        <Text style={[styles.infoText, { color: theme.colors.secondaryText }]}>
          Contact us on : xxxxxxxxx
        </Text>
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  infoContainer: {
    marginTop: 10,
    marginBottom: 50,
    alignItems: 'center',
  },
  infoText: {
    fontSize: 14,
    marginBottom: 10,
  },
  list: {
    padding: 16,
    paddingBottom: 40,
  },
  headerText: {
    fontSize: 16,
    marginBottom: 16,
    fontWeight: '500',
  },
  historyItem: {
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  separator: {
    height: 12,
  },
  version:{
    textAlign: 'center',
    marginTop: 20,
    fontSize: 20,

  },
  metalInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  symbolCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  symbolText: {
    fontSize: 16,
    fontWeight: '600',
  },
  metalName: {
    fontSize: 16,
    fontWeight: '600',
  },
  timestamp: {
    fontSize: 12,
    marginTop: 2,
  },
  priceInfo: {
    alignItems: 'flex-end',
  },
  price: {
    fontSize: 50,
    fontWeight: '700',
  },
  changeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  change: {
    fontSize: 14,
    marginLeft: 2,
  },
});