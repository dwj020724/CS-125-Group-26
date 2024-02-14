/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import AppleHealthKit from 'react-native-health';
import {
  useColorScheme,
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import {createStackNavigator} from '@react-navigation/stack';
import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme, 
} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import SettingsScreen from './components/SettingsScreen';
import SummaryScreen from './components/SummaryScreen';
import WelcomePage from './components/WelcomePage';
import UserInfo from './components/UserInfo';

import { faHouse } from '@fortawesome/free-solid-svg-icons/faHouse'
import { faGear } from '@fortawesome/free-solid-svg-icons/faGear'
import { faPersonWalking } from '@fortawesome/free-solid-svg-icons/faPersonWalking'
import ExercisePage from './components/ExercisePage';
import UserGoal from './components/UserGoal';

const options = {
  permissions: {
    read: [AppleHealthKit.Constants.Permissions.Steps /*, add other permissions */],
    write: [AppleHealthKit.Constants.Permissions.Steps /*, add other permissions */],
  },
};

AppleHealthKit.initHealthKit(options, (err, results) => {
  if (err) {
    console.log('error initializing Healthkit: ', err);
    return;
  }
  // HealthKit is initialized, and permissions are granted to access the data
});


export type RootStackParamList = {
  Welcome: undefined;
  Main: undefined;
  UserInfo: undefined;
  UserGoal:undefined;
};
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator<RootStackParamList>();

function MainTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Summary" 
      component={SummaryScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <FontAwesomeIcon icon={faHouse} color={color} size={size} />
        ),
      }}
      />

      <Tab.Screen name="Exercise" 
      component={ExercisePage}
      options={{
        tabBarIcon: ({ color, size }) => (
          <FontAwesomeIcon icon={faPersonWalking} color={color} size={size} />
        ),
      }}
      />
      
      <Tab.Screen name="Settings" 
      component={SettingsScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <FontAwesomeIcon icon={faGear} color={color} size={size} />
        ),
      }}
       />


      
    </Tab.Navigator>
  );
}
function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const scheme = useColorScheme();

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
    <Stack.Navigator initialRouteName="Welcome" screenOptions={{headerShown: false}}>
        <Stack.Screen name="Welcome" component={WelcomePage} />
        <Stack.Screen name="UserInfo" component={UserInfo} />
        <Stack.Screen name="UserGoal" component={UserGoal} />
        <Stack.Screen name="Main" component={MainTabs} />
      </Stack.Navigator>
    </NavigationContainer>
    
  );
}

export default App;
