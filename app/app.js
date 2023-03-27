import express from 'express';
import compression from 'compression';
import bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import { Configuration, OpenAIApi } from 'openai';
import { ChatGPTAPI } from 'chatgpt';

dotenv.config();

const app = express();
const port = 6600;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.render('pages/index');
});

app.get('/about', (req, res) => {
  res.render('pages/about');
});

app.get('/generate-test', (req, res) => {
  res.render('pages/generate-test-questions');
});

app.post('/generate-test', async (req, res) => {
  const style = req.body.style;
  const subject = req.body.subject;
  const topic = req.body.topic;
  const examBoard = req.body.examBoard;
  const qualification = req.body.qualification;

  const questions = await generateQuestions(subject, examBoard, qualification, style, topic);

  console.log(questions)
  res.render('pages/quiz', { questions });
  setTimeout(function() {
    // empty setTimeout function
  }, 10000); // wait 10 seconds before rendering the page
});

async function generateQuestions(subject, examBoard, qualificationLevel, style, topic) {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const openai = new OpenAIApi(configuration);

  const questions = [];

  // Use a for loop to generate four questions
  for (let i = 0; i < 4; i++) {
    const questionPrompt = `Generate a ${style} ${subject} question for a ${qualificationLevel} ${examBoard} exam on the topic of ${topic}. {}`;

    // Use GPT-3 to generate the question
    const result = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: `\n\nQ: ${questionPrompt}\nA:`,
      temperature: 0.5,
      max_tokens: 150,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
      stop: ['{}'],
    }).then((res) => {
      // Return the generated question from the callback function
      return res.data.choices[0].text;
    });

    // Add the generated question to the array
    questions.push(result);
  }

  return questions;
}

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
