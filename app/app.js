
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

  console.log(questions)
  res.render('pages/quiz', { questions: questions});
  setTimeout(function() {
    
  }, 10000); // wait 10 seconds before rendering the page
  // 
 
});

async function generateQuestions(subject, examBoard, qualificationLevel, style, topic) {
  // Use the OpenAI API to access GPT-3
  
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const openai = new OpenAIApi(configuration);

  // Generate the questions and answers using GPT-3
  const questions = [];
  // const answers = [];

  // Use GPT-3 to generate the first question and answer
  const question1Prompt = `Generate a ${style} ${subject} question for a ${qualificationLevel} ${examBoard} exam on the topic of ${topic}. {}`;
  const question1Result =await openai.createCompletion({
    model: "text-davinci-003",
     prompt: `\n\nQ: ${question1Prompt}\nA:`,
     temperature: 0.5,
  max_tokens: 150,
  top_p: 1.0,
  frequency_penalty: 0.0,
  presence_penalty: 0.0,
  stop: ["{}"],
   }).then((res) => {
    // Return the generated question and answer from the callback function
    return res.data.choices[0].text;
  });
  questions.push(question1Result);
  // answers.push(question1Result.data.choices[0].text.split("\n")[1]);

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
   }).then((res) => {
    // Return the generated question and answer from the callback function
    return res.data.choices[0].text;
  });
  questions.push(question2Result);
  // answers.push(question2Result.data.choices[0].text.split("\n")[1]);

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
   }).then((res) => {
    // Return the generated question and answer from the callback function
    return res.data.choices[0].text;
  });
  questions.push(question3Result);
  // answers.push(question3Result.data.choices[0].text.split("\n")[1]);

  // Use GPT-3 to generate the fourth question and answer
  const question4Prompt = `Generate a ${style} ${subject} question for a ${qualificationLevel} ${examBoard} exam on the topic of ${topic}. {}`;
  const question4Result =await openai.createCompletion({
    model: "text-davinci-003",
     prompt: `\n\nQ: ${question1Prompt}\nA:`,
     temperature: 0.5,
  max_tokens: 150,
  top_p: 1.0,
  frequency_penalty: 0.0,
  presence_penalty: 0.0,
  stop: ["{}"],
   }).then((res) => {
    // Return the generated question and answer from the callback function
    return res.data.choices[0].text;
  });
  questions.push(question4Result);
  // answers.push(question4Result.data.choices[0].text.split("\n")[1]);

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
   }).then((res) => {
    // Return the generated question and answer from the callback function
    return res.data.choices[0].text;
  });
  questions.push(question5Result);

  console.log(questions)
  return{
    questions: questions }

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

