import React from 'react';
import { StyleSheet, View, TouchableOpacity, SafeAreaView } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Collapsible } from '@/components/Collapsible';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { RootStackParamList } from './navigation/types';

export default function AssistanceScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const openVetBot = () => {
    navigation.navigate('VetBot');
  };

  const Header = () => (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="#000000" />
      </TouchableOpacity>
      <ThemedText type="title" style={styles.headerTitle}>Assistance</ThemedText>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <ParallaxScrollView
        headerBackgroundColor={{ light: '#FFFFFF', dark: '#353636' }}
        headerImage={<Ionicons size={24} name="code-slash" style={styles.headerImage} />}
      >
        <View style={styles.scrollViewContent}>
          <ThemedView style={styles.titleContainer}>
            <ThemedText type="title">Assistance</ThemedText>
          </ThemedView>
          <View style={styles.divider} />
          {/* Rest of your content */}
          <Collapsible title="FAQ">
            {/* ... (Your existing FAQ content) ... */}
          </Collapsible>
          
          <Collapsible title="AI Assistance">
            {/* ... (Your existing AI Assistance content) ... */}
            <TouchableOpacity onPress={openVetBot} style={styles.vetBotButton}>
              <ThemedText type="link">Open VetBot Assistant</ThemedText>
            </TouchableOpacity>
          </Collapsible>
        </View>
      </ParallaxScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    height: 60,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  backButton: {
    padding: 10,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    marginRight: 40, // to offset the back button and center the title
  },
  scrollViewContent: {
    paddingTop: 20, // Reduced from 60 to 20 since we now have a separate header
  },
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 10,
  },
  vetBotButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    alignItems: 'center',
  },
});