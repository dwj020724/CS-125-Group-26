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
  TextInput
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

import UserService from './UserService';
type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({children, title}: SectionProps): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

function ProfilePage(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
      <SafeAreaView style={backgroundStyle}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={backgroundStyle}>
          
          <View
            style={{
              backgroundColor: isDarkMode ? Colors.black : Colors.white,
            }}>
            <Section title="Personal Details">
            </Section>
            <View style={styles.divider} />
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>User Name</Text>
              <Text style={styles.detailValue}>{UserService.name}</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Weight</Text>
              <Text style={styles.detailValue}>{UserService.weight} lb</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Height</Text>
              <Text style={styles.detailValue}>{UserService.height} ft</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>BirthDate</Text>
              <Text style={styles.detailValue}>{UserService.birthDate}</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Water Intake</Text>
              <Text style={styles.detailValue}>{UserService.waterIntake} mL</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Exercise Minute</Text>
              <Text style={styles.detailValue}>{UserService.exerciseMin} minutes</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Calorie</Text>
              <Text style={styles.detailValue}>{UserService.calorieBurn} calories</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Bed Time</Text>
              <Text style={styles.detailValue}>{UserService.bedTime}</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Wake Time</Text>
              <Text style={styles.detailValue}>{UserService.wakeTime}</Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
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
  inputGroup: {
    flexDirection: 'row', // Align children in a row
    justifyContent: 'space-between', // Space between label and input
    alignItems: 'center', // Align items vertically
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    color: '#000',
    // Remove paddingBottom if it's not fitting well with your new layout
  },
  input: {
    fontSize: 16,
    color: '#000',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    padding: 10,
    // Set a specific width if necessary or use flex to manage space
    flex: 1, // Take available space
    marginLeft: 10, // Add some space between label and input
  },
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#cccccc',
    paddingHorizontal: 16,
  },
  detailLabel: {
    color: '#000',
    fontSize: 16,
  },
  detailValue: {
    color: '#007AFF',
    fontSize: 16,
  },
  divider: {
    borderBottomColor: '#BBBBBB', // Color of the divider
    borderBottomWidth: 1,         // Thickness of the divider
    marginVertical: 8,            // Space above and below the divider
    // Optionally, you might want to add some horizontal margin as well
    // marginHorizontal: 10,
  },
});

export default ProfilePage;