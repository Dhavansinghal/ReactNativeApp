import { useState, useCallback } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { VictoryLine, VictoryChart, VictoryAxis, VictoryTheme } from 'victory-native';
import { useTheme } from '@/context/ThemeContext';
import Header from '@/components/Header';
import TimeframeSelector from '@/components/TimeframeSelector';
import MetalSelector from '@/components/MetalSelector';
import { mockChartData } from '@/data/mockData';

const { width } = Dimensions.get('window');

export default function ChartsScreen() {
  const { theme } = useTheme();
  const [selectedMetal, setSelectedMetal] = useState<'gold' | 'silver'>('gold');
  const [timeframe, setTimeframe] = useState<'day' | 'week' | 'month' | 'year'>('day');
  
  const chartData = mockChartData[selectedMetal][timeframe];
  
  const handleMetalChange = useCallback((metal: 'gold' | 'silver') => {
    setSelectedMetal(metal);
  }, []);
  
  const handleTimeframeChange = useCallback((newTimeframe: 'day' | 'week' | 'month' | 'year') => {
    setTimeframe(newTimeframe);
  }, []);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Header title="Price Charts" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <MetalSelector
          selectedMetal={selectedMetal}
          onSelectMetal={handleMetalChange}
        />
        
        <View style={styles.chartContainer}>
          <VictoryChart
            width={width - 40}
            height={300}
            theme={VictoryTheme.material}
            domainPadding={{ y: 10 }}
            padding={{ top: 10, bottom: 50, left: 60, right: 20 }}
            style={{
              background: { fill: theme.colors.cardBackground }
            }}
          >
            <VictoryAxis
              style={{
                axis: { stroke: theme.colors.border },
                tickLabels: { fill: theme.colors.secondaryText, fontSize: 10 },
                grid: { stroke: theme.colors.border, strokeDasharray: '5,5' }
              }}
              tickCount={5}
            />
            <VictoryAxis
              dependentAxis
              style={{
                axis: { stroke: theme.colors.border },
                tickLabels: { fill: theme.colors.secondaryText, fontSize: 10 },
                grid: { stroke: theme.colors.border, strokeDasharray: '5,5' }
              }}
            />
            <VictoryLine
              data={chartData}
              x="time"
              y="price"
              style={{
                data: { 
                  stroke: selectedMetal === 'gold' ? theme.colors.gold : theme.colors.silver,
                  strokeWidth: 3
                }
              }}
              animate={{ duration: 500 }}
            />
          </VictoryChart>
        </View>
        
        <TimeframeSelector
          selectedTimeframe={timeframe}
          onSelectTimeframe={handleTimeframeChange}
        />

        <View style={styles.statsContainer}>
          <View style={[styles.statCard, { backgroundColor: theme.colors.cardBackground }]}>
            <Text style={[styles.statLabel, { color: theme.colors.secondaryText }]}>High</Text>
            <Text style={[styles.statValue, { color: theme.colors.text }]}>
              ${selectedMetal === 'gold' ? '2,135.24' : '27.12'}
            </Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: theme.colors.cardBackground }]}>
            <Text style={[styles.statLabel, { color: theme.colors.secondaryText }]}>Low</Text>
            <Text style={[styles.statValue, { color: theme.colors.text }]}>
              ${selectedMetal === 'gold' ? '2,097.65' : '26.34'}
            </Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: theme.colors.cardBackground }]}>
            <Text style={[styles.statLabel, { color: theme.colors.secondaryText }]}>Avg</Text>
            <Text style={[styles.statValue, { color: theme.colors.text }]}>
              ${selectedMetal === 'gold' ? '2,112.48' : '26.78'}
            </Text>
          </View>
        </View>
      </ScrollView>
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
  chartContainer: {
    marginVertical: 20,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  statCard: {
    flex: 1,
    padding: 15,
    borderRadius: 12,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 14,
    marginBottom: 5,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '600',
  },
});