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
  TouchableOpacity,
  Image
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';
import {
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
type WelcomeScreenProp = StackNavigationProp<RootStackParamList, 'Welcome'>;

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

function WelcomePage(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const navigation = useNavigation<WelcomeScreenProp>();
//   const backgroundStyle = {
//     backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
//   };
const backgroundStyle = {
    backgroundColor: isDarkMode ? '#09dbcf' : '#09dbcf', // Adjusted to use a single color for simplicity
  };
  return (
<SafeAreaView style={[styles.safeAreaView, backgroundStyle]}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView contentInsetAdjustmentBehavior="automatic" style={backgroundStyle}>
        <View style={styles.welcomePage}>
          <View style={styles.div}>
            <View style={styles.group}>
            <TouchableOpacity onPress={() => navigation.navigate('UserInfo')} style={styles.overlapGroup}>
            <View style={styles.rectangle} />
            <Text style={styles.textWrapper}>Get Started Now</Text>
            </TouchableOpacity>
            </View>
            <Text style={styles.p}>Sleep, Sip, Step: Your Path to a Healthier, Happier You!</Text>
            <Text style={styles.textWrapper2}>
              This wellness app is designed to keep track your daily sleep, hydration, assisting you to achieve personal goal
            </Text>
            <View style={styles.logoContainer}>
            <Image style={styles.image} source={require('../wpimage1.png')} />
            <Text style={styles.textWrapper3}>AquaZenith</Text>
            </View>
            <Image style={styles.img} source={require('../wpimage2.png')} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView> 
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  welcomePage: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
  },
  div: {
    backgroundColor: '#09dbcf',
    width: 393,
    alignItems: 'center',
    justifyContent: 'center',
  },
  group: {
    position: 'absolute',
    top: 757,
    width: 312,
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlapGroup: {
    borderRadius: 20,
    width: 310,
    height: 55,
    position: 'relative',
  },
  rectangle: {
    backgroundColor: '#000000',
    borderRadius: 20,
    width: '100%',
    height: '100%',
  },
  textWrapper: {
    position: 'absolute',
    color: '#f5f5f5',
    fontSize: 16,
    fontWeight: '400',
    top: 19,
    alignSelf: 'center',
  },
  p: {
    color: '#000000',
    fontSize: 40,
    fontWeight: '400',
    position: 'absolute',
    top: 469,
    paddingHorizontal: 20,
    textAlign: 'center',
  },
  textWrapper2: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '400',
    position: 'absolute',
    top: 678,
    paddingHorizontal: 20,
    textAlign: 'center',
  },
  image: {
    // position: 'absolute',
    // top: 20,
    // width: 36,
    // height: 36,
    width: 36,
    height: 36,
    marginRight: 10,
  },
  textWrapper3: {
    color: '#000000',
    fontSize: 15,
    fontWeight: '700',
    // position: 'absolute',
    // top: 71,
  },
  img: {
    position: 'absolute',
    top: 162,
    width: 250,
    height: 250,
  },
  logoContainer: {
    flexDirection: 'row', // Aligns children in a horizontal row
    alignItems: 'center', // Centers children vertically in the container
    justifyContent: 'center', // Centers children horizontally in the container
    marginTop: 20, // Add some top margin to separate from elements above, adjust as needed
  },
});

export default WelcomePage;