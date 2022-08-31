const express = require('express');
const router = express.Router();
const Comment = require('../models/comment');
const User = require('../models/user');
const {getRandomString} = require('../utils');

router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/search', (req, res, next) => {
  res.setHeader('Content-Security-Policy', `default-src 'self'`);

  res.render('search', {
    word: req.query.word,
    pic: req.query.pic,
  });
});

router.get('/comments', async (req, res, next) => {
  if (!req.session.user) {
    res.redirect('/login');
    return;
  }

  const comments = await Comment.find({});
  res.render('comments', {comments});
});

router.get('/transfer', async (req, res, next) => {
  if (!req.session.user) {
    res.redirect('/login');
    return;
  }

  const user = await User.findById(req.session.user._id);
  const csrfToken = getRandomString();
  res.cookie('csrfToken', csrfToken);
  res.render('transfer', {user, csrfToken});
});

router.get('/login', (req, res, next) => {
  res.render('login');
});

router.get('/signup', (req, res, next) => {
  res.render('signup');
});

module.exports = router;
