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
// import { Picker } from '@react-native-picker/picker';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import SelectDropdown from 'react-native-select-dropdown';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons/faChevronDown'
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
  const days = Array.from({ length: 31 }, (_, i) => `${i + 1}`);
  const months = Array.from({ length: 12 }, (_, i) => `${i + 1}`);
  const years = Array.from({ length: 101 }, (_, i) => `${new Date().getFullYear() - i}`);

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
            <TextInput style={styles.input} placeholder="Type here in pounds" keyboardType="numeric" />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Height</Text>
            <TextInput style={styles.input} placeholder="Type here in feet and inches" keyboardType="numeric" />
          </View>
          {/* <View style={styles.birthDateSection}>
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
          </View> */}
        </View>
        <View style={styles.birthDateSection}>
            <Text style={styles.birthDateLabel}>Birth Date</Text>
            <View style={styles.birthDateContainer}>
              <SelectDropdown
                data={days}
                defaultButtonText="Day" // Optional: to preselect a default value
                onSelect={(selectedItem, index) => setDay(selectedItem)}
                buttonTextAfterSelection={(selectedItem, index) => selectedItem}
                rowTextForSelection={(item, index) => item}
                buttonStyle={styles.dropdownBtnStyle}
                buttonTextStyle={styles.dropdownBtnTxtStyle}
                renderDropdownIcon={(isOpened) => {
                  return <FontAwesomeIcon icon={faChevronDown} color={"#444"} size={18} />;
                }}
                dropdownStyle={styles.dropdownDropdownStyle}
              />
              <SelectDropdown
                data={months}
                defaultButtonText="Month"// Optional
                onSelect={(selectedItem, index) => setMonth(selectedItem)}
                buttonTextAfterSelection={(selectedItem, index) => selectedItem}
                rowTextForSelection={(item, index) => item}
                buttonStyle={styles.dropdownBtnStyle}
                buttonTextStyle={styles.dropdownBtnTxtStyle}
                renderDropdownIcon={(isOpened) => {
                  return <FontAwesomeIcon icon={faChevronDown} color={"#444"} size={18} />
                }}
                dropdownStyle={styles.dropdownDropdownStyle}
              />
              <SelectDropdown
                data={years}
                defaultButtonText="Year" // Optional
                onSelect={(selectedItem, index) => setYear(selectedItem)}
                buttonTextAfterSelection={(selectedItem, index) => selectedItem}
                rowTextForSelection={(item, index) => item}
                buttonStyle={styles.dropdownBtnStyle}
                buttonTextStyle={styles.dropdownBtnTxtStyle}
                renderDropdownIcon={(isOpened) => {
                  return <FontAwesomeIcon icon={faChevronDown} color={"#444"} size={18} />;
                }}
                dropdownStyle={styles.dropdownDropdownStyle}
              />
            </View>
          </View>

      </ScrollView>
      <View>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('UserGoal')}>
            <Text style={styles.textWrapper}>Plan Your Wellness</Text>
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
      fontSize: 32,
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
      width: '85%',
      marginVertical: 10,
    },
    birthDateLabel: {
      fontSize: 32,
      color: '#000000',
      marginBottom: 10,
    },
    birthDateContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
    },
    dropdownBtnStyle: {
      width: "30%", // Adjust the width as needed
      height: 50,
      backgroundColor: "#FFF",
      borderRadius: 8,
    },
    dropdownBtnTxtStyle: {
      color: "#000", // Ensure the text is black
      textAlign: "left",
    },
    dropdownDropdownStyle: {
      backgroundColor: "#EFEFEF",
    },
    dropdownRowStyle: {
      backgroundColor: "#EFEFEF",
      borderBottomColor: "#C5C5C5",
    },
    dropdownRowTxtStyle: {
      color: "#444",
      textAlign: "left",
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