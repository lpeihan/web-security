'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  created_at: { type: Number, default: Date.now() },
  balance: { type: Number },
});

module.exports = mongoose.model('User', UserSchema);