import React, { Component, useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, ActivityIndicator, Dimensions} from 'react-native';
import AppleHealthKit, { HealthActivitySummary, HealthInputOptions, HealthObserver, HealthUnit, HealthValue } from 'react-native-health';
import UserService from './UserService';




// Define an interface for the component's state
interface HealthDataBoxComponentState {
  activity_samples: Array<HealthActivitySummary> | null;
  sleep_sample: any | null;
  water_sample: string | null;
  loading: boolean;
  error: string | null;
}

// If your component doesn't receive props, you can use an empty interface
interface HealthDataBoxComponentProps {
    // Property type for seleccting which version of the component to use Valid types are:
    // ["Calories", "Exercise", "Sleep", "Hydration"]
    type: string;
    onLoaded?: () => void; // optional callback
}

class HealthDataBoxComponent extends Component<HealthDataBoxComponentProps, HealthDataBoxComponentState> {
  constructor(props: HealthDataBoxComponentProps) {
    super(props);
    if (props.type == "Calories" || "Exercise" || "Sleep" || "Hydration"){
        this.state = {
            activity_samples: null,
            sleep_sample: null,
            water_sample: null,
            loading: true,
            error: null,
        };   
    }
    else{
        console.log("HealthBoxComponent: Unknown property Type input, check property on component tag")
    }
    
  }

  componentDidMount() {
    this.loadHealthData();
  }

  loadHealthData = () => {
    var yesterdaydate = new Date();
    yesterdaydate.setDate(yesterdaydate.getDate() - 1);// get yesterdays date
    // Load different types based on property type passed.
    if(this.props.type == "Calories"){
        this.setState({ loading: true, error: null });
        let options: HealthInputOptions = {
            startDate: yesterdaydate.toISOString(), //start date = yesterday
            endDate: new Date().toISOString(), // end date = now
            includeManuallyAdded: false // optional: default true
        };
        AppleHealthKit.getActivitySummary(
            (options),
            (err, results) => {
                if (err) {
                    this.setState({ loading: false, error: 'Failed to load data' });
                    this.props.onLoaded && this.props.onLoaded(); // callback on error
                    return
                }
                if (results && results.length > 0) {
                    const lastSample = results[results.length - 1];
                    UserService.currCalorieBurn = lastSample.activeEnergyBurned; // Update service state before component state
                    console.log(UserService.currCalorieBurn);
                }
                this.setState({ activity_samples: results, loading: false }, () => {
                    this.props.onLoaded && this.props.onLoaded(); // callback on success
                });
            },
        )
    }
    else if(this.props.type == "Exercise"){
        this.setState({ loading: true, error: null });
        let options: HealthInputOptions = {
            startDate: yesterdaydate.toISOString(), //start date = yesterday
            endDate: new Date().toISOString(), // end date = now
            includeManuallyAdded: false // optional: default true
        };
        AppleHealthKit.getActivitySummary(
            (options),
            (err, results) => {
                if (err) {
                    this.setState({ loading: false, error: 'Failed to load data' });
                    this.props.onLoaded && this.props.onLoaded(); // callback on error
                    return
                }
                if (results && results.length > 0) {
                    const lastSample = results[results.length - 1];
                    UserService.currExerciseMin = lastSample.appleExerciseTime; // Update service state before component state
                    console.log(UserService.currExerciseMin);
                }
                this.setState({ activity_samples: results, loading: false }, () => {
                    this.props.onLoaded && this.props.onLoaded(); // callback on success
                });
                
            },
        )
    }
    else if(this.props.type == "Sleep"){
        this.setState({ loading: true, error: null });
        let options: HealthInputOptions = {
            startDate: yesterdaydate.toISOString(), //start date = yesterday
            endDate: new Date().toISOString(), // end date = now
            includeManuallyAdded: true // optional: default true
        };
        AppleHealthKit.getSleepSamples(
            (options),
            (err, results) => {
                if (err) {
                    this.setState({ loading: false, error: 'Failed to load data' });
                    this.props.onLoaded && this.props.onLoaded(); // callback on error
                    return
                }
                
                
                const transformedData = this.transformSleepData(results);
                // transformedData.datasets.forEach((dataset, index) => {
                //     console.log(`Dataset ${index}:`, dataset);
                //   });
                // this.setState({ sleep_sample: transformedData, loading: false }); 

                if (transformedData != null) { // This checks for both null and undefined
                    const sleepDuration = transformedData.datasets?.[0]?.data?.[0]; // Safely accessing the first data point
                    if (typeof sleepDuration === 'number') {
                        UserService.currSleepDur = sleepDuration.toFixed(1);
                        console.log(UserService.currSleepDur);
                        console.log("sleep goal" + UserService.sleepGoal);
                    }
                }

                this.setState({ sleep_sample: transformedData, loading: false }, () => {
                    this.props.onLoaded && this.props.onLoaded(); // callback on success
                });
            },
        )
    }
    else if(this.props.type == "Hydration"){
        this.setState({ loading: true, error: null });
        let options: HealthInputOptions = {
            startDate: yesterdaydate.toISOString(), //start date = yesterday
            endDate: new Date().toISOString(), // end date = now
            includeManuallyAdded: true // optional: default true
        };
        AppleHealthKit.getWaterSamples(
            (options),
            (err, results) => {
                if (err) {
                    this.setState({ loading: false, error: 'Failed to load data' });
                    this.props.onLoaded && this.props.onLoaded();
                    return
                }
                var total_water = 0
                results.forEach(result => {
                    total_water += result.value
                });
                total_water = total_water*1000 // convert to mililiters
                // this.setState({ water_sample: total_water.toFixed(0), loading: false });  // .toFixed() just rounds off the float numbers from the conversion

                if (total_water.toFixed(0) != null) { // This checks for both null and undefined 
                    UserService.currWaterIntake = total_water.toFixed(0);
                    console.log(UserService.currWaterIntake);
                }
                this.setState({ water_sample: total_water.toFixed(0), loading: false }, () => {

                    this.props.onLoaded && this.props.onLoaded(); // callback on success
                });
            },
        )
    }
    
  };

