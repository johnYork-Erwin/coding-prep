'use strict';

const express = require('express');
const bcrypt = require('bcrypt-as-promised');
const jwt = require('jsonwebtoken');
const boom = require('boom');
const knex = require('../../knex');
const cookie = require('cookie-parser')
const body = require('body-parser')
const router = express.Router();

const authorize = function(req, res, next) {
  jwt.verify(req.cookies.token, process.env.JWT_KEY, (err, payload) => {
    if (err) {
      return next(boom.create(401, 'Log in in order to store your results'));
    }
    req.claim = payload;
    return next();
  });
};

//get most recent attempt for each queston_id then do a select on that
//or filter our all but the most recent attempt fro each question id manually
router.get('/results/failures', authorize, (req, res, next) => {
  let user = req.claim.userId;
  knex('results').where('results.user_id', user)
    .andWhere('results.correct', false)
    .innerJoin('questions', 'questions.id', 'results.question_id').select('questions.id')
    .then((questions) => {
      return res.send(questions);
    })
    .catch((err) => {
      return next(err);
    })
})


router.get('/results/user', authorize, (req, res, next) => {
  let user = req.claim.userId;
  knex('results').where('user_id', user).select('results.id', 'results.user_id', 'results.correct', 'results.answer as result_answer', 'results.time_taken', 'results.attempted_at',
        'questions.id as question_id', 'questions.prompt', 'questions.title', 'questions.language', 'questions.difficulty')
      .innerJoin('questions', 'results.question_id', 'questions.id')
      .then((result) => {
        return res.send(result);
    })
    .catch((err) => {
      return next(err);
    })
})

router.post('/results', authorize, (req, res, next) => {
  let user = req.claim.userId
  let object = {
    'question_id':req.body.question_id,
    'time_taken': req.body.time_taken,
    'answer':req.body.answer,
    'attempted_at':req.body.attempted_at,
    'correct':req.body.correct,
    'user_id':user
  }
  knex('results').insert(object, '*')
    .then((result) => {
      return res.send(result);
    })
    .catch((err) => {
      return next(err);
    })
})



module.exports = router;
