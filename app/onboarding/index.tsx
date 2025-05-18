import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput,Image, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { useTheme } from '@/context/ThemeContext';
import { useOnboarding } from '@/context/OnboardingContext';
import { Phone, MapPin,User, Store } from 'lucide-react-native';
import { saveUser } from '@/services/appwrite';


export default function OnboardingScreen() {
  const { theme } = useTheme();
  const { onboardingData, updateOnboardingData, isLoading } = useOnboarding();
  const [PhoneNumber, setPhoneNumber] = useState(String);
  const [City, setCity] = useState(String)
  const [Name, setName] = useState(String)
  const [ShopName, setShopName] = useState(String)

  useEffect(() => {
    if (!isLoading && onboardingData.isComplete && onboardingData.phoneNumber) {
      router.replace('/(tabs)');
    }
  }, [isLoading, onboardingData.isComplete, onboardingData.phoneNumber]);

  const handleSubmit = async () => {
    if (PhoneNumber && City) {
      
      await saveUser(PhoneNumber, City,Name,ShopName); 

      updateOnboardingData({
        phoneNumber: PhoneNumber,
        city: City,
        name: Name,
        shopName: ShopName,
        isComplete: true
      });
      // router.push('/onboarding/pricing');
      router.replace('/(tabs)');
    }
  };


  

  if (isLoading) {
    return null;
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.logoContainer}>
        {/* <Text style={[styles.logo, { color: theme.colors.gold }]}></Text> */}
        <Image
          source={require('./../../assets/images/icon.png')} // Replace with your logo path
          style={[styles.logo, { width: 150,height: 150 }]} // Adjust the size as needed
        />
        <Text style={[styles.title, { color: theme.colors.text }]}>Welcome</Text>
      </View>

      <View style={styles.form}>
        <View style={[styles.inputContainer, { backgroundColor: theme.colors.cardBackground }]}>
          <Phone size={20} color={theme.colors.gold} />
          <TextInput
            style={[styles.input, { color: theme.colors.text }]}
            placeholder="Enter phone number"
            placeholderTextColor={theme.colors.secondaryText}
            value={PhoneNumber}
            onChangeText={(text) => setPhoneNumber(text)}
            keyboardType="phone-pad"
          />
        </View>

        <View style={[styles.inputContainer, { backgroundColor: theme.colors.cardBackground }]}>
          <MapPin size={20} color={theme.colors.silver} />
          <TextInput
            style={[styles.input, { color: theme.colors.text }]}
            placeholder="Enter city"
            placeholderTextColor={theme.colors.secondaryText}
            value={City}
            onChangeText={(text) =>setCity(text)}
          />
        </View>

        <View style={[styles.inputContainer, { backgroundColor: theme.colors.cardBackground }]}>
          <User size={20} color={theme.colors.silver} />
          <TextInput
            style={[styles.input, { color: theme.colors.text }]}
            placeholder="Enter your name"
            placeholderTextColor={theme.colors.secondaryText}
            value={Name}
            onChangeText={(text) =>setName(text)}
          />
        </View>

        <View style={[styles.inputContainer, { backgroundColor: theme.colors.cardBackground }]}>
          <Store size={20} color={theme.colors.silver} />
          <TextInput
            style={[styles.input, { color: theme.colors.text }]}
            placeholder="Enter your shop name"
            placeholderTextColor={theme.colors.secondaryText}
            value={ShopName}
            onChangeText={(text) =>setShopName(text)}
          />
        </View>

        <TouchableOpacity
          style={[
            styles.button,
            { backgroundColor: theme.colors.primary },
            (!PhoneNumber || !City) && styles.buttonDisabled
          ]}
          onPress={handleSubmit}
          disabled={!PhoneNumber || !City}
        >
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
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
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
    marginTop: -150,
  },
  logo: {
    fontSize: 48,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
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
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});