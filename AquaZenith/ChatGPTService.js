import axios from 'axios';
import { OPENAI_KEY } from '@env';

const instance = axios.create({
  baseURL: 'https://api.openai.com/v1',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${OPENAI_KEY}`,
    'OpenAI-Beta': 'assistants=v1'
  }
});

export const generateResponse = async (message) => {
  try {
    // console.log(OPENAI_KEY);
    const response = await instance.post('/chat/completions', {
        messages: [{ role: "system", content: message }],
        model: "gpt-4",
    });
    // console.log(response.data.choices[0].message.content);
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error("Error in generateResponse: " + error);
    return '';
  }
};

export const getModels = async (message) => {
    try {
      const response = await instance.get('/models');
      // console.log(response);
      return response;
    } catch (error) {
      console.error("Error in getModels" + error);
      return '';
    }
  };