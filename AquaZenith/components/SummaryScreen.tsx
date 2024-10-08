import React, { useState, useEffect } from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
  Button
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

import HealthDataComponent from './HealthDataComponent';
import HealthDataBoxComponent from './HealthDataBoxComponent';
import UserService from './UserService';
import ChatRecommend from './ChatRecommendComponent';


type SectionProps = PropsWithChildren<{
  title: string;
}>;

function SummaryScreen(): React.JSX.Element {
  const [isDataLoaded, setDataLoaded] = useState(false);
  const [loadedComponentsCount, setLoadedComponentsCount] = useState(0);
  const componentsToLoad = 4; // Assuming there are 4 HealthDataBoxComponent instances
  const [refreshKey, setRefreshKey] = useState(0);

  const handleComponentLoaded = () => {
    setLoadedComponentsCount(currentCount => currentCount + 1);
  };

  useEffect(() => {
    // Reset data loaded state when refreshKey changes
    setDataLoaded(false);
    setLoadedComponentsCount(0); // Reset the loaded components count on refresh
    }, [refreshKey]); // Reacting to changes in refreshKey to re-initialize component loading

  useEffect(() => {
    if (loadedComponentsCount === componentsToLoad) {
      setDataLoaded(true);
    }
  }, [loadedComponentsCount]);

  // Function to trigger refresh
  const refreshComponents = () => {
    setRefreshKey(prevKey => prevKey + 1); // Changing the key will cause components to re-render
  };


  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
    <SafeAreaView style={[backgroundStyle, { flex: 0, backgroundColor: '#FFFFFF' }]}>
    <ScrollView>
      <View style={styles.iphoneProMax}>
      <View style={styles.topLeftContainer}>
            <Text style={styles.helloText}>Hello,</Text>
            <Text style={styles.nameText}>{UserService.name}</Text>
          </View>
        <View style={styles.metricsContainer}>
          {/* Heart Rate */}
          <View style={[styles.metricCard, styles.cardHeartRate]}>
            <HealthDataBoxComponent key={`calories-${refreshKey}`} type='Calories' onLoaded={handleComponentLoaded}/>
          </View>

          {/* Exercise */}
          <View style={[styles.metricCard, styles.cardExercise]}>
            <HealthDataBoxComponent key={`exercise-${refreshKey}`} type='Exercise' onLoaded={handleComponentLoaded}/>
          </View>

          {/* Sleep */}
          <View style={[styles.metricCard, styles.cardSleep]}>
          <HealthDataBoxComponent key={`sleep-${refreshKey}`} type='Sleep' onLoaded={handleComponentLoaded}/>
          </View>

          {/* Hydration */}
          <View style={[styles.metricCard, styles.cardHydration]}>
          <HealthDataBoxComponent key={`hydration-${refreshKey}`} type='Hydration' onLoaded={handleComponentLoaded}/>
          </View>
          <Button title="Refresh Data" onPress={refreshComponents} />
        </View>
        {isDataLoaded && <ChatRecommend recommendationType='summary'/>}
      </View>

        </ScrollView>
      </SafeAreaView>
      </View>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iphoneProMax: {
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    padding: 20,
    width: '100%',
  },
  topLeftContainer: {
    alignSelf: 'flex-start', // Aligns this container to the start of the cross-axis (left, in this case)
    alignItems: 'flex-start', // Aligns children (Text) to the start of the cross-axis (left)
    width: '100%', // Ensures the container spans the full width of the parent
    paddingHorizontal: 20, // Optional: adds some horizontal padding
    paddingTop: 10, // Optional: adds some padding at the top
  },
  helloText: {
    fontSize: 30,
    fontWeight: '500',
    color: '#062828',
  },
  nameText: {
    fontSize: 48,
    fontWeight: '700',
    color: '#062828',
  },
  metricsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
  },
  metricCard: {
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    margin: 10,
    width: 150,
    height: 150,
  },
  cardHeartRate: {
    backgroundColor: '#D2416E20', // Using transparency for the background color
  },
  cardExercise: {
    backgroundColor: '#7042C820',
  },
  cardSleep: {
    backgroundColor: '#0CB1AD20',
  },
  cardHydration: {
    backgroundColor: '#197AD220',
  },
  icon: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  metricTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#062828',
  },
  metricValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#062828',
  },
  alertContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  alertIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  alertText: {
    fontSize: 14,
    color: '#062828',
    opacity: 0.7,
    flexShrink: 1, // Allows text to wrap in small containers
  },
});

export default SummaryScreen;