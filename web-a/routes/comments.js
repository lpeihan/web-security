const express = require('express');
const router = express.Router();
const Comment = require('../models/comment');


router.post('/create', async (req, res, next) => {
  const user = req.session.user;
  const comment = new Comment({
    username: user.username,
    user_id: user._id,
    content: req.body.content,
  });

  await comment.save();

  res.redirect('/comments');
});

module.exports = router;
