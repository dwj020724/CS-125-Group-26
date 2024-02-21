import React, { Component, useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, ActivityIndicator, Dimensions} from 'react-native';
import AppleHealthKit, { HealthInputOptions, HealthActivitySummary } from 'react-native-health';
import { LineChart } from 'react-native-chart-kit';


// Define an interface for the component's state
interface HealthDataComponentState {
  stepCountData: Array<{
    startDate: string;
    value: number; // Adjust the type based on the actual data structure
  }> | null;
  activity_samples: any | null;
  loading: boolean;
  error: string | null;
}

// If your component doesn't receive props, you can use an empty interface
interface HealthDataComponentProps {}

class HealthDataComponent extends Component<HealthDataComponentProps, HealthDataComponentState> {
  constructor(props: HealthDataComponentProps) {
    super(props);
    this.state = {
      stepCountData: null,
      activity_samples: null,
      loading: true,
      error: null,
    };
  }

  componentDidMount() {
    this.loadStepCountData();
  }

  loadStepCountData = () => {
    var yesterdaydate = new Date();
    yesterdaydate.setDate(yesterdaydate.getDate() - 1);// get yesterdays date

    this.setState({ loading: true, error: null });
    let options: HealthInputOptions = {
      startDate: new Date(2024,1,1).toISOString(), // optional; default now
      endDate: new Date().toISOString(),
      includeManuallyAdded: true // optional: default true
    };

    AppleHealthKit.getAppleExerciseTime(
        (options),
        (err, results: Array<{startDate: string; value: number}>) => {
            if (err) {
                console.log(err)
                this.setState({ loading: false, error: 'Failed to load data' });
                return
            }      
            // console.log("EXERCISE TIME RESULTS:");     
            // console.log(results);   
            const transformedData = this.transformExerciseData(results);
            this.setState({ activity_samples: transformedData, loading: false });
            
        },
    )

    AppleHealthKit.getDailyStepCountSamples(
      (options),
      (err: Object, results: Array<{startDate: string; value: number}>) => {
        if (err) {
          this.setState({ loading: false, error: 'Failed to load data' });
          return
        }
        // console.log(results)
        this.setState({ stepCountData: results, loading: false });
        
      },
    )
  };

  transformExerciseData = (results:Array<{ startDate: string; value: number; }>) =>{
    interface DataByDate {
        [key: string]: number; // String keys, number values
    }      

    let dataByDate:DataByDate = {};

    results.forEach((entry:any) => {
    const endDate:any = new Date(entry.endDate);
    const startDate:any = new Date(entry.startDate);
    const exerciseSample = entry.value / 60; // Convert seconds to minutes

    const dateKey = endDate.toISOString().split('T')[0]; // Format as YYYY-MM-DD

    if (dataByDate[dateKey]) {
        dataByDate[dateKey] += exerciseSample;
    } else {
        dataByDate[dateKey] = exerciseSample;
    }
    });

    const labels = Object.keys(dataByDate);
    const data = Object.values(dataByDate);

    return {
    labels,
    datasets: [{ data }]
    };
  }

  formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }; 
  renderStepChart() {
    const { stepCountData } = this.state;
    if (!stepCountData) return null;
    const data = {
      labels: stepCountData.map(entry => entry.startDate.split('T')[0]), // Extract the date in YYYY-MM-DD format
      datasets: [{
        data: stepCountData.map(entry => entry.value),
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // Optional: customize the line color
      }],
    };

    return (
        <LineChart
        data={data}
        width={Dimensions.get('window').width - 40} // Adjust width according to the container's padding
        height={220}
        chartConfig={{
          backgroundColor: '#ffffff',
          backgroundGradientFrom: '#fb8c00',
          backgroundGradientTo: '#ffa726',
          decimalPlaces: 0, // Optional: set the decimal places
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#ffa726"
          }
        }}
        bezier
        />
      
      
    );
  }

  renderExerciseChart() {
    const { activity_samples } = this.state;
    return (
        <LineChart
        data={activity_samples}
        width={Dimensions.get('window').width - 40} // Adjust width according to the container's padding
        height={220}
        chartConfig={{
          backgroundColor: '#ffffff',
          backgroundGradientFrom: '#fb8c00',
          backgroundGradientTo: '#ffa726',
          decimalPlaces: 0, // Optional: set the decimal places
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#ffa726"
          }
        }}
        bezier
      />
    );
  }


  render() {
    // const { stepCountData, loading, error } = this.state;

    // return (
    //   <View>
    //     <Text style={styles.titleText}>Step Count Data</Text>
    //     {stepCountData ? (
    //       stepCountData.map((entry, index) => (
    //         <Text key={index} style={styles.stepCountText}>
    //           {entry.startDate} - {entry.value} steps
    //         </Text>
    //       ))
    //     ) : (
    //       <Text style={styles.loadingText}>Loading...</Text>
    //     )}
    //     <Button title="Refresh Data" onPress={this.loadStepCountData} />
    //   </View>
    // );
    const { stepCountData, activity_samples,loading, error } = this.state;

    const formatDate = (dateString: string) => {
      const options: Intl.DateTimeFormatOptions = {
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit',
      };
      return new Date(dateString).toLocaleDateString('en-CA', options); // 'en-CA' uses the YYYY/MM/DD format
    };
    if (activity_samples && Object.values(activity_samples.labels).length > 0){
      console.log("showing exercise")
      return (
        <View style={styles.container}>
          <Text style={styles.titleText}>Step Count Data</Text>
          {loading && <ActivityIndicator size="large" color="#0000ff" />}
          {error && <Text style={styles.errorText}>{error}</Text>}
          {stepCountData && this.renderStepChart()}
          {activity_samples && this.renderExerciseChart()}
          {stepCountData && stepCountData.map((entry, index) => (
            <Text key={index} style={styles.stepCountText}>
              {formatDate(entry.startDate)} - {entry.value} steps
            </Text>
          ))}
          <Button title="Refresh Data" onPress={this.loadStepCountData} color="#841584" />
        </View>
      );
    }
    else {
      console.log("not showing exercise");
      console.log(activity_samples);
      return (
        <View style={styles.container}>
          <Text style={styles.titleText}>Step Count Data</Text>
          {loading && <ActivityIndicator size="large" color="#0000ff" />}
          {error && <Text style={styles.errorText}>{error}</Text>}
          {stepCountData && this.renderStepChart()}
          {stepCountData && stepCountData.map((entry, index) => (
            <Text key={index} style={styles.stepCountText}>
              Not Showing Exercise Chart Because No Data
              {/* {formatDate(entry.startDate)} - {entry.value} steps */}
            </Text>
          ))}
          <Button title="Refresh Data" onPress={this.loadStepCountData} color="#841584" />
        </View>
      );
    }
  }
    
}

const styles = StyleSheet.create({
  // titleText: {
  //   fontSize: 20,
  //   fontWeight: 'bold',
  //   color: 'black',
  // },
  // stepCountText: {
  //   fontSize: 16,
  //   color: 'black',
  // },
  // loadingText: {
  //   fontSize: 16,
  //   fontStyle: 'italic',
  //   color: 'black',
  // },
  
// });
container: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  padding: 20,
  backgroundColor: '#F5FCFF', // A light background color
},
titleText: {
  fontSize: 22,
  fontWeight: 'bold',
  color: '#333', // Dark text for contrast
  marginBottom: 20, // Adds some space below the title
},
stepCountText: {
  fontSize: 16,
  color: '#666', // Slightly lighter than the title text for hierarchy
  margin: 5, // Adds space around each step count entry
},
errorText: {
  fontSize: 16,
  color: 'red', // Error color
  marginBottom: 20, // Adds some space below the error message
},
chart: {
  width: '100%', // Takes the full width of the container
  borderRadius: 8, // Optional: adds rounded corners to your chart
},

button: {
  marginTop: 20, // Adds space above the button
  backgroundColor: '#841584', // Button color
  color: '#FFFFFF', // Text color for the button
},
});



export default HealthDataComponent;
