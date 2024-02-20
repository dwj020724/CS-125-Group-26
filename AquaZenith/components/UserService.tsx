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
  wakeTime: string;;


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
