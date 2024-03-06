import React, { useState } from 'react';
import type {PropsWithChildren} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserService from './UserService';
import {
  Alert,
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

function UserInfo(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const navigation = useNavigation<UserInfoScreenProp>();
  const [birth_day, setDay] = useState('');
  const [birth_month, setMonth] = useState('');
  const [birth_year, setYear] = useState('');
  const [name, setName] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');

  const days = Array.from({ length: 31 }, (_, i) => `${i + 1}`);
  const months = Array.from({ length: 12 }, (_, i) => `${i + 1}`);
  const years = Array.from({ length: 101 }, (_, i) => `${new Date().getFullYear() - i}`);

  // Function to save the user's information
  const saveUserInfo = async () => {
    try {
      // Storing each piece of information with a unique key
      const birthDate = birth_month + "/" + birth_day + ", " + birth_year;
      UserService.setInfo(name, weight, height, birthDate)
      // Alert.alert('Your wellness plan is ready!');
      
    } catch (error) {
      // Alert.alert('Failed to save user information');
    }
  };

  const handlePress = async () => {
    await saveUserInfo();
    await UserService.saveInfoToStorage();
    navigation.navigate('UserGoal');
    console.log(`Name: ${name}, Weight: ${weight}, Height: ${height}, Birth Date: ${birth_month}/${birth_day}, ${birth_year}`);
    // console.log(name);
  };
  
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
            <TextInput 
          style={styles.input} 
          placeholder="Type here" 
          value={name}
          onChangeText={setName} // Update state on change
        />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Weight</Text>
            <TextInput 
          style={styles.input} 
          placeholder="Type here in pounds" 
          keyboardType="numeric" 
          value={weight}
          onChangeText={setWeight} // Update state on change
        />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Height</Text>
            <TextInput 
          style={styles.input} 
          placeholder="Type here in feet and inches" 
          value={height}
          onChangeText={setHeight} // Update state on change
        />
          </View>
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
        <TouchableOpacity style={styles.button} onPress={handlePress}>
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