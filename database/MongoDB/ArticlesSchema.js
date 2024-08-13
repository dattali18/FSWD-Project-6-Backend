/**
 * @desc This file will contain the schema for the articles collection in MongoDB
 * the schema for an article will be:
 * - Title
 * - Author: as user_id : int
 * - Content: as a string
 * - CreatedDate: as a date
 * - LastUpdated: as a date, updated when the article is updated
 * - Tags: as an array of strings
 */

const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: Number,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
    lastUpdated: {
        type: Date,
        default: Date.now,
    },
    tags: {
        type: [String]
    }
});

module.exports = mongoose.model('Articles', articleSchema);