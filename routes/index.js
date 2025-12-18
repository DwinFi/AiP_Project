var express = require('express');
var router = express.Router();

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

/* БИ-1 */
router.get('/bi1', function(req, res) {
  res.render('plane', {
    title: "Советский истребитель БИ-1",
    picture: "/images/bi.png",
    desc: "БИ (от Березняк-Исаев) — советский опытный перехватчик-ракетоплан."
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
