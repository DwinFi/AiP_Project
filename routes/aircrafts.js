var express = require('express');
var router = express.Router();
var Aircraft = require('../models/Aircraft');

router.get('/', function(req, res, next) {
  res.send('Маршрутизатор авиационной техники');
});

router.get('/:nick', async function(req, res, next) {
  try {
    const aircrafts = await Aircraft.find({ nick: req.params.nick });

    if (!aircrafts.length) {
      return next(new Error('Самолёт с таким идентификатором не найден'));
    }

    const aircraft = aircrafts[0];

    res.render('aircraft', {
      title: aircraft.name,
      aircraft: aircraft
    });

  } catch (err) {
    next(err);
  }
});

module.exports = router;
