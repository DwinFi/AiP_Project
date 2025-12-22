var express = require('express');
var router = express.Router();
var Aircraft = require('../models/Aircraft');
var checkAuth = require('../middlewares/checkAuth');

router.get('/', function(req, res) {
  res.send('Маршрутизатор самолётов работает');
});

router.get('/:nick', checkAuth, async function(req, res, next) {
  try {
    const aircraft = await Aircraft.findOne({ nick: req.params.nick });

    if (!aircraft) {
      return next(new Error('Самолёт не найден'));
    }

    res.render('plane', {
      title: aircraft.title,
      picture: aircraft.avatar,
      desc: aircraft.desc,
      flight: aircraft.flightSpecs,
      tech: aircraft.technical,
      armament: aircraft.armament
    });

  } catch (err) {
    next(err);
  }
});

module.exports = router;
