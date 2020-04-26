var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('Conectado');
  
  res.render('home', {
    title: 'Home',
    nombre: 'Homero',
    apellido: 'Thompson'
  });
});

module.exports = router;
