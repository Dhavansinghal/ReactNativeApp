import { View, Text, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/context/ThemeContext';
import Header from '@/components/Header';
import { mockHistoryData } from '@/data/mockData';
import { ArrowUp, ArrowDown } from 'lucide-react-native';

export default function HistoryScreen() {
  const { theme } = useTheme();

  const renderItem = ({ item }: { item: typeof mockHistoryData[0] }) => (
    <View style={[styles.historyItem, { backgroundColor: theme.colors.cardBackground }]}>
      <View style={styles.metalInfo}>
        <View style={[styles.symbolCircle, { 
          backgroundColor: item.metal === 'gold' ? theme.colors.goldBackground : theme.colors.silverBackground 
        }]}>
          <Text style={[styles.symbolText, { 
            color: item.metal === 'gold' ? theme.colors.gold : theme.colors.silver 
          }]}>
            {item.metal === 'gold' ? 'Au' : 'Ag'}
          </Text>
        </View>
        <View>
          <Text style={[styles.metalName, { color: theme.colors.text }]}>
            {item.metal === 'gold' ? 'Gold' : 'Silver'}
          </Text>
          <Text style={[styles.timestamp, { color: theme.colors.secondaryText }]}>
            {item.timestamp}
          </Text>
        </View>
      </View>
      
      <View style={styles.priceInfo}>
        <Text style={[styles.price, { color: theme.colors.text }]}>
          ${item.price}
        </Text>
        <View style={styles.changeContainer}>
          {item.change > 0 ? (
            <ArrowUp size={14} color={theme.colors.success} />
          ) : (
            <ArrowDown size={14} color={theme.colors.error} />
          )}
          <Text style={[styles.change, { 
            color: item.change > 0 ? theme.colors.success : theme.colors.error 
          }]}>
            {item.change > 0 ? '+' : ''}{item.change.toFixed(2)}%
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Header title="Price History" />
      
      <FlatList
        data={mockHistoryData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListHeaderComponent={() => (
          <Text style={[styles.headerText, { color: theme.colors.secondaryText }]}>
            Recent Price Updates
          </Text>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    fontSize: 18,
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