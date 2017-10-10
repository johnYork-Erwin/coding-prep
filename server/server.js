'use strict';

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

app.use(users)
app.use(results)
app.use(questions)

app.use((req, res) => {
  res.sendStatus(404);
});

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log('listening on port', port)
})
