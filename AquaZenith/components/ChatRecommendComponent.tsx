import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, ScrollView } from 'react-native';
import { generateResponse, getModels } from '../ChatGPTService';
import UserService from './UserService';

const ChatRecommend = () => {
    const [messages, setMessages] = useState<string[]>([]);
    const [userInput, setUserInput] = useState('');

    useEffect(() => {
        const init = async () => {
            //const openAIModels = await getModels();
            //console.log(openAIModels); // For demonstration

            sendMessage();
        };

        init();
    }, []); // The empty array ensures this effect runs only once after initial render


  
    const sendMessage = async () => {
        
        var userInput = `I will put data with a users Water intake, sleep intake and their exercise along with their current goals for each. you will give short 1 sentence recommendations on what they can do to reach their goal. use these goals to make suggestions on which category to prioritize. If they have slept and hydrated a lot this day then maybe suggest an exercise that is a bit more intense. if they have not slept and hydrated well then maybe suggest to drink some more water while going on a walk or something simple. PLEASE ALWAYS SUGGEST AN EXERCISE FOR THE USER! Please respond in the format
        Water: 
        Sleep: 
        Exercise:
        
        Data - Water: ${(global as any).gHealthDataWaterSam}/${UserService.waterIntake}ml, Sleep ${(global as any).gHealthDataSleepDur}/${UserService.sleepGoal} hours, Exercise: ${(global as any).gHealthDataExerciseMin}/${UserService.exerciseMin} minutes`
      
        // setMessages(prevMessages => [...prevMessages, `User: ${userInput}`]);
        // console.log(userInput);
        console.log("-----------------------------------------------------\n" + userInput)
        const botResponse = await generateResponse(userInput);
        console.log(botResponse);
        setMessages(prevMessages => [...prevMessages, `${botResponse}`]);
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
  
  export default ChatRecommend;