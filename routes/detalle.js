const fs = require('fs');
const express = require('express');
const router = express.Router();
const request = require("request");
const JuegosModel = require('../models/juegosModel');

/* GET detalle page. */
router.get('/:id', function (req, res, next) {
  
  request(JuegosModel, function (error, response, body) {
    let data = JSON.parse(body);
    idJuego = req.params.id
    let gameList = data
    if (error) throw new Error(error);
      res.render('detalle', {
        nombre: 'Homero',
        apellido: 'Thompson',
        title: 'detalle',
        juego: gameList.results [idJuego],
        id: idJuego
      });
  });
});

module.exports = router;