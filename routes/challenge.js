'use strict'

var express = require('express');
var ChallengeController = require('../controllers/challenge');

var api = express.Router();

api.get('/randomly', ChallengeController.randomly);
api.get('/getAll/:page?', ChallengeController.getAll);
api.post('/words/:page?',ChallengeController.words);
api.post('/byCategory',ChallengeController.byCategory);

module.exports = api;