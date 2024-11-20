import React from 'react';
import { StyleSheet, View, TouchableOpacity, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function NotificationsScreen() {
  const navigation = useNavigation();

  const Header = () => (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="#000000" />
      </TouchableOpacity>
      <ThemedText type="title" style={styles.headerTitle}>Notifications</ThemedText>
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
            <ThemedText type="title">Notifications</ThemedText>
          </ThemedView>
          <View style={styles.divider} />
          <Collapsible title="New">
            <ThemedText>
              Link to another page
            </ThemedText>
            <ExternalLink href="https://docs.expo.dev/router/introduction">
              <ThemedText type="link">Zlo</ThemedText>
            </ExternalLink>
          </Collapsible>
          <Collapsible title="Old">
            <ThemedText>
              Link to another page
            </ThemedText>
            <ExternalLink href="https://docs.expo.dev/router/introduction">
              <ThemedText type="link">Zlo</ThemedText>
            </ExternalLink>
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
    paddingTop: 60, // to account for the fixed header
  },
  headerImage: {
    color: '#000000',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 10,
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});