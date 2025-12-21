const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const expressLayouts = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');

const indexRouter = require('./routes/index');
const aircraftsRouter = require('./routes/aircrafts');
const authRouter = require('./routes/auth');

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/aviationDB');

mongoose.connection.on('connected', () => {
    console.log('MongoDB connected');
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(expressLayouts);
app.set('layout', 'layout');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(
    session({
        name: 'connect.sid',
        secret: 'secret_key',
        resave: false,
        saveUninitialized: false,
        store: new MongoStore({
            mongooseConnection: mongoose.connection,
            collection: 'sessions'
        }),
        cookie: {
            maxAge: 1000 * 60 * 60
        }
    })
);

app.use(require("./middlewares/createUser.js"));

app.use(function (req, res, next) {
    if (!req.session.counter) {
        req.session.counter = 1;
    } else {
        req.session.counter++;
    }

    res.locals.counter = req.session.counter;
    res.locals.greeting = req.cookies.greeting || '';

    next();
});


app.use('/', indexRouter);
app.use('/aircrafts', aircraftsRouter);
app.use('/', authRouter);

module.exports = app;
