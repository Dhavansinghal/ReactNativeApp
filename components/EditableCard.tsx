import React from 'react';
import {  useState } from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import { useTheme } from '@/context/ThemeContext';

interface EditableCardProps {
  label: string;
  value: string;
  type: string;
  // onChangeText: (price :String) => void;
  onBlueText:({price,type}:{price:string,type:string})=> void;
}

export default function EditableCard({ label, type, value,onBlueText }: EditableCardProps) {
  const { theme } = useTheme();

  const [inputValue, setInputValue] = useState(value);

  const handleChange =(price:string) => {
    setInputValue(price);
  }

  const handleBlur = () => {
    onBlueText({price: inputValue,type:type } ); 
  }


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
        value={inputValue}
        onChangeText={(price) => handleChange(price) }
        onBlur={handleBlur}
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