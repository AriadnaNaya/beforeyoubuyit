var express = require('express');
var router = express.Router();

/* GET login page. */
router.get('/', function(req, res, next) {
  res.render('registro', 
  { title: 'Registro',
    nombre: 'Homero',
    apellido: 'Thompson'
  });
});

module.exports = router;
