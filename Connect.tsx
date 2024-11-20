import React, { useState } from 'react';
import { View, StyleSheet, TextInput, ScrollView, ActivityIndicator, Image, Animated, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

interface Service {
  name: string;
  vicinity: string;
  image: string;
}

interface Job {
  title: string;
  company: string;
  location: string;
  image: string;
}

const Connect: React.FC = () => {
  const [zipcode, setZipcode] = useState('');
  const [healthServices, setHealthServices] = useState<Service[]>([]);
  const [otherResources, setOtherResources] = useState<Service[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const scaleValue = new Animated.Value(1);
  const navigation = useNavigation();

  const startPulsating = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleValue, {
          toValue: 1.1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(scaleValue, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  const generateMockData = (zipcode: string) => {
    const healthServices = [
      { name: `Veterans Affairs Oceanside - ${zipcode}`, vicinity: `1300 Rancho del Oro Dr, Oceanside, ${zipcode}`, image: require('../../assets/images/Oceanside VA Clinic.png') },
      { name: `Veterans Affairs Hospital VAMC San Diego - ${zipcode}`, vicinity: `3350 La Jolla Village Dr, San Diego, ${zipcode}`, image: require('../../assets/images/San Diego VA Medical Center.png') },
      { name: `Escondido VA Clinic - ${zipcode}`, vicinity: `815 E Pennsylvania Ave, Escondido, ${zipcode}`, image: require('../../assets/images/Sorrento Valley Clinic.png') },
    ];
    
    const otherResources = [
      { name: `Veterans Thrift Store Disabled American Veteran - ${zipcode}`, vicinity: `1624 S Coast Hwy, Oceanside, ${zipcode}`, image: require('../../assets/images/PXL_20210801_185247908.MP.png') },
      { name: `Veterans Memorial Park - ${zipcode}`, vicinity: `Intersection of Faraday Ave. and Cannon Rd, ${zipcode}`, image: require('../../assets/images/637957198773470000.png') },
      { name: `Veterans Association Of North County - ${zipcode}`, vicinity: `1617 Mission Ave, Oceanside, ${zipcode}`, image: require('../../assets/images/5fd349aae45c67302e7159a8_facility_1.png') },
    ];

    const jobs = [
      { title: 'Community Solutions Inbound Sales Representative', company: 'Unknown', location: `${zipcode} Sandiego, CA` },
      { title: 'Business Account Executive', company: 'Outside Sales', location: `${zipcode} Sandiego, CA`},
      { title: 'Retail Sales Specialist', company: 'Retail', location: `${zipcode} Sandiego, CA`},
      { title: 'Safety Specialist', company: 'Health/Safety', location: `${zipcode} Sandiego, CA`},
      { title: 'Human Resources Generalist', company: 'Human Resources', location: `${zipcode} Sandiego, CA`},
    ];

    return { healthServices, otherResources, jobs };
  };

  const fetchServices = async () => {
    setLoading(true);
    setError(null);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const { healthServices, otherResources, jobs } = generateMockData(zipcode);
      setHealthServices(healthServices);
      setOtherResources(otherResources);
      setJobs(jobs);
    } catch (err) {
      setError('Failed to fetch services. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient
      colors={['#041403', '#031402', '#041403']}
      style={styles.gradientBackground}
    >
      <ScrollView style={styles.container}>
      <ThemedText style={styles.title}></ThemedText>
        <ThemedText style={styles.title}>Connect</ThemedText>
        <TouchableOpacity 
          onPress={() => navigation.navigate('vmp')}
        >
          <LinearGradient 
            colors={['#000000', '#0a2e07', '#0a2e07']}
            start={{ x: 0, y: 2 }}
            end={{ x: 1, y: 0 }}
            style={[styles.serviceGradient]}
          >
            <View>
              <ThemedText>Below you'll type in your zipcode to gain access to all your local veteran resources.</ThemedText>
            </View>
          </LinearGradient>
          <View style={styles.buttonBorder} />
        </TouchableOpacity>
        
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            onChangeText={setZipcode}
            value={zipcode}
            placeholder="Enter zipcode"
            keyboardType="numeric"
          />
          <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
            <TouchableOpacity 
              style={styles.connectButton} 
              onPress={() => { fetchServices(); startPulsating(); }}
            >
              <ThemedText style={styles.connectButtonText}>Connect</ThemedText>
            </TouchableOpacity>
          </Animated.View>
        </View>

        {error && <ThemedText style={styles.error}>{error}</ThemedText>}
        
        {loading ? (
          <ActivityIndicator size="large" style={styles.loader} />
        ) : (
          <>
            <ServiceSection title="Health Services" services={healthServices} navigation={navigation} />
            <JobSection title="Jobs" jobs={jobs} navigation={navigation} />
            <ServiceSection title="Other Resources" services={otherResources} navigation={navigation} />
          </>
        )}
      </ScrollView>
    </LinearGradient>
  );
};

const ServiceSection = ({ title, services, navigation }) => (
  <View style={styles.section}>
    <ThemedText style={styles.sectionTitle}>{title}</ThemedText>
    {services.length > 0 ? (
      services.map((service, index) => (
        <TouchableOpacity 
          key={index} 
          style={[styles.serviceItem]} 
          onPress={() => navigation.navigate('vmp')}
        >
          <LinearGradient 
            colors={['#000000', '#0a2e07', '#0a2e07']}
            start={{ x: 0, y: 2 }}
            end={{ x: 1, y: 0 }}
            style={[styles.serviceGradient]}
          >
            <Image source={{ uri: service.image }} style={styles.serviceImage} />
            <View style={styles.serviceInfo}>
              <ThemedText style={[styles.serviceName]}>{service.name}</ThemedText>
              <ThemedText style={[styles.serviceVicinity]}>{service.vicinity}</ThemedText>
            </View>
          </LinearGradient>
          <View style={styles.buttonBorder} />
        </TouchableOpacity>
      ))
    ) : (
      <ThemedText style={styles.noDataText}>No data available yet.</ThemedText>
    )}
  </View>
);

const JobSection = ({ title, jobs, navigation }) => (
  <View style={styles.section}>
    <ThemedText style={styles.sectionTitle}>{title}</ThemedText>
    {jobs.length > 0 ? (
      jobs.map((job, index) => (
        <TouchableOpacity 
          key={index} 
          style={[styles.serviceItem]} 
          onPress={() => navigation.navigate('vmp')}
        >
          <LinearGradient 
            colors={['#000000', '#0a2e07', '#0a2e07']}
            start={{ x: 0, y: 2 }}
            end={{ x: 1, y: 0 }}
            style={[styles.serviceGradient]}
          >
            <Image source={{ uri: job.image }} style={styles.serviceImage} />
            <View style={styles.serviceInfo}>
              <ThemedText style={[styles.serviceName]}>{job.title}</ThemedText>
              <ThemedText style={[styles.serviceVicinity]}>{job.company}</ThemedText>
              <ThemedText style={[styles.serviceVicinity]}>{job.location}</ThemedText>
            </View>
          </LinearGradient>
          <View style={styles.buttonBorder} />
        </TouchableOpacity>
      ))
    ) : (
      <ThemedText style={styles.noDataText}>No jobs available at the moment.</ThemedText>
    )}
  </View>
);

const styles = StyleSheet.create({
  gradientBackground: {
    flex: 1,
  },
  container:{
     flex :1,
     paddingVertical :20,
     paddingHorizontal :20,
   },
   title:{
     fontSize :24,
     fontWeight :'bold',
     marginBottom :20,
     color:'#FFFFFF',
   },
   inputContainer:{
     marginBottom :20,
   },
   input:{
     height :50,
     borderColor :'#0a2e07',
     borderWidth :1,
     marginBottom :10,
     paddingHorizontal :10,
     backgroundColor :'#FFFFFF',
     borderRadius :5,
   },
   error:{
     color:'#FF6B6B',
     marginTop :10,
   },
   loader:{
     marginTop :20,
   },
   section:{
     marginTop :20,
   },
   sectionTitle:{
     fontSize :18,
     fontWeight :'bold',
     marginBottom :10,
     color:'#FFFFFF',
   },
   serviceItem:{
     marginBottom :15,
   },
   serviceGradient:{
     flexDirection :'row',
     alignItems :'center',
     borderRadius :10,
     padding :10,
   },
   serviceImage:{
     width :50,
     height :50,
     borderRadius :100,
     marginRight :10,
   },
   serviceInfo:{
     flex :1,
   },
   serviceName:{
     fontWeight :'bold',
     color:'#FFFFFF',
   },
   serviceVicinity:{
     color:'#FFFFFF',
   },
   noDataText:{
     color:'#FFFFFF',
     fontStyle :'italic',
   },
   connectButton:{
     backgroundColor:'#FFFFFF',
     borderRadius:5,
     paddingVertical:10,
     paddingHorizontal:15,
   },
   connectButtonText:{
       color:'#000000',
       fontSize :18,
       textAlign:'center',
       fontWeight:'bold'
   },
   buttonBorder:{
       position:'absolute',
       top:-2,
       left:-2,
       right:-2,
       bottom:-2,
       borderWidth:2,
       borderColor:'#0a2e07',
       borderRadius:10
   }
});

export default Connect;