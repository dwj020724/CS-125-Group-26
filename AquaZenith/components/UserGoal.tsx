import React, { useState } from 'react';
import type {PropsWithChildren} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserService from './UserService';
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


function UserGoal(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const navigation = useNavigation<UserInfoScreenProp>();
  const [water_intake, setWater_intake] = useState('');
  const [exercise_min, setExercise_min] = useState('');
  const [calorie, setCalorie] = useState('');
  const [bedHour, setBedHour] = useState('');
  const [bedMinute, setBedMinute] = useState('');
  const [wakeHour, setWakeHour] = useState('');
  const [wakeMinute, setWakeMinute] = useState('');

  const hours = Array.from({ length: 24 }, (_, i) => (i < 10 ? `0${i}` : `${i}`));
  const minutes = Array.from({ length: 60 }, (_, i) => (i < 10 ? `0${i}` : `${i}`));
  
  const saveUserInfo = async () => {
    try {
      // Storing each piece of information with a unique key
      const bedTime = bedHour + ":" + bedMinute;
      const wakeTime = wakeHour + ":" + wakeMinute;
      UserService.setGoal(water_intake, exercise_min, calorie, bedTime, wakeTime);
    } catch (error) {
    }
  };

  const handlePress = async () => {
    await saveUserInfo();
    await UserService.saveGoalToStorage();
    navigation.navigate('Main');
    console.log(`Water intake: ${water_intake}, Exercise minutes: ${exercise_min}, Calorie: ${calorie},
    Go to sleep at ${bedHour}:${bedMinute}, Waking up at ${wakeHour}:${wakeMinute}.`);
    // console.log(name);
  };
  
const backgroundStyle = {
    backgroundColor: isDarkMode ? '#09dbcf' : '#09dbcf', // Adjusted to use a single color for simplicity
    
};


return (
  <View style={[styles.userInformation, backgroundStyle]}>
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.div}>
        <Text style={styles.textWrapper2}>What's your goal?</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Daily Water Intake</Text>
          <TextInput style={styles.input} placeholder="Type here in ml" keyboardType="numeric" onChangeText={setWater_intake}/>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Daily Exercise Time</Text>
          <TextInput style={styles.input} placeholder="Type here in minutes" keyboardType="numeric" onChangeText={setExercise_min}/>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Daily Calorie Burn</Text>
          <TextInput style={styles.input} placeholder="Type here in cal" keyboardType="numeric" onChangeText={setCalorie} />
        </View>
      </View>
      <View style={styles.sectionContainer}>
  <Text style={styles.sectionTitle}>Bed Time</Text>
        <View style={styles.dropdownsRow}>
          <SelectDropdown
            data={hours}
            defaultButtonText="Hour"
            onSelect={(selectedItem) => {
              setBedHour(selectedItem);
            }}
            buttonTextAfterSelection={(selectedItem) => {
              return selectedItem;
            }}
            rowTextForSelection={(item) => {
              return item;
            }}
            buttonStyle={styles.dropdownBtnStyle}
            buttonTextStyle={styles.dropdownBtnTxtStyle}
            renderDropdownIcon={() => {
              return <FontAwesomeIcon icon={faChevronDown} color={"#444"} size={18} />;
            }}
            dropdownIconPosition={"right"}
            dropdownStyle={styles.dropdownDropdownStyle}
            rowStyle={styles.dropdownRowStyle}
            rowTextStyle={styles.dropdownRowTxtStyle}
          />
          <Text style={styles.colonStyle}>:</Text>
          <SelectDropdown
            data={minutes}
            defaultButtonText="Minute"
            onSelect={(selectedItem) => {
              setBedMinute(selectedItem);
            }}
            buttonTextAfterSelection={(selectedItem) => {
              return selectedItem;
            }}
            rowTextForSelection={(item) => {
              return item;
            }}
            buttonStyle={styles.dropdownBtnStyle}
            buttonTextStyle={styles.dropdownBtnTxtStyle}
            renderDropdownIcon={() => {
              return <FontAwesomeIcon icon={faChevronDown} color={"#444"} size={18} />;
            }}
            dropdownIconPosition={"right"}
            dropdownStyle={styles.dropdownDropdownStyle}
            rowStyle={styles.dropdownRowStyle}
            rowTextStyle={styles.dropdownRowTxtStyle}
          />
        </View>
        <Text style={styles.sectionTitle}>Wake Up Time</Text>
        <View style={styles.dropdownsRow}>
          <SelectDropdown
            data={hours}
            defaultButtonText="Hour"
            onSelect={(selectedItem) => {
              setWakeHour(selectedItem);
            }}
            buttonTextAfterSelection={(selectedItem) => {
              return selectedItem;
            }}
            rowTextForSelection={(item) => {
              return item;
            }}
            buttonStyle={styles.dropdownBtnStyle}
            buttonTextStyle={styles.dropdownBtnTxtStyle}
            renderDropdownIcon={() => {
              return <FontAwesomeIcon icon={faChevronDown} color={"#444"} size={18} />;
            }}
            dropdownIconPosition={"right"}
            dropdownStyle={styles.dropdownDropdownStyle}
            rowStyle={styles.dropdownRowStyle}
            rowTextStyle={styles.dropdownRowTxtStyle}
          />
          <Text style={styles.colonStyle}>:</Text>
          <SelectDropdown
            data={minutes}
            defaultButtonText="Minute"
            onSelect={(selectedItem) => {
              setWakeMinute(selectedItem);
            }}
            buttonTextAfterSelection={(selectedItem) => {
              return selectedItem;
            }}
            rowTextForSelection={(item) => {
              return item;
            }}
            buttonStyle={styles.dropdownBtnStyle}
            buttonTextStyle={styles.dropdownBtnTxtStyle}
            renderDropdownIcon={() => {
              return <FontAwesomeIcon icon={faChevronDown} color={"#444"} size={18} />;
            }}
            dropdownIconPosition={"right"}
            dropdownStyle={styles.dropdownDropdownStyle}
            rowStyle={styles.dropdownRowStyle}
            rowTextStyle={styles.dropdownRowTxtStyle}
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

bottomButton: {
  backgroundColor: '#000000',
  borderRadius: 20,
  padding: 10,
  justifyContent: 'center',
  alignItems: 'center',
  margin: 20, // Adjust as needed for spacing from screen edges
  height: 50, // Adjust as needed
},
dropdownsRow: {
  flexDirection: 'row',
  alignItems: 'center',
  marginVertical: 20,
},
colonStyle: {
  fontSize: 24,
  paddingHorizontal: 8,
},
sectionTitle: {
  fontSize: 32,
  marginTop: 20,
  
},
dropdownBtnStyle: {
  width: "45%",
  height: 50,
  backgroundColor: "#FFF",
  borderRadius: 8,
},
dropdownBtnTxtStyle: { color: "#000", textAlign: "left" },
dropdownDropdownStyle: { backgroundColor: "#EFEFEF" },
dropdownRowStyle: { backgroundColor: "#EFEFEF", borderBottomColor: "#C5C5C5" },
dropdownRowTxtStyle: { color: "#444", textAlign: "left" },
sectionContainer: {
  width: '85%', // Match the inputContainer width
  alignSelf: 'center', // Ensure it aligns with the inputContainer if it's not already within a similar container
  marginBottom: 5, // Match the marginBottom of the label for consistent spacing
},
});


export default UserGoal;