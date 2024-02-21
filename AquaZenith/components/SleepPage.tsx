import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, ActivityIndicator, Dimensions } from 'react-native';
import AppleHealthKit, { HealthValue } from 'react-native-health';
import { BarChart } from 'react-native-chart-kit';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const SleepData = () => {
  const [sleepData, setSleepData] = useState({ labels: [], datasets: [{ data: [] }] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadSleepData();
  }, []);

  const loadSleepData = () => {
    setLoading(true);
    setError(null);
    const options = {
      startDate: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString(), // start date = yesterday
      endDate: new Date().toISOString(), // end date = now
      includeManuallyAdded: true,
    };
    AppleHealthKit.getSleepSamples(options, (err, results) => {
      if (err) {
        setLoading(false);
        setError('Failed to load data');
        return;
      }
      const transformedData = transformSleepData(results);
      setSleepData(transformedData);
      setLoading(false);
    });
  };

  const transformSleepData = (sleepData) => {
    let dataByDate = {};

    sleepData.forEach((entry) => {
      const endDate = new Date(entry.endDate);
      const startDate = new Date(entry.startDate);
      const sleepDuration = (endDate - startDate) / (1000 * 60 * 60); // Convert ms to hours

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
  };

  const chartConfig = {
    backgroundColor: '#ffffff',
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    decimalPlaces: 2, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(40, 203, 252, ${opacity})`, // color for bar
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // color for labels, should be black
    barPercentage: 0.5,
    fillShadowGradient: '#007bff', // Your desired bar color, if this is the correct prop
    fillShadowGradientOpacity: 1, // Set to 1 for solid color
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: "6",
      strokeWidth: "2",
      stroke: "#ffa726"
    }
  };
  

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-CA', options); // 'en-CA' uses the YYYY/MM/DD format
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Sleep Data</Text>
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      {error && <Text style={styles.errorText}>{error}</Text>}
      {!loading && sleepData.labels.length > 0 && (
        <BarChart
        data={sleepData}
        width={Dimensions.get('window').width - 16}
        height={220}
        yAxisLabel=""
        yAxisSuffix="h" // Added suffix for clarity
        yAxisInterval={1} // Include every label on the Y axis
        fromZero = {true}
        chartConfig={chartConfig}
        style={{
          marginVertical: 8,
          borderRadius: 16
        }}
      />
      )}
      {!loading && sleepData.labels.map((label, index) => (
        <Text key={index} style={styles.stepCountText}>
          {formatDate(label)} - {sleepData.datasets[0].data[index].toFixed(2)} hours
        </Text>
      ))}
      <Button title="Refresh Data" onPress={loadSleepData} color="#841584" />
    </View>
  );
};

// Styles remain the same as your previous code
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
      backgroundColor: '#F5FCFF',
    },
    titleText: {
      fontSize: 22,
      fontWeight: 'bold',
      color: '#333',
      marginBottom: 20,
    },
    stepCountText: {
      fontSize: 16,
      color: 'black',
    },
    errorText: {
      fontSize: 16,
      color: 'red',
      marginBottom: 20,
    },
  });
export default SleepData;
