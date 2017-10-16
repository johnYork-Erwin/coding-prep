'use strict';

const bcrypt = require('bcrypt-as-promised');
const jwt = require('jsonwebtoken');
const knex = require('../../knex');
const express = require('express');
const router = express.Router();

const authorize = function(req, res, next) {
  jwt.verify(req.cookies.token, process.env.JWT_KEY, (err, payload) => {
    if (err) {
      return next(boom.create(401, 'You are not logged in!'));
    }
    req.claim = payload;
    return next();
  });
};

router.get('/questions', (req, res, next) => {
  knex('questions').select('questions.id')
    .then((questions) => {
      res.send(questions);
    })
    .catch((err) => next(err));
})

router.get('/questions/none', authorize, (req, res, next) => {
  let user = req.claim.userId;
  knex('questions').innerJoin('results', 'results.question_id', 'questions.id').where('results.correct', false).andWhere('results.user_id', user)
    .select('questions.id')
    .then((questions) => {
      return res.send(questions);
    })
    .catch((err) => next(err));
})

router.get('/questions/:duration/:language/:difficulty', (req, res, next) => {
  knex('questions').where('duration', '=', Number(req.params.duration)).andWhere('language', '=', req.params.language)
    .andWhere('difficulty', '=', req.params.difficulty)
    .then((questions) => {
      res.send(questions);
    })
    .catch((err) => {
      next(err);
    })
})

router.get('/questions/:id', (req, res, next) => {
  knex('questions').where('questions.id', req.params.id).innerJoin('users', 'questions.created_by', 'users.id').select('users.username as created_by', 'questions.answer', 'questions.difficulty', 'questions.duration', 'questions.expected_outputs', 'questions.id as id', 'questions.language', 'questions.prompt', 'questions.title')
    .then((question) => {
      res.send(question);
    })
    .catch((err) => next(err));
})

router.post('/questions', authorize, (req, res, next) => {
  const toInsert = {
    'answer': req.body.answer,
    'prompt': req.body.prompt,
    'expected_outputs': req.body.expected_outputs,
    'difficulty': req.body.difficulty,
    'language': req.body.language,
    'title': req.body.title,
    'duration': req.body.duration,
    'created_by': req.claim.userId,
  }
  knex('questions').insert(toInsert, '*')
    .then((result) => {
      return res.send(result);
    })
    .catch((err) => {
      return next(err);
    })
})

module.exports = router;
