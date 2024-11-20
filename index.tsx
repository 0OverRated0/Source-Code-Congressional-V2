import React from 'react';
import { Image, StyleSheet, View, ImageSourcePropType } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient';
import healthImage from '@/assets/images/health-8-512.png';
import jobsImage from '@/assets/images/portfolio.png';
import resourcesImage from '@/assets/images/support.png';

interface GradientButtonProps {
  onPress: () => void;
  icon: ImageSourcePropType;
  text: string;
  colors: string[];
  whiteButtonPress: () => void;
}

const GradientButton: React.FC<GradientButtonProps> = ({ onPress, icon, text, colors, whiteButtonPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.buttonContainer}>
    <LinearGradient
      colors={colors}
      style={[styles.menuButton, styles.buttonBorder]}
      start={{ x: 0, y: 2 }}
      end={{ x: 1, y: 0 }}
    >
      <Image source={icon} style={styles.icon} />
      <ThemedText style={styles.buttonText}>{text}</ThemedText>
      
      <TouchableOpacity style={styles.whiteButton} onPress={whiteButtonPress}>
        <ThemedText style={styles.whiteButtonText}>Go now</ThemedText>
        <Ionicons name="arrow-forward" size={16} color="#000" style={styles.arrowIcon} />
      </TouchableOpacity>
    </LinearGradient>
  </TouchableOpacity>
);

export default function HomeScreen() {
  const navigation = useNavigation();

  const [fontsLoaded] = useFonts({
    'SpaceMono-Regular': require('@/assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <LinearGradient
      colors={['#4c669f', '#3b5998', '#192f6a']}
      style={styles.gradientBackground}
    >
      <ParallaxScrollView
        headerBackgroundColor="transparent"
        headerImage={
          <Image
            source={require('@/assets/images/adaptive-icon.png')}
            style={styles.reactLogo}
          />
        }
        style={styles.parallaxView}
      >
        <ThemedView style={styles.headerContainer}>
          <Image
            source={require('@/assets/images/1.png')}
            style={styles.reactLogo}
          />

          <TouchableOpacity 
            style={styles.notificationButton} 
            onPress={() => navigation.navigate('Notifications')}
          >
            <Ionicons name="notifications" size={24} color='#FFFFFF' />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.helpButton} 
            onPress={() => navigation.navigate('Assistance')}
          >
            <Ionicons name="help-circle-outline" size={24} color='#FFFFFF' />
          </TouchableOpacity>
        </ThemedView>

        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title" style={styles.welcomeText}>Welcome, Advaith</ThemedText>
        </ThemedView>
        <View style={styles.divider} />
        
        <ThemedView style={styles.quickAccessContainer}>
          <ThemedText type="title" style={styles.menuTitle}>Quick Access</ThemedText>
          
          
          <View style={styles.buttonRow}>
            <GradientButton 
              onPress={() => navigation.navigate('Connect', { section: 'health' })}
              whiteButtonPress={() => navigation.navigate('Connect', { section: 'health' })}
              icon={healthImage}
              text="Health Services"
              colors={['#000000', '#0a2e07']}
            />
            <GradientButton 
              onPress={() => navigation.navigate('Connect', { section: 'jobs' })}
              whiteButtonPress={() => navigation.navigate('Connect', { section: 'jobs' })}
              icon={jobsImage}
              text="Job Support"
              colors={['#000000', '#0a2e07']}
            />
            <GradientButton 
              onPress={() => navigation.navigate('Connect', { section: 'resources' })}
              whiteButtonPress={() => navigation.navigate('Connect', { section: 'resources' })}
              icon={resourcesImage}
              text="Other Resources"
              colors={['#000000', '#0a2e07']}
            />
          </View>

          <TouchableOpacity 
  onPress={() => navigation.navigate('VetBot')}
  style={styles.vetBotButtonContainer}
>
  <LinearGradient
    colors={['#000000', '#0a2e07']}
    style={styles.vetBotButton}
    start={{ x: 0, y: 1.5 }}
      end={{ x: 0.5, y: 0 }}
  >
    <View style={styles.vetBotContent}>
      <ThemedText style={styles.vetBotButtonText}>VetBot</ThemedText>
      <ThemedText style={styles.vetBotDescription}>
        Click to access VetBot, your very own Veteran Assistance pal!
      </ThemedText>
    </View>
    <View style={styles.circularButtonContainer}>
      <TouchableOpacity onPress={() => navigation.navigate('VetBot')} style={styles.circularButton}>
        <Ionicons name="arrow-forward" size={16} color="#000000" />
      </TouchableOpacity>
    </View>
  </LinearGradient>
</TouchableOpacity>
<TouchableOpacity 
  onPress={() => navigation.navigate('TermsAndConditions')}
  style={styles.vetBotButtonContainer}
>
  <LinearGradient
    colors={['#5c080c', '#0a2e07']}
    style={styles.vetBotButton}
    start={{ x: 0, y: 1.5 }}
      end={{ x: 0.5, y: 0 }}
  >
    <View style={styles.vetBotContent}>
      <ThemedText style={styles.vetBotButtonText}>Emergency Assistance</ThemedText>
      <ThemedText style={styles.vetBotDescription}>
        If you are having an emergency, this source will contact help right away using your medical profile.
      </ThemedText>
    </View>
    <View style={styles.circularButtonContainer}>
      <TouchableOpacity onPress={() => navigation.navigate('TermsAndConditions')} style={styles.circularButton}>
        <Ionicons name="arrow-forward" size={16} color="#5c080c" />
      </TouchableOpacity>
    </View>
  </LinearGradient>
</TouchableOpacity>
          
          
        </ThemedView>
      </ParallaxScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradientBackground: {
    flex: 1,
  },
  parallaxView: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: 'transparent',
  },
  reactLogo: {
    height: 70,
    width: 70,
    marginHorizontal: -40,
  },
  notificationButton: {
    marginLeft: 270,
  },
  helpButton: {
    marginLeft: 10,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 20,
    backgroundColor: 'transparent',
  },
  welcomeText: {
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontSize: 24,
  },
  quickAccessContainer: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    backgroundColor: 'transparent',
  },
  menuTitle: {
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontSize: 20,
    marginBottom: 15,
  },
  divider: {
    height: 1,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 10,
    marginVertical: 15,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonContainer: {
    flexGrow: 1,
    marginHorizontal: 5,
  },
  menuButton: {
    borderRadius: 10,
    paddingVertical: 75,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: 60,
  },
  buttonText: {
    textAlign: 'center',
    position: 'absolute',
    bottom: 50,
    color: '#FFFFFF',
    fontWeight: '400',
    fontSize: 9.1,
    letterSpacing: 1,
  },
  icon: {
    height: 30,
    width: 30,
    position: 'absolute',
    top: 15,
    left: '54%',
    transform: [{ translateX: -20 }],
  },
  whiteButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 10,
    position: 'absolute',
    bottom: 5,
    right: 11,
    flexDirection: 'row',
    alignItems: 'center'
  },
  whiteButtonText: {
    color: '#000',
    fontWeight: '400',
    fontSize: 10,
  },
  arrowIcon: {
    marginLeft: 3,
  },
  vetBotButtonContainer: {
    marginTop: 15,
  },
  vetBotButton: {
    borderRadius: 10,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  vetBotContent: {
    flex: 1,
  },
  vetBotButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 5,
  },
  vetBotDescription: {
    color: '#FFFFFF',
    fontSize: 12,
  },
  circularButtonContainer: {
    marginLeft: 10,
  },
  circularButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonBorder: {
    borderWidth: 3,
    borderColor: '#0a2e07',
  },
});