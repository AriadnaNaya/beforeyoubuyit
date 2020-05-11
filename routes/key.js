var express = require('express');
var router = express.Router();

/* GET key page. */
router.get('/', function(req, res, next) {
  res.render('key', 
  { title: 'Carga Key',
    nombre: 'Admin',
    apellido: '-'
  });
});

module.exports = router;
