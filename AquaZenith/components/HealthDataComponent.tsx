// // import React, { Component } from 'react';
// // import { View, Text, Button } from 'react-native';
// // import AppleHealthKit from 'react-native-health';

// // class HealthDataComponent extends Component {
// //   constructor(props) {
// //     super(props);
// //     this.state = {
// //       stepCountData: null,
// //     };
// //   }

// //   componentDidMount() {
// //     this.loadStepCountData();
// //   }

// //   loadStepCountData = () => {
// //     let options = {
// //       startDate: (new Date(2022, 1, 1)).toISOString(), // Adjust dates as needed
// //       endDate: (new Date()).toISOString(),
// //     };

// //     AppleHealthKit.getDailyStepCountSamples(options, (err, results) => {
// //       if (err) {
// //         console.error("Error fetching step count data: ", err);
// //         return;
// //       }
// //       this.setState({ stepCountData: results });
// //     });
// //   };

// //   render() {
// //     const { stepCountData } = this.state;

// //     return (
// //       <View>
// //         <Text>Step Count Data</Text>
// //         {stepCountData ? (
// //           stepCountData.map((entry, index) => (
// //             <Text key={index}>
// //               {entry.startDate} - {entry.value} steps
// //             </Text>
// //           ))
// //         ) : (
// //           <Text>Loading...</Text>
// //         )}
// //         <Button title="Refresh Data" onPress={this.loadStepCountData} />
// //       </View>
// //     );
// //   }
// // }

// // export default HealthDataComponent;



import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import AppleHealthKit from 'react-native-health';

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
    let options = {
      startDate: (new Date(2022, 1, 1)).toISOString(), // use a proper start date
      endDate: (new Date(2024, 2, 7)).toISOString(), // use a proper end date
    };

    AppleHealthKit.getDailyStepCountSamples(options, (err: any, results: Array<{startDate: string; value: number}>) => {
      if (err) {
        console.error("Error fetching step count data: ", err);
        return;
      }
      this.setState({ stepCountData: results });
    });
  };

  render() {
    const { stepCountData } = this.state;

    return (
      <View>
        <Text>Step Count Data</Text>
        {stepCountData ? (
          stepCountData.map((entry, index) => (
            <Text key={index}>
              {entry.startDate} - {entry.value} steps
            </Text>
          ))
        ) : (
          <Text>Loading...</Text>
        )}
        <Button title="Refresh Data" onPress={this.loadStepCountData} />
      </View>
    );
  }
}

export default HealthDataComponent;
