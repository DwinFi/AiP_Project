var express = require('express');
var router = express.Router();

router.get('/register', function (req, res) {
    res.render('register', {
        title: 'Регистрация',
        errors: [],
        success: false,
        formData: {}
    });
});

router.post('/register', function (req, res) {

    const { username, email, password, password2 } = req.body;
    let errors = [];

    if (!username || !email || !password || !password2) {
        errors.push('Все поля обязательны для заполнения');
    }

    if (password !== password2) {
        errors.push('Пароли не совпадают');
    }

    if (errors.length > 0) {
        return res.render('register', {
            title: 'Регистрация',
            errors: errors,
            success: false,
            formData: {
                username,
                email
            }
        });
    }

    res.render('register', {
        title: 'Регистрация',
        errors: [],
        success: true,
        formData: {}
    });
});

module.exports = router;
