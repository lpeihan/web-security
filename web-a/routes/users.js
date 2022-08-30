const express = require('express');
const router = express.Router();
const User = require('../models/user');
const {CODE_SUCCESS, CODE_ERROR} = require('../utils/code');

router.post('/login', async (req, res, next) => {
  const {username, password} = req.body;
  const user = await User.findOne({username});

  if (user && user.password === password) {
    req.session.regenerate(async () => {
      req.session.user = user;
  
      res.send({
        code: CODE_SUCCESS,
        message: 'Login successfully'
      });
    });
  } else {
    res.send({
      code: CODE_ERROR,
      message: `We didn't find any matched account, please try again.`
    });
  }
});

router.post('/signup', async (req, res, next) => {
  const user = new User({
    ...req.body,
    balance: 0,
  });
  await user.save();

  res.send({
    code: CODE_SUCCESS,
    message: 'Signup successfully'
  });
});

router.get('/logout', (req, res, next) => {
	req.session.destroy(() => {
		res.clearCookie('sessionid');
		res.redirect('/');
	});
});

router.post('/transfer', async (req, res, next) => {
  if (!req.session.user) {
    res.send({
      code: CODE_ERROR,
      message: 'no permission',
    });
    return;
  }
  let {amount, payee} = req.body;
  amount = parseInt(amount);
  const user = await User.findById(req.session.user._id);

  const receiver = await User.findOne({username: payee});

  if (amount > user.balance) {
    return res.send({
      code: CODE_ERROR,
      message: 'Balance is not enough.'
    });
  }

  user.balance = user.balance - amount;
  receiver.balance = amount + receiver.balance;

  await user.save();
  await receiver.save();

  res.redirect('/transfer');
});

module.exports = router;
