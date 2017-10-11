'use strict';

const bcrypt = require('bcrypt-as-promised');
const jwt = require('jsonwebtoken');
const knex = require('../../knex');
const express = require('express');
const router = express.Router();

const authorize = function(req, res, next) {
  jwt.verify(req.cookies.token, process.env.JWT_KEY, (err, payload) => {
    if (err) {
      return next(boom.create(401, 'Can not log high score, you are not logged in!'));
    }
    req.claim = payload;
    return next();
  });
};

router.get('/questions', (req, res, next) => {
  knex('questions')
    .then((questions) => {
      res.send(questions);
    })
    .catch((err) => next(err));
})

//NEED TO ADD AUTHORIZE HERE!
router.post('/questions', authorize, (req, res, next) => {
  const toInsert = {
    'answer': req.body.answer,
    'prompt': req.body.prompt,
    'expected_outputs': req.body.expected_outputs,
    'difficulty': req.body.difficulty,
    'language': req.body.language,
    'title': req.body.title,
    'duration': req.body.duration,
    'created_by': null
    // 'created_by': req.claim.userId,
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
