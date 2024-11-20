import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function TermsAndConditions() {
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
        <ThemedText style={styles.title}>Terms and Conditions</ThemedText>
      </View>
      <ScrollView style={styles.scrollView}>
        <ThemedText style={styles.text}>
          Last updated: [Date]

          Please read these Terms and Conditions ("Terms", "Terms and Conditions") carefully before using the [Your App Name] mobile application (the "Service") operated by [Your Company Name] ("us", "we", or "our").

          Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users and others who access or use the Service.

          By accessing or using the Service you agree to be bound by these Terms. If you disagree with any part of the terms then you may not access the Service.

          Accounts

          When you create an account with us...

          Content

          Our Service allows you to post...

          Links To Other Web Sites

          Our Service may contain links to third-party web sites...

          Termination

          We may terminate or suspend access to our Service immediately...

          Governing Law

          These Terms shall be governed and construed in accordance with the laws of [Your Country]...

          Changes

          We reserve the right, at our sole discretion, to modify or replace these Terms at any time...

          Contact Us

           If you have any questions about these Terms...
        </ThemedText>
      </ScrollView>
    </ThemedView>
   );
}

const styles = StyleSheet.create({
   container:{
     flex :1,
   },
   header:{
     flexDirection:'row',
     alignItems:'center',
     padding :16,
     borderBottomWidth :1,
     borderBottomColor :'#ccc',
   },
   backButton:{
     marginRight :16,
   },
   title:{
     fontSize :20,
     fontWeight :'bold',
   },
   scrollView:{
     flex :1,
     padding :16,
   },
   text:{
     fontSize :16,
     lineHeight :24,
   },
});