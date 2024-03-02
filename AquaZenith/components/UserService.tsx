import AsyncStorage from '@react-native-async-storage/async-storage';

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
    } catch (error) {
      console.error('Failed to save user data', error);
    }
  }

  // Method to load user data from AsyncStorage or any storage
  async loadFromStorage(): Promise<void> {
    try {
      const userData = await AsyncStorage.getItem('userData');
      if (userData) {
        const { name, weight, height, birthDate, waterIntake, exerciseMin, calorieBurn, bedTime, wakeTime} = JSON.parse(userData);
        this.name = name;
        this.weight = weight;
        this.height = height;
        this.birthDate = birthDate;
        this.waterIntake = waterIntake;
        this.exerciseMin = exerciseMin;
        this.calorieBurn = calorieBurn;
        this.bedTime = bedTime;
        this.wakeTime = wakeTime;
      }
      console.log('User data loaded successfully');
    } catch (error) {
      console.error('Failed to load user data', error);
    }
  }
}

// Export an instance
export default new UserService();
