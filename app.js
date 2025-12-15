var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var mongoose = require('mongoose');

// ✅ Подключаем ТУ ЖЕ БД, где лежат самолёты
mongoose.connect('mongodb://127.0.0.1:27017/aviationDB');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var aircraftsRouter = require('./routes/aircrafts');

var app = express();

// View engine (EJS — это нормально)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Layout system
var expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);
app.set('layout', 'layout'); // layout.ejs

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/aircrafts', aircraftsRouter);

// 404 handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
