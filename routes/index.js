var express = require('express');
var router = express.Router();
var User = require('../models/user').User;

/* Главная */
router.get('/', function(req, res) {

  if (!req.session.counter) {
    req.session.counter = 1;
  } else {
    req.session.counter++;
  }

  req.session.save(function (err) {
    if (err) {
      console.log('Session save error:', err);
    }

    res
      .cookie('greeting', 'Hi!!!')
      .render('index', {
        title: 'Unusual Military Aviation',
        counter: req.session.counter
      });
  });
});

/* GET login/registration page */
router.get('/logreg', function(req, res, next) {
  res.render('logreg', { title: 'Вход', error: null });
});

/* POST login/registration page */
router.post('/logreg', async function(req, res, next) {
  var username = req.body.username;
  var password = req.body.password;

  var users = await User.find({ username: username });

  if (!users.length) {
    var user = new User({ username: username, password: password });
    await user.save();
    req.session.user_id = user._id;
    res.redirect('/');
  } else {
    var foundUser = users[0];
    if (foundUser.checkPassword(password)) {
      req.session.user_id = foundUser._id;
      res.redirect('/');
    } else {
      res.render('logreg', {
        title: 'Вход',
        error: 'Пароль не верный'
      });
    }
  }
});

router.post('/logout', function(req, res, next) {
  req.session.destroy(function () {
    res.locals.user = null;
    res.redirect('/');
  });
});

module.exports = router;
