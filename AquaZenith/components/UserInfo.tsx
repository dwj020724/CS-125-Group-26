import React, { useState } from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableOpacity,
  TextInput
  
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';
import { Picker } from '@react-native-picker/picker';
import {
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
type UserInfoScreenProp = StackNavigationProp<RootStackParamList, 'UserInfo'>;

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

function UserInfo(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const navigation = useNavigation<UserInfoScreenProp>();
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');

  // Generate arrays for days, months, and years
  const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString());
  const months = Array.from({ length: 12 }, (_, i) => (i + 1).toString());
  const years = Array.from({ length: 101 }, (_, i) => (new Date().getFullYear() - i).toString());

//   const backgroundStyle = {
//     backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
//   };
const backgroundStyle = {
    backgroundColor: isDarkMode ? '#09dbcf' : '#09dbcf', // Adjusted to use a single color for simplicity
      
};

return (
    <View style={[styles.userInformation, backgroundStyle]}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.div}>
          <Text style={styles.textWrapper2}>Tell us about you...</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Name</Text>
            <TextInput style={styles.input} placeholder="Type here" />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Weight</Text>
            <TextInput style={styles.input} placeholder="Type here" keyboardType="numeric" />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Height</Text>
            <TextInput style={styles.input} placeholder="Type here" keyboardType="numeric" />
          </View>
          <View style={styles.birthDateSection}>
            <Text style={styles.birthDateLabel}>Birth Date</Text>
            <View style={styles.birthDateContainer}>
            <Picker
              selectedValue={day}
              style={styles.picker}
              onValueChange={(itemValue, itemIndex) => setDay(itemValue)}>
              <Picker.Item label="Day" value="" />
              {days.map(day => (
                <Picker.Item key={day} label={day} value={day} />
              ))}
            </Picker>
            <Picker
              selectedValue={month}
              style={styles.picker}
              onValueChange={(itemValue, itemIndex) => setMonth(itemValue)}>
              <Picker.Item label="Month" value="" />
              {months.map(month => (
                <Picker.Item key={month} label={month} value={month} />
              ))}
            </Picker>
            <Picker
              selectedValue={year}
              style={styles.picker}
              onValueChange={(itemValue, itemIndex) => setYear(itemValue)}>
              <Picker.Item label="Year" value="" />
              {years.map(year => (
                <Picker.Item key={year} label={year} value={year} />
              ))}
            </Picker>
          </View>
          </View>
        </View>

      </ScrollView>
      <View>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Main')}>
          {/* <View style={styles.overlapGroup}> */}
            {/* <View style={styles.rectangle} /> */}
            <Text style={styles.textWrapper}>Plan Your Wellness</Text>
          {/* </View> */}
        </TouchableOpacity>
      </View>
    </View>
    
  );
};



const styles = StyleSheet.create({
    userInformation: {
        backgroundColor: '#09dbcf',
        flex: 1,
    },
    scrollViewContent: {
        flexGrow: 1,
        justifyContent: 'flex-start', // Adjust content to start from top
        alignItems: 'center',
        paddingTop: 100, // Add padding at the top for spacing
    },
    div: {
      backgroundColor: '#09dbcf',
      alignItems: 'center',
      width: '100%',
    },
    button: {
        position: 'absolute', // Position the button absolutely
        bottom: 20, // Distance from the bottom of the screen
        left: '7.5%', // Center the button horizontally
        backgroundColor: '#000000',
        borderRadius: 20,
        width: '85%',
        height: 55,
        justifyContent: 'center',
        alignItems: 'center',
      },
    textWrapper: {
      color: '#f5f5f5',
      fontSize: 16,
    },
    textWrapper2: {
      fontSize: 40,
      color: '#000000',
      marginVertical: 20,
      textAlign: 'center',
    },
    inputContainer: {
      width: '85%',
      marginVertical: 10,
    },
    label: {
      fontSize: 16,
      color: '#000000',
      marginBottom: 5,
    },
    input: {
      backgroundColor: '#FFFFFF',
      borderColor: '#f5f5f5',
      borderWidth: 2,
      borderRadius: 10,
      height: 40,
      paddingHorizontal: 10,
      fontSize: 16,
    },

birthDateSection: {
    width: '85%', // Match the width with text input containers
    marginVertical: 10, // Add some vertical margin for spacing
    alignItems: 'center', // Center align the items
  },
  
  birthDateLabel: {
    fontSize: 16,
    color: '#000000',
    alignSelf: 'flex-start', // Align the label to the start of the container
    marginBottom: 10, // Add a margin at the bottom of the label for spacing
  },
  
  birthDateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Even spacing between pickers
    width: '100%', // Take the full width of the parent container
  },
  
  picker: {
    height: 40, // Match the height with text inputs
    flex: 1, // Allows the picker to expand within the container

  },
  bottomButton: {
    backgroundColor: '#000000',
    borderRadius: 20,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20, // Adjust as needed for spacing from screen edges
    height: 50, // Adjust as needed
  },
    
  });

export default UserInfo;