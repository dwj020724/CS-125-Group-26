import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

import HealthDataComponent from './HealthDataComponent';


type SectionProps = PropsWithChildren<{
  title: string;
}>;

// function Section({children, title}: SectionProps): React.JSX.Element {
//   const isDarkMode = useColorScheme() === 'dark';
//   return (
//     <View style={styles.sectionContainer}>
//       <Text
//         style={[
//           styles.sectionTitle,
//           {
//             color: isDarkMode ? Colors.white : Colors.black,
//           },
//         ]}>
//         {title}
//       </Text>
//       <Text
//         style={[
//           styles.sectionDescription,
//           {
//             color: isDarkMode ? Colors.light : Colors.dark,
//           },
//         ]}>
//         {children}
//       </Text>
//     </View>
//   );
// }

function SummaryScreen(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
    <SafeAreaView style={[backgroundStyle, { flex: 0, backgroundColor: '#FFFFFF' }]}>

        {/* <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        /> */}
        <ScrollView>
          {/* <ScrollView contentContainerStyle={styles.container}> */}
          {/* <View
            style={{
              backgroundColor: isDarkMode ? Colors.black : Colors.white,
            }}>
            <Section title="Activity">
              <HealthDataComponent/>
            </Section>
            <Section title="Sleep">
              Get data from health app and display it <Text style={styles.highlight}>here</Text>.
            </Section>
            <Section title="Water">
              Get data from health app and display it <Text style={styles.highlight}>here</Text>.
            </Section>
          </View> */}
      <View style={styles.iphoneProMax}>
      <View style={styles.topLeftContainer}>
            <Text style={styles.helloText}>Hello,</Text>
            <Text style={styles.nameText}>Chris</Text>
          </View>
        <View style={styles.alertContainer}>
          <Image style={styles.alertIcon} source={require('../alertimage.png')} />
          <Text style={styles.alertText}>
            You haven’t checked out the app recently. Do some workouts.
          </Text>
        </View>
        <View style={styles.metricsContainer}>
          {/* Heart Rate */}
          <View style={[styles.metricCard, styles.cardHeartRate]}>
            {/* <Image style={styles.icon} source={require('./path/to/your/heart_icon.png')} /> */}
            <Text style={styles.metricTitle}>Heart Rate</Text>
            <Text style={styles.metricValue}>78 bpm</Text>
          </View>

          {/* Exercise */}
          <View style={[styles.metricCard, styles.cardExercise]}>
            {/* <Image style={styles.icon} source={require('./path/to/your/exercise_icon.png')} /> */}
            <Text style={styles.metricTitle}>Exercise</Text>
            <Text style={styles.metricValue}>300 cal</Text>
          </View>

          {/* Sleep */}
          <View style={[styles.metricCard, styles.cardSleep]}>
            <Text style={styles.metricTitle}>Sleep</Text>
            <Text style={styles.metricValue}>8 hrs</Text>
          </View>

          {/* Hydration */}
          <View style={[styles.metricCard, styles.cardHydration]}>
            {/* <Image style={styles.icon} source={require('./path/to/your/hydration_icon.png')} /> */}
            <Text style={styles.metricTitle}>Hydration</Text>
            <Text style={styles.metricValue}>1000 mL</Text>
          </View>
        </View>

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