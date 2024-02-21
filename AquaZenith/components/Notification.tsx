// import BackgroundFetch from "react-native-background-fetch";
// import PushNotification from "react-native-push-notification";

// class MyApp {
//   componentDidMount() {
//     // Configure the background fetch
//     BackgroundFetch.configure({
//       minimumFetchInterval: 15, // Fetch interval in minutes
//     }, async (taskId) => {
//       console.log("[js] Received background-fetch event: ", taskId);
//       // Perform your hydration check here and schedule notifications
//       this.checkHydrationAndNotify();
//       // Call finish to let the OS know the task is done
//       BackgroundFetch.finish(taskId);
//     }, (error) => {
//       console.log("[js] RNBackgroundFetch failed to start");
//     });
//   }

//   checkHydrationAndNotify() {
//     // Implement hydration check logic here
//     // Based on the result, schedule a local notification
//     PushNotification.localNotification({
//       message: "It's time to hydrate!", // Customize your message based on hydration status
//       date: new Date(Date.now() + 5 * 1000), // Schedule for a specific time, e.g., 5 seconds from now for testing
//     });
//   }
// }
