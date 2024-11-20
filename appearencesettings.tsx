import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ThemedText } from '@/components/ThemedText';
import Ionicons from '@expo/vector-icons/Ionicons';

const AppearanceSettings: React.FC = () => {
  const [theme, setTheme] = useState('dark'); // Default theme
  const [fontSize, setFontSize] = useState(16); // Default font size

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
    Alert.alert(`Theme changed to ${theme === 'light' ? 'Dark' : 'Light'} mode`);
  };

  const increaseFontSize = () => {
    setFontSize(prevSize => prevSize + 2);
  };

  const decreaseFontSize = () => {
    setFontSize(prevSize => (prevSize > 12 ? prevSize - 2 : prevSize)); // Prevent font size from going below 12
  };

  return (
    <LinearGradient
      colors={['#041403', '#0a2e07', '#041403']}
      style={styles.gradientBackground}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Ionicons 
            name="arrow-back" 
            size={24} 
            color="#FFFFFF" 
            onPress={() => {/* Add navigation logic here */}} 
            style={styles.backButton}
          />
          <ThemedText style={styles.title}>Appearance Settings</ThemedText>
        </View>

        <TouchableOpacity style={styles.button} onPress={toggleTheme}>
          <ThemedText style={styles.buttonText}>Toggle Theme: {theme}</ThemedText>
          <Ionicons name="chevron-forward" size={20} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={increaseFontSize}>
          <ThemedText style={styles.buttonText}>Font Size</ThemedText>
          <Ionicons name="chevron-forward" size={20} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={decreaseFontSize}>
          <ThemedText style={styles.buttonText}>Widgets</ThemedText>
          <Ionicons name="chevron-forward" size={20} color="#fff" />
        </TouchableOpacity>

        <ThemedText style={[styles.sampleText, { fontSize }]}>
          Sample text with current font size: {fontSize}
        </ThemedText>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradientBackground: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    marginRight: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
    backgroundColor: '#0a2e07', // Button background color
    borderRadius: 10,
    marginBottom: 10,
  },
  buttonText: {
    color: '#FFFFFF', // Text color for the buttons
    fontSize: 18,
  },
  sampleText: {
    marginTop: 20,
    color: '#FFFFFF',
    textAlign: 'center',
  },
});

export default AppearanceSettings;