'use strict';

const bcrypt = require('bcrypt-as-promised');
const jwt = require('jsonwebtoken');
const knex = require('../../knex');
const express = require('express');
const router = express.Router();
const boom = require('boom');
const cookie = require('cookie-parser');

const authorize = function(req, res, next) {
  jwt.verify(req.cookies.token, process.env.JWT_KEY, (err, payload) => {
    if (err) {
      return next(boom.create(401, 'Log in in order to store your results'));
    }
    req.claim = payload;
    return next();
  });
};

router.post('/users', (req, res, next) => {
  knex('users').where('username', req.body.username).first()
    .then((row) => {
      if (row) {
        res.send('Username already in use')
      }
      bcrypt.hash(req.body.password, 12)
        .then((password) => {
          const newUser = {'username': req.body.username, 'hashed_password': password}
          return knex('users').insert(newUser, '*')
        })
        .then((result) => {
          result = result[0]
          delete result.hashed_password;
          res.send(result);
        })
        .catch((err) => {
          return next(err);
        })
    })
    .catch((err) => {
      return next(err)
    })
})

router.get('/users/username', authorize, (req,res,next) => {
  let user = req.claim.userId
  knex('users').where('id', user).select('username')
    .then((username) => {
      res.send(username)
    })
    .catch((err) => next(err))
})

router.get('/users/:id', (req, res, next) => {
  knex('users')
    .where('id', req.params.id)
    .first()
    .then((user) => {
      res.send(user)
    })
    .catch((err) => next(err))
})

module.exports = router;
