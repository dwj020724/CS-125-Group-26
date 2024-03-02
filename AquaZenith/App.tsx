/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
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

import ProfilePage from './components/ProfilePage';
import SummaryScreen from './components/SummaryScreen';
import WelcomePage from './components/WelcomePage';
import UserInfo from './components/UserInfo';

import { faHouse } from '@fortawesome/free-solid-svg-icons/faHouse'
import { faUser } from '@fortawesome/free-solid-svg-icons/faUser'
import { faPersonWalking } from '@fortawesome/free-solid-svg-icons/faPersonWalking'
import { faDroplet } from '@fortawesome/free-solid-svg-icons/faDroplet'
import { faBed } from '@fortawesome/free-solid-svg-icons/faBed'
import ExercisePage from './components/ExercisePage';
import UserGoal from './components/UserGoal';
import WaterPage from './components/WaterPage';
import SleepPage from './components/SleepPage';
import SignInPage from './components/SignIn';
import {User, onAuthStateChanged} from 'firebase/auth'
import { FIREBASE_AUTH } from './components/FireBaseConfig';
const options = {
  permissions: {
    read: [AppleHealthKit.Constants.Permissions.Steps, AppleHealthKit.Constants.Permissions.Water, AppleHealthKit.Constants.Permissions.SleepAnalysis, AppleHealthKit.Constants.Permissions.ActivitySummary, AppleHealthKit.Constants.Permissions.AppleExerciseTime],
    write: [AppleHealthKit.Constants.Permissions.Steps, AppleHealthKit.Constants.Permissions.Water, AppleHealthKit.Constants.Permissions.SleepAnalysis, AppleHealthKit.Constants.Permissions.ActivitySummary, AppleHealthKit.Constants.Permissions.AppleExerciseTime],
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
  SignIn: undefined;
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
      
      <Tab.Screen name="Hydation" 
      component={WaterPage}
      options={{
        tabBarIcon: ({ color, size }) => (
          <FontAwesomeIcon icon={faDroplet} color={color} size={size} />
        ),
      }}
       />

    <Tab.Screen name="Sleep" 
      component={SleepPage}
      options={{
        tabBarIcon: ({ color, size }) => (
          <FontAwesomeIcon icon={faBed} color={color} size={size} />
        ),
      }}
       />

      <Tab.Screen name="Profile" 
      component={ProfilePage}
      options={{
        tabBarIcon: ({ color, size }) => (
          <FontAwesomeIcon icon={faUser} color={color} size={size} />
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
  const [user, setUser] = useState<User | null>(null);
  
  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      console.log('user', user);
    }
    )
  }, [])

  return (
    <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
    <Stack.Navigator initialRouteName="Welcome" screenOptions={{headerShown: false}}>
        <Stack.Screen name="Welcome" component={WelcomePage} />
        <Stack.Screen name="SignIn" component={SignInPage} />
        <Stack.Screen name="UserInfo" component={UserInfo} />
        <Stack.Screen name="UserGoal" component={UserGoal} />
        <Stack.Screen name="Main" component={MainTabs} />
      </Stack.Navigator>
    </NavigationContainer>
    
  );
}

export default App;