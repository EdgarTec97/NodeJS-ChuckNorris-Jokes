'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChallengeSchema = Schema({
    id: {
        type: String,
        require: true,
        trim: true
    },
    value: {
        type: String,
        require: true
    },
    iconUrl: {
        type: String,
        require: true
    },
    sourceUrl: {
        type: String,
        require: true
    },
    category: {
        type: Array
    }
});

module.exports = mongoose.model('Challenge',ChallengeSchema);