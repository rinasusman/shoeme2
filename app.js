var createError = require('http-errors');
var express = require('express');
const session = require('express-session');
const path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const { v4: uuidv4 } = require("uuid");
const bodyParser =require("body-parser")
const mongoose = require('mongoose');
require('dotenv').config();
mongoose.connect(process.env.DATABASE_URL)




const adminRoute = require('./routes/adminRoute');
const userRoute = require('./routes/userRoute');
const { request } = require('http');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(bodyParser.json({ extended: true }))
app.use(bodyParser.urlencoded({ extended: true }))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(session({
  secret: uuidv4(),
  resave: false,
  saveUninitialized: true,
 
}))


app.use('/', userRoute);
app.use('/admin', adminRoute);
app.use((req, res, next) => {
  res.header("cache-control", "no-cache private,no-store,must-revalidate,max-stale=0,post-check=0,pre--check=0");
  next();
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
res.status(404).render('404')
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
