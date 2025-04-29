import React from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import { useTheme } from '@/context/ThemeContext';

interface EditableCardProps {
  label: string;
  value: string;
  type: string;
  onChangeText: ({price,type} :{price:String,type:String}) => void;
}

export default function EditableCard({ label, type, value, onChangeText }: EditableCardProps) {
  const { theme } = useTheme();

  return (
    <View style={[
      styles.container, 
      { 
        backgroundColor: theme.colors.cardBackground
      }
    ]}>
      <Text style={[styles.label, { color: theme.colors.secondaryText }]}>{label}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={(price) => onChangeText({price, type: type}) }
        keyboardType="numeric"
        maxLength={10}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '48%',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
  },
  label: {
    fontSize: 18,
    fontWeight: '500',
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