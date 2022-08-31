const express = require("express");
const router = express.Router();
const User = require("../models/user");
const { CODE_SUCCESS, CODE_ERROR } = require("../utils/code");
const Captcha = require("svg-captcha");

router.post("/login", async (req, res, next) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (user && user.password === password) {
    req.session.regenerate(async () => {
      req.session.user = user;

      res.send({
        code: CODE_SUCCESS,
        message: "Login successfully",
      });
    });
  } else {
    res.send({
      code: CODE_ERROR,
      message: `Username or passord is incorrect, please try again.`,
    });
  }
});

router.post("/signup", async (req, res, next) => {
  const user = new User({
    ...req.body,
    balance: 0,
  });
  await user.save();

  res.send({
    code: CODE_SUCCESS,
    message: "Signup successfully",
  });
});

router.get("/logout", (req, res, next) => {
  req.session.destroy(() => {
    res.clearCookie("sessionid");
    res.redirect("/");
  });
});

router.post("/transfer", async (req, res, next) => {
  if (!req.session.user) {
    res.send({
      code: CODE_ERROR,
      message: "No permission",
    });
    return;
  }
  let { amount, payee, captcha, csrfToken } = req.body;

  if (!csrfToken || req.cookies['csrfToken'] !== csrfToken) {
    res.send({
      code: CODE_ERROR,
      message: 'Token incorrect',
  	});
  	return;
  }

  if (!req.session.captcha || captcha !== req.session.captcha) {
  	res.send({
      code: CODE_ERROR,
      message: 'Captcha incorrect',
  	});
  	return;
  }

  if (!req.headers.referer.includes("www.a.com")) {
    res.send({
      code: CODE_ERROR,
      message: "Referer incorrect",
    });
    return;
  }

  amount = parseInt(amount);
  const user = await User.findById(req.session.user._id);

  const receiver = await User.findOne({ username: payee });

  if (amount > user.balance) {
    return res.send({
      code: CODE_ERROR,
      message: "Balance is not enough.",
    });
  }

  user.balance = user.balance - amount;
  receiver.balance = amount + receiver.balance;

  await user.save();
  await receiver.save();

  res.redirect("/transfer?success=true");
});

router.get("/captcha", (req, res, next) => {
  const captcha = Captcha.create({
    noise: 3,
  });

  req.session.captcha = captcha.text;
  res.type("svg");
  res.send(captcha.data);
});

module.exports = router;