  transformSleepData = (results:any) =>{
    interface DataByDate {
        [key: string]: number; // String keys, number values
    }      

    let dataByDate:DataByDate = {};

    results.forEach((entry:any) => {
    const endDate:any = new Date(entry.endDate);
    const startDate:any = new Date(entry.startDate);
    const sleepDuration = (endDate - startDate ) / (1000 * 60 * 60); // Convert ms to hours

    const dateKey = endDate.toISOString().split('T')[0]; // Format as YYYY-MM-DD

    if (dataByDate[dateKey]) {
        dataByDate[dateKey] += sleepDuration;
    } else {
        dataByDate[dateKey] = sleepDuration;
    }
    });

    const labels = Object.keys(dataByDate);
    const data = Object.values(dataByDate);

    return {
    labels,
    datasets: [{ data }]
    };
  }

//   componentDidUpdate(prevProps: HealthDataBoxComponentProps, prevState: HealthDataBoxComponentState) {
//     // Check if the loading state has changed from true to false
//     if (prevState.loading === true && this.state.loading === false) {
//       // If onLoaded is provided, call it
//       if (this.props.onLoaded) {
//         this.props.onLoaded();
//       }
//     }
//   }

  render() {
    
    const { activity_samples, sleep_sample, water_sample, loading, error } = this.state;

    if(this.props.type == "Calories"){
            // Initialize a variable to hold the display message
        let caloriesMessage = "No data"; // Default message if there's no data

        // Check if activity_samples exists and has at least one entry
        if (activity_samples && activity_samples.length > 0) {
            // Safely access the last item's activeEnergyBurned property
            const lastSample = activity_samples[activity_samples.length - 1];
            caloriesMessage = `${lastSample.activeEnergyBurned}/${UserService.calorieBurn} cal`; // Update the message with the last sample's value
            // UserService.currCalorieBurn = lastSample.activeEnergyBurned;
        } else {
            caloriesMessage = "error"; // You could also leave this out or set a more descriptive error message
        }

        return (
            <View style={[styles.metricCard, styles.cardHeartRate]}>
                {/* <Image style={styles.icon} source={require('./path/to/your/heart_icon.png')} /> */}
                <Text style={styles.metricTitle}>{this.props.type}</Text>
                <Text style={styles.metricValue}>
                    {caloriesMessage}
                </Text>
            </View>
        );
    }
    else if(this.props.type == "Exercise"){
            // Initialize a variable to hold the display message
        let caloriesMessage = "No data"; // Default message if there's no data

        // Check if activity_samples exists and has at least one entry
        if (activity_samples && activity_samples.length > 0) {
            // Safely access the last item's activeEnergyBurned property
            const lastSample = activity_samples[activity_samples.length - 1];
            caloriesMessage = `${lastSample.appleExerciseTime}/${UserService.exerciseMin} min`; // Update the message with the last sample's value
            // UserService.currExerciseMin = lastSample.appleExerciseTime;
        } else {
            caloriesMessage = "error"; // You could also leave this out or set a more descriptive error message
        }

        return (
            <View style={[styles.metricCard, styles.cardHeartRate]}>
                {/* <Image style={styles.icon} source={require('./path/to/your/heart_icon.png')} /> */}
                <Text style={styles.metricTitle}>{this.props.type}</Text>
                <Text style={styles.metricValue}>
                    {caloriesMessage}
                </Text>
            </View>
        );
    }
    else if(this.props.type == "Sleep"){
        let sleepMessage = "No data"; // Default message if there are no samples

        if (sleep_sample != null) { // This checks for both null and undefined
            const sleepDuration = sleep_sample.datasets?.[0]?.data?.[0]; // Safely accessing the first data point
            if (typeof sleepDuration === 'number') {
                sleepMessage = `${sleepDuration.toFixed(1)} Hours`;
                // UserService.currSleepDur = sleepDuration.toFixed(1);
            }
        }

        return (
            <View style={[styles.metricCard, styles.cardSleep]}>
                {/* <Image style={styles.icon} source={require('./path/to/your/heart_icon.png')} /> */}
                <Text style={styles.metricTitle}>{this.props.type}</Text>
                <Text style={styles.metricValue}>{sleepMessage}</Text>
                {/* {sleep_sample ? sleep_sample[sleep_sample.length-1].value + " Hours": "error"} */}
            </View>
        );
    }
    else if(this.props.type == "Hydration"){
        // if (water_sample != null) { // This checks for both null and undefined 
        //     UserService.currWaterIntake = water_sample;
        // }
        return (
            <View style={[styles.metricCard, styles.cardHydration]}>
                {/* <Image style={styles.icon} source={require('./path/to/your/heart_icon.png')} /> */}
                <Text style={styles.metricTitle}>{this.props.type}</Text>
                <Text style={styles.metricValue}>
                    {water_sample ? water_sample + " mL": "error"}
                </Text>
            </View>
        );
    }
    
  }
}

const styles = StyleSheet.create({
    metricCard: {
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        margin: 10,
        width: 150,
        height: 150,
    },
    cardHeartRate: {
        backgroundColor: '#D2416E20', // Using transparency for the background color
    },
    cardExercise: {
        backgroundColor: '#7042C820',
    },
    cardSleep: {
        backgroundColor: '#0CB1AD20',
    },
    cardHydration: {
        backgroundColor: '#197AD220',
    },
    metricTitle: {
        fontSize: 16,
        fontWeight: '500',
        color: '#062828',
    },
    metricValue: {
        fontSize: 24,
        fontWeight: '700',
        color: '#062828',
    },
});

export default HealthDataBoxComponent;
