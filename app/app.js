
import { ChatGPTAPI } from 'chatgpt'
import express, { response } from 'express';
import compression from 'compression';
import bodyParser from 'body-parser';
import * as dotenv from 'dotenv'
dotenv.config()
import { Configuration, OpenAIApi } from "openai";

// const openai = require("openai");
// import { bodyParser } from 'bodyParser'
// import { http } from 'http' 
// const express = require('express');
// const bodyParser = require('body-parser');
// const http = require("http");

const app = express();
const port = 6600;

// const compression = require("compression");


// set the view engine to ejs
app.set('view engine', 'ejs');

// // Use body-parser to parse form data
app.use(bodyParser.urlencoded({ extended: true }));


  // index page
  app.get('/', function (req, res) {
    res.render('pages/index'); 
  });

  // about page
  app.get('/about', function(req, res) {
    res.render('pages/about');
  });

  // Set up route for test generation form
  app.get('/generate-test', (req, res) => {
    // Render form for generating test questions
    res.render('pages/generate-test-questions')
  });

// Handle form submission for generating test questions
app.post('/generate-test', (req, res) => {
  // Get user input from form
  const style = req.body.style;
  const subject = req.body.subject;
  const topic = req.body.topic;
  const examBoard = req.body.examBoard;
  const qualification = req.body.qualification;

  const questions = generateQuestions(subject,  examBoard, qualification, style, topic);

  res.render('pages/quiz', {questions});
});

async function generateQuestions(subject, examBoard, qualificationLevel, style, topic) {
  // Use the OpenAI API to access GPT-3
  
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const openai = new OpenAIApi(configuration);

  // Generate the questions and answers using GPT-3
  const questions = [];
  const answers = [];

  // Use GPT-3 to generate the first question and answer
  const question1Prompt = `Generate a ${style} ${subject} question for a ${qualificationLevel} ${examBoard} exam on the topic of ${topic}. {}`;
  const question1Result = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `\n\nQ: ${question1Prompt}\nA:`,
    model: "text-davinci-003",
    temperature: 0.5,
    max_tokens: 150,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
    stop: ["{}"],


  });
  const question1 = {
    question: question1Result.data.choices[0].text
  };
  questions.push(question1);
  answers.push(question1Result.data.choices[0].text.split("\n")[1]);

  // Use GPT-3 to generate the second question and answer
  const question2Prompt = `Generate a ${style} ${subject} question for a ${qualificationLevel} ${examBoard} exam on the topic of ${topic}. {}`;
  const question2Result = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `\n\nQ: ${question1Prompt}\nA:`,
    temperature: 0.5,
    max_tokens: 150,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
    stop: ["{}"],
  });
  const question2 = {
    question: question2Result.data.choices[0].text
  };
  questions.push(question2);
  answers.push(question2Result.data.choices[0].text.split("\n")[1]);

  // Use GPT-3 to generate the third question and answer
  const question3Prompt = `Generate a ${style} ${subject} question for a ${qualificationLevel} ${examBoard} exam on the topic of ${topic}. {}`;
  const question3Result = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `\n\nQ: ${question1Prompt}\nA:`,
    temperature: 0.5,
    max_tokens: 150,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
    stop: ["{}"],
  });
  const question3 = {
    question: question3Result.data.choices[0].text
  };
  questions.push(question3);
  answers.push(question3Result.data.choices[0].text.split("\n")[1]);

  // Use GPT-3 to generate the fourth question and answer
  const question4Prompt = `Generate a ${style} ${subject} question for a ${qualificationLevel} ${examBoard} exam on the topic of ${topic}. {}`;
  const question4Result = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `\n\nQ: ${question1Prompt}\nA:`,
    temperature: 0.5,
    max_tokens: 150,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
    stop: ["{}"],
  });
  const question4 = {
    question: question4Result.data.choices[0].text
  };
  questions.push(question4);
  answers.push(question4Result.data.choices[0].text.split("\n")[1]);

  //  Use GPT-3 to generate the fifth question and answer
   const question5Prompt = `Generate a ${style} ${subject} question for a ${qualificationLevel} ${examBoard} exam on the topic of ${topic}.`;
   const question5Result = await openai.createCompletion({
    model: "text-davinci-003",
     prompt: `\n\nQ: ${question1Prompt}\nA:`,
     temperature: 0.5,
  max_tokens: 150,
  top_p: 1.0,
  frequency_penalty: 0.0,
  presence_penalty: 0.0,
  stop: ["{}"],
   }).then((res) => {console.log(res.data.choices[0].text)})
  // export const askOpen Ai = async () => {
  //   const prompt = `input: What is human life expectancy in the United States?
  //   output:`
  //   const response = await openai.createCompletion("text-davinci-001", {
  //       prompt: prompt,
  //       temperature: 0,
  //       max_tokens: 100,
  //       top_p: 1,
  //       frequency_penalty: 0,
  //       presence_penalty: 0,
  //       stop: ["input:"],
  //   });
  //   return response.data;
  //   }

  //  const question5 = {
  //    question: question5Result.data.choices[0].text
  //  };
  //  questions.push(question5);
  //  answers.push(question5Result.data.choices[0].text.split("\n")[1]);

  //  return questions 
  console.log(`questions and answers are: ${question5Result }`)

  };

app.use((req, res, next) => {
  res.status(400).render('pages/404');
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('pages/500');
});

app.listen(port, () => {
  console.log(`Test generator listening on port  ${port}  !`);
});

