
const express = require('express');
const bodyParser = require('body-parser');
const http = require("http");

const app = express();
const port = 5000;

// set the view engine to ejs
app.set('view engine', 'ejs');



// index page

app.get('/', function (req, res) {
  res.render('/pages/index'); 
})

// about page
app.get('/about', function(req, res) {
  res.render('pages/about');
});

// about page
app.get('/generate-test', function(req, res) {
  res.render('pages/test');
});

// testing page
// Set up route for test generation
app.get('/generate-test', (req, res) => {
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
      const test = createQuestion(response.choices[0].text);
      // Send test back to client
      res.send(test);
    }
  );
});

// app.post('/generate-test', (req, res) => {
// }


//Function to generate questions 

function createQuestions(subject, topic, qualification, examBoard){
    // sessionToken is required; see below for details
    const api = new ChatGPTAPI({
      sessionToken: process.env.SESSION_TOKEN
    })


  //     // ensure the API is properly authenticated
  //  await api.ensureAuth()

  const conversation = api.sendMessage()


  // send a message and wait for the response
  const questions = await api.sendMessage(

    'Generate a list of 10' + style + 'questions on the topic of ' + topic + 'for a' +  qualification + ' exam from the ' + examBoard + '
    );
  
  console.log(questions)
  return questions
}

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
  res.status(404).send("Sorry can't find that!");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(port, () => {
  console.log('Test generator listening on port ' + port + '!');
});
