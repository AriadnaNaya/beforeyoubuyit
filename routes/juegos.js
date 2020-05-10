const fs = require('fs');
const express = require('express');
const router = express.Router();
const request = require("request");
const JuegosModel = require('../models/juegosModel');

router.get('/', function (req, res, next) {
  
  request(JuegosModel, function (error, response, body) {
    let data = JSON.parse(body);
    if (error) throw new Error(error);
      res.render('juegos', {
        nombre: 'Homero',
        apellido: 'Thompson',
        title: 'GAME List',
        gameList: data
      });
  });
});

module.exports = router;
