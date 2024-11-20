import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function PrivacyPolicy() {
  const navigation = useNavigation();

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <Ionicons 
          name="arrow-back" 
          size={24} 
          color="#000" 
          onPress={() => navigation.goBack()} 
          style={styles.backButton}
        />
        <ThemedText style={styles.title}>Privacy Policy</ThemedText>
      </View>
      <ScrollView style={styles.scrollView}>
        <ThemedText>
          Last updated: [Date]

          [Your App Name] ("us", "we", or "our") operates the [Your App Name] mobile application (the "Service").

          This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data.

          Information Collection and Use

          We collect several different types of information for various purposes to provide and improve our Service to you.

          Types of Data Collected:

          • Personal Data...

          • Usage Data...

          Use of Data

          [Your App Name] uses the collected data for various purposes...

          Changes to This Privacy Policy

          We may update our Privacy Policy from time to time...

          Contact Us

          If you have any questions about this Privacy Policy, please contact us...
        </ThemedText>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  backButton: {
    marginRight: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
});
