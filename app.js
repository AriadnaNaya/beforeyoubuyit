var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// LiveReload dependencies
var connectLivereload = require("connect-livereload");
const livereload = require('livereload');

// Controllers
var indexRouter = require('./routes/index');
var registroRouter = require('./routes/registro');
var usersRouter = require('./routes/users');
var homeRouter = require('./routes/home');
var detalleRouter = require('./routes/detalle');
var keyRouter = require('./routes/key');
var cargaRouter = require('./routes/carga');

var app = express();
app.use(connectLivereload());

// Trhird party and custom js
app.use('/assets', [
  express.static(__dirname + '/build/js'),
  express.static(__dirname + '/node_modules/jquery/dist/'),
  express.static(__dirname + '/node_modules/bootstrap/dist/js/'),
  express.static(__dirname + '/node_modules/material-design-icons/iconfont/'),
]);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'build')));
var liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, 'build'));

liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});

// Navigation
app.use('/', indexRouter);
app.use('/registro', registroRouter);
app.use('/users', usersRouter);
app.use('/home', homeRouter);
app.use ('/detalle', detalleRouter);
app.use ('/key', keyRouter);
app.use ('/carga', cargaRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
