import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, ScrollView, StyleSheet } from 'react-native';
import { generateResponse, getModels } from '../ChatGPTService';
import UserService from './UserService';

interface ChatRecommendProps {
  recommendationType: string;
}

const ChatRecommend: React.FC<ChatRecommendProps> = ({ recommendationType = "Type a message"}) => {
    const [messages, setMessages] = useState<string[]>([]);
    const [userInput, setUserInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const init = async () => {
            //const openAIModels = await getModels();
            //console.log(openAIModels); // For demonstration
            if(recommendationType == 'summary'){
              console.log(UserService.sleepGoal);
              var message = 
`I will put data with a users Water intake, sleep intake, and their exercise along with their current goals for each.
you will give short 2 sentence recommendations on what they can do to reach their goal for each category.
Use these goals to make suggestions on which category to prioritize.
If they have slept and hydrated a lot this day then maybe suggest an exercise that is a bit more intense and vice versa.
If they have not slept and hydrated well then maybe suggest to drink some more water while going on a walk or something simple.
PLEASE ALWAYS SUGGEST A SPECIFIC EXERCISE FOR THE USER!
Please respond in the following format:

Water: <your reccommendation>

Sleep: <your reccommendation>

Exercise: <your reccommendation>
        
Now Here is the Data -> Water: ${UserService.currWaterIntake}/${UserService.waterIntake}ml, Sleep ${UserService.currSleepDur}/${UserService.sleepGoal} hours, Exercise: ${UserService.currExerciseMin}/${UserService.exerciseMin} minutes`
              sendMessage(message);
            }else if(recommendationType == 'exercise'){
              var message = 
`I will put data with a users exercise minutes along with their current exercise minutes goal. 
You will give short 2 sentence recommendation on what they can do to reach their goal. 
If they have exercised a lot this day then maybe suggest an exercise that is a bit less intense and vice versa.
PLEASE ALWAYS SUGGEST A SPECIFIC EXERCISE FOR THE USER! 
Please respond in the following format:

Exercise Recommendation: <your reccommendation>
        
Now Here is the Data -> Exercise: ${UserService.currExerciseMin}/${UserService.exerciseMin} minutes`
              sendMessage(message);
            }else if(recommendationType == 'hydration'){
              var message = 
`I will put data with a users water intake along with their current goal. 
You will give short 2 sentence recommendation on what they can do to reach their goal. 
If they have drank water a lot this day then maybe suggest to keep up the good work.
If they have not drank a lot of water then give recommendations on how they can reach their goal.
Also include a fun fact about hydration.
Please respond in the following format:

Water Recommendation: <your reccommendation>

Fun Fact: <your fun fact>
        
Now Here is the Data -> Water: ${UserService.currWaterIntake}/${UserService.waterIntake}ml`
              sendMessage(message);
            }else if(recommendationType == 'sleep'){
              var message = 
`I will put data with a users sleep along with their current goal. 
You will give short 2 sentence recommendation on what they can do to reach their goal. 
If they have slept a lot this day then maybe suggest to keep up the good work.
If they have not slept a lot then give recommendations on how they can reach their goal.
Also include a fun fact about sleep.
Please respond in the following format:

Sleep Recommendation: <your reccommendation>

Fun Fact: <your fun fact>
        
Now Here is the Data -> Sleep: ${UserService.currSleepDur}/${UserService.sleepGoal} Hours`
              sendMessage(message);
            }else{
              console.log("Error in ChatRecommend props type");
            }
        };

        init();
    }, []); // The empty array ensures this effect runs only once after initial render


  
    const sendMessage = async (message: string) => {
        
        // setMessages(prevMessages => [...prevMessages, `User: ${userInput}`]);
        // console.log(userInput);
        setIsLoading(true);
        console.log("-----------------------------------------------------\n" + message)
        const botResponse = await generateResponse(message);
        console.log(botResponse);
        setMessages(prevMessages => [`${botResponse}`]);
        setIsLoading(false);
        setUserInput('');
    };

    const getopenAIModels = async () => {
        return await getModels();
    }
  
    return (
      <View>
        <ScrollView>
          {messages.map((msg, index) => (
            <Text key={index}>{msg}</Text>
          ))}
          {isLoading && <Text style={styles.loadingText}>Loading Recommendation...</Text>}
        </ScrollView>
        <View>
          {/* <TextInput 
            value={userInput}
            onChangeText={setUserInput}
            placeholder="Type a message"
          /> */}
          {/* <Button title="Send" onPress={sendMessage} />
          <Button title="Models" onPress={getopenAIModels} /> */}
        </View>
      </View>
    );
  };

  const styles = StyleSheet.create({
    loadingText: {
      fontSize: 16,
      fontStyle: 'italic',
      color: 'black',
    },
    });
  
  export default ChatRecommend;