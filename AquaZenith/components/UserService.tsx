import AsyncStorage from '@react-native-async-storage/async-storage';
import { FIREBASE_DB } from './FireBaseConfig';
// import {addDoc, collection } from 'firebase/firestore'
import { doc, setDoc, getDoc} from "firebase/firestore";
import firestore from '@react-native-firebase/firestore';


class UserService {
  name: string;
  weight: string;
  height: string;
  birthDate: string;
  waterIntake: string;
  exerciseMin: string;
  calorieBurn: string;
  bedTime: string;
  wakeTime: string;
  sleepGoal: number;
  email:string;


  constructor() {
    this.name = '';
    this.weight = '';
    this.height = '';
    this.birthDate = '';
    this.waterIntake = '';
    this.exerciseMin = '';
    this.calorieBurn = '';
    this.bedTime = '';
    this.wakeTime = '';
    this.sleepGoal = 0;
    this.email = '';
  }
  setEmail(email:string): void {
    this.email = email
  }
  setInfo(name: string, weight: string, height: string, birthDate: string): void {
    this.name = name;
    this.weight = weight;
    this.height = height;
    this.birthDate = birthDate;
  }

  setGoal(waterIntake: string, exerciseMin: string, calorieBurn: string, bedTime: string, wakeTime: string): void {
    this.waterIntake = waterIntake
    this.exerciseMin = exerciseMin;
    this.calorieBurn = calorieBurn;
    this.bedTime = bedTime;
    this.wakeTime = wakeTime;

    const [hours1, minutes1] = bedTime.split(':').map(Number);
    const [hours2, minutes2] = wakeTime.split(':').map(Number);

    // Convert the times to minutes since the start of the day
    const minutesSinceStartOfDay1 = hours1 * 60 + minutes1;
    const minutesSinceStartOfDay2 = hours2 * 60 + minutes2;

    // Calculate the difference in minutes
    let differenceInMinutes: number;
    if (minutesSinceStartOfDay1 > minutesSinceStartOfDay2) {
        // Assumes timeStr2 is on the next day
        differenceInMinutes = (24 * 60 - minutesSinceStartOfDay1) + minutesSinceStartOfDay2;
    } else {
        differenceInMinutes = minutesSinceStartOfDay2 - minutesSinceStartOfDay1;
    }

    // Convert the difference back to hours
    this.sleepGoal = differenceInMinutes / 60;

  }

  // Method to save user data to AsyncStorage or any storage
  async saveInfoToStorage(): Promise<void> {
    try {
      const userData = JSON.stringify({
        name: this.name,
        weight: this.weight,
        height: this.height,
        birthDate: this.birthDate,
        
      });
      await AsyncStorage.setItem('userData', userData);
      console.log('User goal saved successfully');
    } catch (error) {
      console.error('Failed to save user data', error);
    }
  }

  async saveGoalToStorage(): Promise<void> {
    const customDocName = this.email;
    const docRef = doc(FIREBASE_DB, 'UserInfo', customDocName);
    try {
      const userData = JSON.stringify({
        waterIntake: this.waterIntake,
        exerciseMin: this.exerciseMin,
        calorieBurn : this.calorieBurn,
        bedTime: this.bedTime,
        wakeTime: this.wakeTime,
      });
      await AsyncStorage.setItem('userData', userData);
      console.log('User data saved successfully');
      await setDoc(docRef, {
        name: this.name, 
        weight: this.weight, 
        height: this.height, 
        birthdate: this.birthDate,
        waterIntake: this.waterIntake, 
        exerciseMin: this.exerciseMin, 
        calorieBurn: this.calorieBurn, 
        bedTime: this.bedTime,
        wakeTime: this.wakeTime
      });
    } catch (error) {
      console.error('Failed to save user data', error);
    }
  }

  // Method to load user data from AsyncStorage or any storage
  async retrieveDocument(): Promise<void>{
    try {
      const customDocName = this.email;
      const documentReference = doc(FIREBASE_DB, 'UserInfo', customDocName);
      const documentSnapshot = await getDoc(documentReference);

      if (documentSnapshot !== undefined) {
        const document = documentSnapshot.data();
        if (document !== undefined) {
          this.setInfo(document["name"], document["weight"], document["height"], document["birthdate"]);
          this.setGoal(document["waterIntake"], document["exerciseMin"], document["calorieBurn"],
          document["bedTime"], document["wakeTime"]);
          this.sleepGoal = document["sleepGoal"];
          console.log('Document data:', document);
        }
      } else {
        console.log('No such document!');
      }
    } catch (error) {
      console.error("Error retrieving document: ", error);
    }
  };
}

// Export an instance
export default new UserService();
