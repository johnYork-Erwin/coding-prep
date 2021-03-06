'use strict';

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({path: '../.env'});
}

const express = require('express')
const bodyParser = require('body-parser');
const path = require('path');
const cookie = require('cookie-parser');

const app = express()
app.use(bodyParser.json());
app.use(cookie());
// enable static 'public' directory for serving html/css/js files to client
// app.use(express.static(path.join('public')));

const users = require('./routes/users')
const results = require('./routes/results')
const questions = require('./routes/questions')
const token = require('./routes/token')

app.use(users)
app.use(results)
app.use(questions)
app.use(token)

app.use(express.static(path.join(__dirname, "..", "build")));

app.get("/*", function(req, res) {
  res.sendFile(path.join(__dirname, "../build/index.html"));
});

app.use((req, res) => {
  res.sendStatus(404);
});


// Handle Boom errors
app.use((err, _req, res, _next) => {
  console.log('boom error!')
  if (err.output && err.output.statusCode) {
    return res
      .status(err.output.statusCode)
      .set('Content-Type', 'text/plain')
      .send(err.message);
  }

  console.error(err.stack);
  res.sendStatus(500);
});


const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log('listening on port', port)
})
