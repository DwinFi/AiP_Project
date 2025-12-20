const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const expressLayouts = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');

const indexRouter = require('./routes/index');
const aircraftsRouter = require('./routes/aircrafts');

const app = express();

/* =======================
   MongoDB connection
   ======================= */
mongoose.connect('mongodb://127.0.0.1:27017/aviationDB');

mongoose.connection.on('connected', () => {
    console.log('MongoDB connected');
});

/* =======================
   View engine
   ======================= */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('layout', 'layout');

/* =======================
   Middleware
   ======================= */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/* =======================
   Session (MongoDB store)
   ======================= */
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

/* =======================
   Global variables (9.5)
   ======================= */
app.use(function (req, res, next) {
    res.locals.counter = req.session.counter || 0;
    res.locals.greeting = req.cookies.greeting || '';
    next();
});

/* =======================
   Routes
   ======================= */
app.use('/', indexRouter);
app.use('/aircrafts', aircraftsRouter);

/* =======================
   Export
   ======================= */
module.exports = app;
