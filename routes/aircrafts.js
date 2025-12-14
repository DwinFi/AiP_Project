var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.send('Маршрутизатор для авиационной техники');
});

router.get('/:nick', function(req, res, next) {
    res.send('Самолёт: ' + req.params.nick);
});

module.exports = router;
