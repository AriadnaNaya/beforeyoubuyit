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
    let idJuego = req.params.id;
    let gameList = data;
    let getRatings = gameList.results[0].ratings;

    // First, get the max vote from the array of objects
    var maxVotes = Math.max(...getRatings.map(e => e.percent));

    // Get the object having votes as max votes
    var maxRated = getRatings.find(game => game.percent === maxVotes);
      res.render('carga', {
        nombre: 'Admin',
        apellido: '-',
        title: 'carga',
        juego: gameList.results[0],
        gameList: data,
        rating: maxRated.title
      });
  });
});

module.exports = router;