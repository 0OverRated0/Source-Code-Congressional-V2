import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import MapView, { Marker } from 'react-native-maps';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  Vmp: undefined;
};

const Vmp = ({ navigation }: { navigation: NativeStackNavigationProp<RootStackParamList> }) => {
  return (
    <LinearGradient
      colors={['#041403', '#0a2e07', '#041403']}
      style={styles.container}
    >
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>

      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 33.1391, // Latitude for Veterans Memorial Park
          longitude: -117.3235, // Longitude for Veterans Memorial Park
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker
          coordinate={{ latitude: 33.1391, longitude: -117.3235 }}
          title="Veterans Memorial Park"
          description="A beautiful park in Carlsbad."
        />
      </MapView>
      
      <Text style={styles.title}>Veterans Memorial Park</Text>
      <Text style={styles.info}>
        The City of Carlsbad has developed a conceptual master plan for its next community park.
        The Veterans Memorial Park site is located on 93.7 acres, near the intersection of Faraday Avenue and Cannon Road.
        Over half of the land will remain as undisturbed habitat.
        Based on public input gathered throughout the planning process, the city has developed the Veterans Memorial Park Master Plan Report. 
        The park will be physically separated into two distinct areas (north and south) which transition through passive uses and open space to a prominent public art element at the high point of the site.
        The north side will be accessed via a primary park entrance on Faraday Avenue and via a neighborhood trail on Whitman Way.
        Access to the south side of the park will be located near the underpass at Faraday Avenue.
      </Text>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    backgroundColor: '#0a2e07',
    borderRadius: 5,
    padding: 10,
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginVertical: 20,
  },
  info: {
    color: '#FFFFFF',
    paddingHorizontal: 20,
    textAlign: 'center',
    marginBottom: 20,
  },
  map: {
    width: '100%',
    height: '60%', // Adjust height as needed
  },
});

export default Vmp;