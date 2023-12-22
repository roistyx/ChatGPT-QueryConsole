const { Configuration, OpenAI } = require('openai');

const readline = require('readline');
require('dotenv').config();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function queryOpenAI(userInput) {
  // const configuration = new Configuration({
  //   apiKey: process.env.OPENAI_API_KEY,
  // });
  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const chatCompletion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'user',
          content: userInput,
        },
      ],
      temperature: 1,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
    // console.log(
    //   'OpenAI Response:',

    // );

    return chatCompletion.choices[0].message;
  } catch (error) {
    console.error('OpenAI Error:', error.message);
  }
}

async function startDialog() {
  const askQuestion = () => {
    return new Promise((resolve) => {
      rl.question('Ask a question: ', (userInput) => {
        resolve(userInput);
      });
    });
  };

  while (true) {
    const userInput = await askQuestion();
    if (userInput.toLowerCase() === 'exit') break;
    const response = await queryOpenAI(userInput);
    console.log('OpenAI Response:', response.content);
  }

  rl.close();
}

startDialog();
