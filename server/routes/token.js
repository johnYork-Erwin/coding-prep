'use strict';

const express = require('express');
const bcrypt = require('bcrypt-as-promised');
const jwt = require('jsonwebtoken');
const boom = require('boom');
const knex = require('../../knex');
const router = express.Router();

router.post('/token', (req, res, next) => {
  let user;
  const username = req.body.username;
  const password = req.body.password;
  knex('users').where('username', username).first()
    .then((row) => {
      if (!row) {
        throw boom.create(400, 'Username is not registered');
      }
      user = row;
      return bcrypt.compare(password, user.hashed_password)
    })
    .then(() => {
      const claim = { userId: user.id };
      const token = jwt.sign(claim, process.env.JWT_KEY, {
        expiresIn: '7 days'
      })
      res.cookie('token', token, {
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
        secure: router.get('env') === 'production'
      });
      delete user.hashed_password;
      res.send(user)
    })
    .catch(bcrypt.MISMATCH_ERROR, () => {
      throw boom.create(400, 'Bad username or password');
    })
    .catch((err) => {
      return next(err);
    })
})

router.get('/token', (req, res) => {
  jwt.verify(req.cookies.token, process.env.JWT_KEY, (err, payload) => {
    if (err) {
      return res.send(false);
    }
    res.send(true);
  });
});

router.delete('/token', (req, res, next) => {
  res.clearCookie('token');
  res.end();
});

module.exports = router;
