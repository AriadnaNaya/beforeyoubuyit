let fs = require('fs');
let express = require('express');
let router = express.Router();
let JuegosModel = require('../models/juegosModel');


router.get('/', function (req, res, next) {
  console.log(JuegosModel);
  
  res.render('users', {
    nombre: 'Homero',
    apellido: 'Thompson',
    title: 'GAME List',
    gameList: JuegosModel
  });
});

module.exports = router;
