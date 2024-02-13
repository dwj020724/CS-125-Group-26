import React, { Component, useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, ActivityIndicator, Dimensions} from 'react-native';
import AppleHealthKit, { HealthActivitySummary, HealthInputOptions, HealthObserver, HealthUnit, HealthValue } from 'react-native-health';



// Define an interface for the component's state
interface HealthDataBoxComponentState {
  activity_samples: Array<HealthActivitySummary> | null;
  sleep_sample: Array<HealthValue> | null;
  water_sample: string | null;
  loading: boolean;
  error: string | null;
}

// If your component doesn't receive props, you can use an empty interface
interface HealthDataBoxComponentProps {
    // Property type for seleccting which version of the component to use Valid types are:
    // ["Calories", "Exercise", "Sleep", "Hydration"]
    type: string;
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
                    return
                }               
                this.setState({ activity_samples: results, loading: false });
                
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
                    return
                }               
                this.setState({ activity_samples: results, loading: false });
                
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
                    return
                }
                
                this.setState({ sleep_sample: results, loading: false }); 
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
                    return
                }
                var total_water = 0
                results.forEach(result => {
                    total_water += result.value
                });
                total_water = total_water*1000 // convert to mililiters

                this.setState({ water_sample: total_water.toFixed(0), loading: false });  // .toFixed() just rounds off the float numbers from the conversion
            },
        )
    }
    
  };

  render() {
    
    const { activity_samples, sleep_sample, water_sample, loading, error } = this.state;

    if(this.props.type == "Calories"){
        return (
            <View style={[styles.metricCard, styles.cardHeartRate]}>
                {/* <Image style={styles.icon} source={require('./path/to/your/heart_icon.png')} /> */}
                <Text style={styles.metricTitle}>{this.props.type}</Text>
                <Text style={styles.metricValue}>
                    {activity_samples ? activity_samples[activity_samples.length-1].activeEnergyBurned + " cal": "error"}
                </Text>
            </View>
        );
    }
    else if(this.props.type == "Exercise"){
        return (
            <View style={[styles.metricCard, styles.cardExercise]}>
                {/* <Image style={styles.icon} source={require('./path/to/your/heart_icon.png')} /> */}
                <Text style={styles.metricTitle}>{this.props.type}</Text>
                <Text style={styles.metricValue}>
                    {activity_samples ? activity_samples[activity_samples.length-1].appleExerciseTime + " min": "error"}
                </Text>
            </View>
        );
    }
    else if(this.props.type == "Sleep"){
        return (
            <View style={[styles.metricCard, styles.cardSleep]}>
                {/* <Image style={styles.icon} source={require('./path/to/your/heart_icon.png')} /> */}
                <Text style={styles.metricTitle}>{this.props.type}</Text>
                <Text style={styles.metricValue}>
                    {sleep_sample ? sleep_sample[sleep_sample.length-1].value + " Hours": "error"}
                </Text>
            </View>
        );
    }
    else if(this.props.type == "Hydration"){
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
