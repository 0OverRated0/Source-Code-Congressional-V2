import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, View, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useAuth } from '../context/AuthContext';

type RootStackParamList = {
  PrivacyPolicy: undefined;
  TermsAndConditions: undefined;
  profile: undefined;
  appearencesettings: undefined;
};

export default function SettingsScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { logout, deleteAccount, isAuthenticated } = useAuth();

  const showPrivacyPolicy = () => {
    navigation.navigate('PrivacyPolicy');
  };

  const showTermsAndConditions = () => {
    navigation.navigate('TermsAndConditions');
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      "Delete Account",
      "Are you sure you want to delete your account? This action cannot be undone.",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { 
          text: "Delete", 
          onPress: () => {
            if (deleteAccount) {
              deleteAccount();
            } else {
              console.warn('Delete account function not implemented');
            }
          },
          style: "destructive"
        }
      ]
    );
  };

  return (
    <LinearGradient
      colors={['#041403', '#0a2e07', '#041403']}
      style={styles.gradientBackground}
    >
      <ParallaxScrollView
        headerBackgroundColor={{ dark: 'transparent', light: 'transparent' }}
        headerImage={<Ionicons size={24} name="code-slash" style={styles.headerImage} />}
      >
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title" style={styles.titleText}>Settings</ThemedText>
        </ThemedView>

        {/* Profile Button */}
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => navigation.navigate('profile')}
        >
          <ThemedText style={styles.buttonText}>My Profile</ThemedText>
          <Ionicons name="chevron-forward" size={20} color="#fff" />
        </TouchableOpacity>

        {/* Appearance Settings Button */}
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('appearencesettings')}>
          <ThemedText style={styles.buttonText}>Appearance Settings</ThemedText>
          <Ionicons name="chevron-forward" size={20} color="#fff" />
        </TouchableOpacity>

        {/* Additional Buttons */}
        <TouchableOpacity style={styles.button}>
          <ThemedText style={styles.buttonText}>Share App</ThemedText>
          <Ionicons name="chevron-forward" size={20} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity onPress={showPrivacyPolicy} style={styles.button}>
          <ThemedText style={styles.buttonText}>Privacy Policy</ThemedText>
          <Ionicons name="chevron-forward" size={20} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity onPress={showTermsAndConditions} style={styles.button}>
          <ThemedText style={styles.buttonText}>Terms and Conditions</ThemedText>
          <Ionicons name="chevron-forward" size={20} color="#fff" />
        </TouchableOpacity>

        {isAuthenticated && (
          <Collapsible title="Account Actions">
            <TouchableOpacity onPress={logout} style={[styles.button]}>
              <ThemedText style={styles.buttonText}>Logout</ThemedText>
              <Ionicons name="chevron-forward" size={20} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleDeleteAccount} style={[styles.button, styles.deleteButton]}>
              <ThemedText style={[styles.deleteButtonText]}>Delete Account</ThemedText>
              <Ionicons name="chevron-forward" size={20} color="#fff" />
            </TouchableOpacity>
          </Collapsible>
        )}
      </ParallaxScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradientBackground: {
    flex: 1,
  },
  headerImage: {
    color: '#FFFFFF',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 20,
  },
  titleText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
    backgroundColor: '#0a2e07',
    borderRadius: 10,
    marginBottom: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
  deleteButton: {
    backgroundColor: '#4a0f0f',
  },
  deleteButtonText: {
    color: '#ff4444',
  },
});
