import React, { Component, useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import AppleHealthKit, { HealthInputOptions } from 'react-native-health';

// Define an interface for the component's state
interface HealthDataComponentState {
  stepCountData: Array<{
    startDate: string;
    value: number; // Adjust the type based on the actual data structure
  }> | null;
}

// If your component doesn't receive props, you can use an empty interface
interface HealthDataComponentProps {}

class HealthDataComponent extends Component<HealthDataComponentProps, HealthDataComponentState> {
  constructor(props: HealthDataComponentProps) {
    super(props);
    this.state = {
      stepCountData: null,
    };
  }

  componentDidMount() {
    this.loadStepCountData();
  }

  loadStepCountData = () => {

    let options: HealthInputOptions = {
      startDate: new Date(2024, 1, 1).toISOString(), // optional; default now
      endDate: new Date().toISOString(),
      includeManuallyAdded: true // optional: default true
    };

    AppleHealthKit.getDailyStepCountSamples(
      (options),
      (err: Object, results: Array<{startDate: string; value: number}>) => {
        if (err) {
          return
        }
        console.log(results)
        this.setState({ stepCountData: results });
        
      },
    )
  };

  render() {
    const { stepCountData } = this.state;

    return (
      <View>
        <Text style={styles.titleText}>Step Count Data</Text>
        {stepCountData ? (
          stepCountData.map((entry, index) => (
            <Text key={index} style={styles.stepCountText}>
              {entry.startDate} - {entry.value} steps
            </Text>
          ))
        ) : (
          <Text style={styles.loadingText}>Loading...</Text>
        )}
        <Button title="Refresh Data" onPress={this.loadStepCountData} />
      </View>
    );
  }



}

const styles = StyleSheet.create({
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  stepCountText: {
    fontSize: 16,
    color: 'white',
  },
  loadingText: {
    fontSize: 16,
    fontStyle: 'italic',
    color: 'white',
  },
});



export default HealthDataComponent;
