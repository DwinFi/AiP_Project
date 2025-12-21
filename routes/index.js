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
  res.render('logreg', {
    title: 'Вход',
    error: null
  });
});

/* POST login/registration page */
router.post('/logreg', async function(req, res, next) {
  var username = req.body.username;
  var password = req.body.password;

  var users = await User.find({ username: username });

  if (!users.length) {
    // пользователь не найден — регистрация
    var user = new User({
      username: username,
      password: password
    });

    await user.save();
    req.session.user_id = user._id;
    res.redirect('/');
  } else {
    // пользователь найден — проверка пароля
    var foundUser = users[0];

    if (foundUser.checkPassword(password)) {
      req.session.user_id = foundUser._id;
      res.redirect('/');
    } else {
      // ❗ ошибка аутентификации
      res.render('logreg', {
        title: 'Вход',
        error: 'Пароль не верный'
      });
    }
  }
});

/* Самолёты */
router.get('/bi1', function(req, res) {
  res.render('plane', {
    title: "Советский истребитель БИ-1",
    picture: "/images/bi.png",
    desc: "БИ — советский опытный перехватчик-ракетоплан."
  });
});

router.get('/ho229', function(req, res) {
  res.render('plane', {
    title: "Horten Ho 229",
    picture: "/images/ho229.png",
    desc: "Экспериментальное реактивное летающее крыло Люфтваффе."
  });
});

router.get('/f117', function(req, res) {
  res.render('plane', {
    title: "F-117 Nighthawk",
    picture: "/images/f117.png",
    desc: "Первый в мире серийный стелс-самолёт."
  });
});

module.exports = router;
