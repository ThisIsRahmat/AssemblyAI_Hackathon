
import { ChatGPTAPI } from 'chatgpt'
import express from 'express';
import compression from 'compression';
import bodyParser from 'body-parser';
import * as dotenv from 'dotenv'
dotenv.config()
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

  const questions = generateQuestions(subject, topic, examBoard, style, qualification);

  res.render('pages/quiz', questions);
});

async function generateQuestions(subject, topic, examBoard, style, qualification) {

   // sessionToken is required; see below for details
   const api = new ChatGPTAPI({
    sessionToken: process.env.SESSION_TOKEN,
    markdown: false
  });

  // ensure the API is properly authenticated
  await api.ensureAuth()


  // Use GPT-3 to generate exam-style questions
  const response = await api.sendMessage(
    
    `Generate 5 ${style} questions for ${examBoard} ${qualification} ${subject} exam on the topic of ${topic}. Make sure to include answers for each question and make sure to generate answers for each question and include the appropriate number of marks per question. Return the results in a json format`
  )
  // const questions = response['questions']
  // answers = questions[answer]

  // Return the generated questions in a JSON object
  return {
    questions: response,
    // answers: re
  };
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

