const express = require('express');
const bodyParser = require('body-parser');
const http = require("http");

const app = express();
const port = 5000;

// set the view engine to ejs
app.set('view engine', 'ejs');

// Use body-parser to parse form data
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
  res.render('pages/generate-test-questions');
});

// Handle form submission for generating test questions
app.post('/generate-test', (req, res) => {
  // Get user input from form
  const style = req.body.style;
  const subject = req.body.subject;
  const topic = req.body.topic;
  const examBoard = req.body.examBoard;

  // Use OpenAI to generate test questions based on user input
  openai.completions.create(
    {
      engine: "text-davinci-002",
      prompt: `${style} ${subject} ${topic} ${examBoard}`,
      max_tokens: 1024,
      n: 1,
      stop: "",
    },
    function(error, response) {
      if (error) throw error;
      // Use generated test questions to create test
      const test = createTest(response.choices[0].text);
      // Render test in quizlet format
      res.render('pages/quiz', { test: test });
    }
  );
});

// Function to create test from generated questions
function createTest(questions) {
  let test = "";
  // Add each generated question to test
  for (const question of questions) {
    test += `${question}\n\n`;
  }
  return test;
}

app.use((req, res, next) => {
  res.status(400).render('pages/400');
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('pages/500');
});

app.listen(port, () => {
  console.log('Test generator listening on port ' + port + '!');
}); 
