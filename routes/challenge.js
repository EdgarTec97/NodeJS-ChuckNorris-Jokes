'use strict'

var express = require('express');
var ChallengeController = require('../controllers/challenge');

var api = express.Router();

api.get('/randomly', ChallengeController.randomly);
api.get('/getAll/:page?', ChallengeController.getAll);
api.get('/words/:page?',ChallengeController.words);
api.get('/byCategory',ChallengeController.byCategory);

module.exports = api;