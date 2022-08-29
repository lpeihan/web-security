'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  username: { type: String, required: true },
  user_id: { type: String, required: true },
  content: { type: String, required: true },
  created_at: { type: Number, default: Date.now() },
});

module.exports = mongoose.model('Comment', CommentSchema);