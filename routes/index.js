var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {

  if (!req.session.views) {
    req.session.views = 1;
  } else {
    req.session.views++;
  }

  req.session.save(function (err) {
    if (err) {
      console.log('Session save error:', err);
    }

    res
      .cookie('greeting', 'Hi!!!')
      .render('index', { title: 'Unusual Military Aviation' });
  });
});

/* БИ-1 */
router.get('/bi1', function(req, res) {
  res.render('plane', {
    title: "Советский истребитель БИ-1",
    picture: "/images/bi.png",
    desc: "БИ (от Березняк-Исаев) — советский опытный перехватчик-ракетоплан.",
    flight: {
      "Максимальная скорость (2000 м)": "799 км/ч",
      "Скороподъёмность": "100 м/с",
      "Время виража": "23 с",
      "Максимальная высота": "12 000 м",
      "Длина разбега": "300 м"
    },
    tech: {
      "Экипаж": "1 человек",
      "Двигатель": "Исаев Д-1а"
    }
  });
});

/* Ho 229 */
router.get('/ho229', function(req, res) {
  res.render('plane', {
    title: "Horten Ho 229",
    picture: "/images/ho229.png",
    desc: "Экспериментальное реактивное летающее крыло Люфтваффе."
  });
});

/* F-117 */
router.get('/f117', function(req, res) {
  res.render('plane', {
    title: "F-117 Nighthawk",
    picture: "/images/f117.png",
    desc: "Первый в мире серийный стелс-самолёт."
  });
});

module.exports = router;
