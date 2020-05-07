const fs = require('fs');
const express = require('express');
const router = express.Router();
const request = require("request");
const JuegosModel = require('../models/juegosModel');

/* GET detalle page. */
router.get('/', function (req, res, next) {
  
  request(JuegosModel, function (error, response, body) {
    let data = JSON.parse(body);
    if (error) throw new Error(error);
      res.render('carga', {
        nombre: 'Admin',
        apellido: '-',
        title: 'carga',
        gameList: data,
      });
  });
});

module.exports = router;