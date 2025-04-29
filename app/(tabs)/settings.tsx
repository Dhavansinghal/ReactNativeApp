import { View, Text, StyleSheet, Switch, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/context/ThemeContext';
import Header from '@/components/Header';
import { Bell, Globe, DollarSign, RefreshCw, CircleHelp as HelpCircle, Info } from 'lucide-react-native';

export default function SettingsScreen() {
  const { theme, toggleTheme } = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Header title="Settings" />
      
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Display
          </Text>
          
          <View style={[styles.settingItem, { backgroundColor: theme.colors.cardBackground }]}>
            <Text style={[styles.settingLabel, { color: theme.colors.text }]}>Dark Mode</Text>
            <Switch
              value={true}
              onValueChange={toggleTheme}
              trackColor={{ false: '#767577', true: theme.colors.primary }}
              thumbColor="#f4f3f4"
            />
          </View>
          
          <View style={[styles.settingItem, { backgroundColor: theme.colors.cardBackground }]}>
            <Text style={[styles.settingLabel, { color: theme.colors.text }]}>Auto-refresh Interval</Text>
            <View style={styles.valueContainer}>
              <Text style={[styles.valueText, { color: theme.colors.secondaryText }]}>5s</Text>
              <RefreshCw size={18} color={theme.colors.secondaryText} />
            </View>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Preferences
          </Text>
          
          <View style={[styles.settingItem, { backgroundColor: theme.colors.cardBackground }]}>
            <Text style={[styles.settingLabel, { color: theme.colors.text }]}>Currency</Text>
            <View style={styles.valueContainer}>
              <Text style={[styles.valueText, { color: theme.colors.secondaryText }]}>USD</Text>
              <DollarSign size={18} color={theme.colors.secondaryText} />
            </View>
          </View>
          
          <View style={[styles.settingItem, { backgroundColor: theme.colors.cardBackground }]}>
            <Text style={[styles.settingLabel, { color: theme.colors.text }]}>Weight Unit</Text>
            <View style={styles.valueContainer}>
              <Text style={[styles.valueText, { color: theme.colors.secondaryText }]}>Troy oz</Text>
              <Globe size={18} color={theme.colors.secondaryText} />
            </View>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Notifications
          </Text>
          
          <View style={[styles.settingItem, { backgroundColor: theme.colors.cardBackground }]}>
            <Text style={[styles.settingLabel, { color: theme.colors.text }]}>Price Alerts</Text>
            <View style={styles.valueContainer}>
              <Bell size={18} color={theme.colors.secondaryText} />
            </View>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            About
          </Text>
          
          <TouchableOpacity style={[styles.settingItem, { backgroundColor: theme.colors.cardBackground }]}>
            <Text style={[styles.settingLabel, { color: theme.colors.text }]}>About this App</Text>
            <Info size={18} color={theme.colors.secondaryText} />
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.settingItem, { backgroundColor: theme.colors.cardBackground }]}>
            <Text style={[styles.settingLabel, { color: theme.colors.text }]}>Help & Support</Text>
            <HelpCircle size={18} color={theme.colors.secondaryText} />
          </TouchableOpacity>
        </View>
        
        <Text style={[styles.version, { color: theme.colors.secondaryText }]}>
          Version 1.0.0
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 40,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
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
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  valueText: {
    marginRight: 8,
    fontSize: 14,
  },
  version: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 14,
  },
});