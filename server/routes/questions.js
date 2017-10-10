'use strict';

const bcrypt = require('bcrypt-as-promised');
const jwt = require('jsonwebtoken');
const knex = require('../knex');
const router = express.Router();
const express = require('express');
// 
// router.get('/questions', (req, res, next) => {
//
// })
//
// router.post('/questions', (req, res, next) => {
//
// })
