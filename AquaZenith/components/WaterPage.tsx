import React, { Component, useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, ActivityIndicator, Dimensions, useColorScheme, SafeAreaView,
    ScrollView,
    StatusBar,} from 'react-native';
import AppleHealthKit, { HealthInputOptions } from 'react-native-health';
import { BarChart } from 'react-native-chart-kit';
import {
    Colors,
  } from 'react-native/Libraries/NewAppScreen';
  
interface HealthDataComponentState {
    hydrationData: Array<{
        startDate: string;
        value: number; // Adjust the type based on the actual data structure for water intake (in liters or ml)
      }> | null;
    loading: boolean;
    error: string | null;
  }

  interface HealthDataComponentProps {}

  class WaterData extends Component<HealthDataComponentProps, HealthDataComponentState> {
    constructor(props: HealthDataComponentProps) {
      super(props);
      this.state = {
        hydrationData: null,
        loading: true,
        error: null,
      };
    }

    componentDidMount() {
        this.loadHydrationData();
    }

    loadHydrationData = () => {
        this.setState({ loading: true, error: null });
        let options: HealthInputOptions = {
            startDate: new Date(2024, 1, 1).toISOString(), //start date = yesterday
            endDate: new Date().toISOString(), // end date = now
            includeManuallyAdded: true // optional: default true
        };
        AppleHealthKit.getWaterSamples(
            options,
            (err: any, results: Array<{ startDate: string; value: number }>) => {
              if (err) {
                this.setState({ loading: false, error: 'Failed to load data' });
                return;
              }
              const hydrationData = results.map(entry => ({
                ...entry,
                value: Math.round(entry.value * 1000) // Convert to milliliters if necessary
              }));
            //   console.log('Hydration data loaded:', hydrationData);
              this.setState({ hydrationData, loading: false });
            },
          );
        };
    
    
    renderChart() {
        const { hydrationData } = this.state;
        if (!hydrationData) return null;
    
        const chartData = {
            labels: hydrationData.map(entry => {
              // Convert the startDate to a Date object and format it
              const date = new Date(entry.startDate);
              return `${date.getFullYear()}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}`;
            }),
            datasets: [{
              data: hydrationData.map(entry => entry.value)
            }]
          };
        // console.log(chartData);

        const chartConfig = {
            backgroundColor: '#ffffff',
            backgroundGradientFrom: '#ffffff',
            backgroundGradientTo: '#ffffff',
            color: (opacity = 1) => `rgba(33, 150, 243, ${opacity})`, // Blue color
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Black color for the labels
            style: {
              borderRadius: 16
            },
            barPercentage: 0.7,
            propsForBackgroundLines: {
              stroke: '#e3e3e3'
            },
            propsForLabels: {
              fontSize: '14' // Adjust the font size as needed
            },
            barRadius: 10, // Rounded bar edges
            decimalPlaces: 0, // Values are whole numbers
            fillShadowGradient: '#87CEEB', // Gradient color for bars
            fillShadowGradientOpacity: 1,
          };
    
          return (
            <BarChart
              style={{
                borderRadius: 16
              }}
              data={chartData}
              width={Dimensions.get('window').width - 40} // Adjust based on your styles
              height={220}
              yAxisLabel=""
              yAxisSuffix="ml"
              chartConfig={chartConfig}
              verticalLabelRotation={0}
              fromZero={true}
            />
          );
        }
    render() {
        const { hydrationData, loading, error } = this.state;
        const formatDate = (dateString: string) => {
            const options: Intl.DateTimeFormatOptions = {
              year: 'numeric', 
              month: '2-digit', 
              day: '2-digit',
            };
            return new Date(dateString).toLocaleDateString('en-CA', options); // 'en-CA' uses the YYYY/MM/DD format
          };
        return (
        <View style={styles.container}>
      <Text style={styles.titleText}>Hydration Data</Text>
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      {error && <Text style={styles.errorText}>{error}</Text>}
      {hydrationData && this.renderChart()}
      {hydrationData && hydrationData.map((entry, index) => (
        <Text key={index} style={styles.stepCountText}>
          {formatDate(entry.startDate)} - {entry.value} mL
        </Text>
      ))}
      <Button title="Refresh Data" onPress={this.loadHydrationData} color="#841584" />
    </View>
        );
    }
}

function WaterPage(): React.JSX.Element {
    const isDarkMode = useColorScheme() === 'dark';
  
    const backgroundStyle = {
      backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };
  
    return (
        <SafeAreaView style={backgroundStyle}>
          <StatusBar
            barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            backgroundColor={backgroundStyle.backgroundColor}
          />
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={backgroundStyle}>
            
            <View
              style={{
                backgroundColor: isDarkMode ? Colors.black : Colors.white,
              }}>
                   <WaterData/>
            </View>
          </ScrollView>
        </SafeAreaView>
    );
  }
const styles = StyleSheet.create({
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
      color: 'black',
    },
    loadingText: {
      fontSize: 16,
      fontStyle: 'italic',
      color: 'black',
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
    });

  export default WaterPage;