import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  Alert,
  ActivityIndicator,
  Button,
  Platform,
  useColorScheme,
  TouchableOpacity
} from "react-native";
import {signInWithEmailAndPassword} from '@firebase/auth';
import { FIREBASE_AUTH } from './FireBaseConfig';
import { createUserWithEmailAndPassword } from '@firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';


type SignInScreenProp = StackNavigationProp<RootStackParamList, 'SignIn'>;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;
  

  const navigation = useNavigation<SignInScreenProp>();

  const signIn = async () => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log(response);
      navigation.navigate('Main');
    } catch (error:any){
      console.log(error);
      Alert.alert('Sign in failed' + error.message);
    } finally {
      setLoading(false);
    }
  }

  const signUp = async () => {
    setLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      console.log(response);
      // Alert.alert('Check your email!');
      navigation.navigate('UserInfo');
    } catch (error:any){
      console.log(error);
      Alert.alert('Sign in failed' + error.message);
    } finally {
      setLoading(false);
    }
  }

  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? '#09dbcf' : '#09dbcf', // Adjusted to use a single color for simplicity
      
};

  return (
    <SafeAreaView style={[{ flex: 1 , },backgroundStyle]}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
        <View style={{ flex: 1, margin: 16 }}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', gap: 24 }}>
            <Text style={[ { fontSize: 24, fontWeight: 'bold' }]}>
              Sign In
            </Text>

            <View style={{ width: '100%', gap: 24 }}>
              <View style={{ marginTop: 4, gap: 16 }}>
                <View style={[styles.inputField, { flexDirection: 'row', alignItems: 'center' }]}>
                  <TextInput
                    placeholder="Email"
                    value={email}
                    style={styles.input}
                    onChangeText={(text) => setEmail(text)}
                    autoCapitalize='none'
                  />
                </View>

                <View style={[styles.inputField, { flexDirection: 'row', alignItems: 'center' }]}>
                  <TextInput
                    placeholder="Password"
                    value={password}
                    style={styles.input}
                    onChangeText={(text) => setPassword(text)}
                    secureTextEntry={true}
                    autoCapitalize='none'
                  />
                </View>

                     {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />

        ) : (
          <>
          <TouchableOpacity onPress={signIn} style={styles.roundedButton}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={signUp} style={styles.roundedButton}>
            <Text style={styles.buttonText}>Create account</Text>
          </TouchableOpacity>


          </>
        )

        }
              </View>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container:{
    marginHorizontal: 20,
    flex: 1,
    justifyContent: 'center'
  },
  inputField: {
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    padding: 8,
  },
  input: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    backgroundColor: '#fff',
    color: '#424242',
  },
  button: {
    backgroundColor: 'your-background-color',
    borderColor: '#ffffff',
    borderWidth: 1,
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 24,
    margin: 16,
  },
  // buttonText: {
  //   textAlign: 'center',
  //   color: '#ffffff',
  //   fontWeight: 'bold',
  // },
  roundedButton: {
    backgroundColor: 'black', // Button color
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30, // This makes the button rounded
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5, // Adds space between buttons
  },
  buttonText: {
    color: 'white', // Text color
    fontSize: 16,
  },
});

export default Login;