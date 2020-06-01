const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const methodOverride = require('method-override');

// LiveReload dependencies
const connectLivereload = require("connect-livereload");
const livereload = require('livereload');

// Controllers
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
//const juegosRouter = require('./routes/juegos');
const homeRouter = require('./routes/home');
//const detalleRouter = require('./routes/detalle');
const keyRouter = require('./routes/key');
const cargaRouter = require('./routes/carga');
const carritoRouter = require('./routes/carrito');
const confirmacionRouter = require('./routes/confirmacion');
const productsRouter = require('./routes/products');

const app = express();
app.use(connectLivereload());

app.use(methodOverride('_method'));

// Trhird party and custom js
app.use('/assets', [
  express.static(__dirname + '/build/js'),
  express.static(__dirname + '/node_modules/jquery/dist/'),
  express.static(__dirname + '/node_modules/bootstrap/dist/js/'),
  express.static(__dirname + '/node_modules/material-design-icons/iconfont/'),
  express.static(__dirname + '/public/images/')
]);


// view engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views')); // Define la ubicación de la carpeta de las Vistas

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'build')));
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, 'build'));

liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});

// Navigation
app.use('/', indexRouter);
app.use('/users', usersRouter);
//app.use('/juegos', juegosRouter);
app.use('/home', homeRouter);
//app.use ('/detalle', detalleRouter);
app.use ('/key', keyRouter);
app.use ('/carga', cargaRouter);
app.use('/carrito', carritoRouter);
app.use('/confirmacion', confirmacionRouter);
app.use('/products', productsRouter);

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
