import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
  const navigation = useNavigation();
  
  const [displayName, setDisplayName] = useState('Advaith Akella'); // Default display name
  const [email, setEmail] = useState('advaith@example.com'); // Default email
  const [phoneNumber, setPhoneNumber] = useState('123-456-7890'); // Default phone number
  const [age, setAge] = useState('30'); // Default age
  const [zipcode, setZipcode] = useState('92010'); // Default zipcode

  const handleDeleteAccount = () => {
    // Add your delete account functionality here
    alert("Account deleted!");
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <Ionicons 
          name="arrow-back" 
          size={24} 
          color="#fff" // Changed to white
          onPress={() => navigation.goBack()} 
          style={styles.backButton}
        />
        <ThemedText style={styles.title}>My Profile</ThemedText>
        <Ionicons 
          name="create-outline" 
          size={24} 
          color="#fff" // Changed to white
          onPress={() => {/* Add edit functionality here */}} 
          style={styles.editButton}
        />
      </View>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <ThemedText style={styles.label}>Display Name:</ThemedText>
        <TextInput
          style={styles.input}
          value={displayName}
          onChangeText={setDisplayName}
        />

        <ThemedText style={styles.label}>Email:</ThemedText>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />

        <ThemedText style={styles.label}>Phone Number:</ThemedText>
        <TextInput
          style={styles.input}
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />

        <ThemedText style={styles.label}>Age:</ThemedText>
        <TextInput
          style={styles.input}
          value={age}
          onChangeText={setAge}
          keyboardType="numeric"
        />

        <ThemedText style={styles.label}>Zipcode:</ThemedText>
        <TextInput
          style={styles.input}
          value={zipcode} // Default value set to '92010'
          onChangeText={setZipcode}
          keyboardType="numeric"
        />

        {/* Delete Account Button */}
        <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteAccount}>
          <ThemedText style={styles.deleteButtonText}>Delete Account</ThemedText>
        </TouchableOpacity>
      </ScrollView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#000', // Optional: Set background color to enhance contrast
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  backButton: {
    marginRight: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    flex: 1,
    color: '#fff', // Changed to white
  },
  editButton: {
    marginLeft: 'auto', // Aligns the edit button to the right
  },
  scrollView: {
    flexGrow: 1,
    paddingVertical: 10,
  },
  label: {
    fontWeight: 'bold',
    marginTop: 10,
    color: '#fff', // Changed to white
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  deleteButton: {
    backgroundColor: '#ff4d4d', // Red background for delete button
    borderRadius: 5,
    paddingVertical: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  deleteButtonText: {
    color: '#fff', // White text for delete button
    fontWeight: 'bold',
  },
});

export default ProfileScreen;