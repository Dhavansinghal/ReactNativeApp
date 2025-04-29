import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useTheme } from '@/context/ThemeContext';

type MetalSelectorProps = {
  selectedMetal: 'gold' | 'silver';
  onSelectMetal: (metal: 'gold' | 'silver') => void;
};

export default function MetalSelector({ selectedMetal, onSelectMetal }: MetalSelectorProps) {
  const { theme } = useTheme();
  
  return (
    <View style={[styles.container, { backgroundColor: theme.colors.cardBackground }]}>
      <TouchableOpacity
        style={[
          styles.option,
          selectedMetal === 'gold' && [
            styles.selectedOption,
            { backgroundColor: theme.colors.goldBackground }
          ],
        ]}
        onPress={() => onSelectMetal('gold')}
      >
        <View style={styles.content}>
          <Text 
            style={[
              styles.metalSymbol, 
              { color: theme.colors.gold }
            ]}
          >
            Au
          </Text>
          <Text 
            style={[
              styles.metalText, 
              { color: selectedMetal === 'gold' ? theme.colors.text : theme.colors.secondaryText }
            ]}
          >
            Gold
          </Text>
        </View>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={[
          styles.option,
          selectedMetal === 'silver' && [
            styles.selectedOption,
            { backgroundColor: theme.colors.silverBackground }
          ],
        ]}
        onPress={() => onSelectMetal('silver')}
      >
        <View style={styles.content}>
          <Text 
            style={[
              styles.metalSymbol, 
              { color: theme.colors.silver }
            ]}
          >
            Ag
          </Text>
          <Text 
            style={[
              styles.metalText, 
              { color: selectedMetal === 'silver' ? theme.colors.text : theme.colors.secondaryText }
            ]}
          >
            Silver
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 12,
    overflow: 'hidden',
  },
  option: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  selectedOption: {
    borderRadius: 8,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  metalSymbol: {
    fontSize: 16,
    fontWeight: '700',
    marginRight: 6,
  },
  metalText: {
    fontSize: 16,
    fontWeight: '600',
  },
});