import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { useTheme } from '@/context/ThemeContext';
import { useOnboarding } from '@/context/OnboardingContext';
import { Coins, Gem } from 'lucide-react-native';

export default function PricingScreen() {
  const { theme } = useTheme();
  const { onboardingData, updateOnboardingData } = useOnboarding();
  const [GoldOn, setGoldOn] = useState(String);
  const [SilverOn, setSilverOn] = useState(String);

  const handleSubmit = async () => {
    await updateOnboardingData({ 
      isComplete: true,
      goldOn: parseFloat(GoldOn) || 0,
      silverOn: parseFloat(SilverOn) || 0
    });

    router.replace('/(tabs)');
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.content}>
        <Text style={[styles.title, { color: theme.colors.text }]}>Set Your Prices</Text>
        <Text style={[styles.subtitle, { color: theme.colors.secondaryText }]}>
          Enter your GoldOn and SilverOn values
        </Text>

        <View style={styles.form}>
          <View style={[styles.inputContainer, { backgroundColor: theme.colors.cardBackground }]}>
            <Gem size={20} color={theme.colors.gold} />
            <TextInput
              style={[styles.input, { color: theme.colors.text }]}
              placeholder="Enter GoldOn value"
              placeholderTextColor={theme.colors.secondaryText}
              value={GoldOn}
              onChangeText={(text) => setGoldOn(text)}
              keyboardType="numeric"
            />
          </View>

          <View style={[styles.inputContainer, { backgroundColor: theme.colors.cardBackground }]}>
            <Coins size={20} color={theme.colors.silver} />
            <TextInput
              style={[styles.input, { color: theme.colors.text }]}
              placeholder="Enter SilverOn value"
              placeholderTextColor={theme.colors.secondaryText}
              value={SilverOn}
              onChangeText={(text) => setSilverOn(text)}
              keyboardType="numeric"
            />
          </View>

          <TouchableOpacity
            style={[styles.button, { backgroundColor: theme.colors.primary }]}
            onPress={handleSubmit}
          >
            <Text style={styles.buttonText}>Start Tracking</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  content: {
    gap: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
  },
  form: {
    gap: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    padding: 16,
    gap: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  button: {
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});