var express = require('express');
var router = express.Router();
var Aircraft = require('../models/Aircraft');

router.get('/', function(req, res) {
  res.send('Маршрутизатор самолётов работает');
});

router.get('/:nick', async function(req, res, next) {
  try {
    const aircraft = await Aircraft.findOne({ nick: req.params.nick });

    if (!aircraft) {
      return next(new Error('Самолёт не найден'));
    }

    res.render('aircraft', {
      title: aircraft.title,
      avatar: aircraft.avatar,
      desc: aircraft.desc,
      flightSpecs: aircraft.flightSpecs,
      technical: aircraft.technical,
      armament: aircraft.armament
    });

  } catch (err) {
    next(err);
  }
});

module.exports = router;
