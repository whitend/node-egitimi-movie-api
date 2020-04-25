//mongodb://<dbuser>:<dbpassword>@dbh11.mlab.com:27117/heroku_75908hd4
//whitend
//060312mlab
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const moviesRouter = require('./routes/movie');

const app = express();

//db connection

const db = require('./helper/db')();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/movies', moviesRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  //express default olarak error sayfasını render ediyor
  //res.render('error');
  //biz bir json döndüreceğiz
  console.log(err);
  res.json({error: {message: err.message, code: err.code}});
});

module.exports = app;