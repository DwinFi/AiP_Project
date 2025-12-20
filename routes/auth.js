var express = require('express');
var router = express.Router();

router.get('/register', function (req, res) {
    res.render('register', {
        title: 'Регистрация'
    });
});

router.post('/register', function (req, res) {

    const { username, email, password, password2 } = req.body;

    console.log('--- Registration form data ---');
    console.log('Username:', username);
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Repeat password:', password2);
    console.log('------------------------------');

    res.redirect('/register');
});

module.exports = router;
