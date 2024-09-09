// utils/aiService.js
import axios from 'axios';

export const getAIReview = async (code, language, description) => {
  const response = await axios.post(
    'https://api.openai.com/v1/chat/completions',
    {
      model: 'gpt-4',
      messages: [
        { role: 'system', content: 'You are a code reviewer.' },
        {
          role: 'user',
          content: `Please review the following ${language} code: ${code}. ${description}`,
        },
      ],
    },
    {
      headers: {
        Authorization: `Bearer AIzaSyC5pGlq7ucJABiMmtXJ2d0YkOf7lsVcXYs`,
      },
    }
  );
  console.log(response,'====')
  return response.data.choices[0].message.content;
};
