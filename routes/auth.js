var express = require('express');
var router = express.Router();

/* Страница регистрации */
router.get('/register', function (req, res) {
    res.render('register', {
        title: 'Регистрация'
    });
});

module.exports = router;
