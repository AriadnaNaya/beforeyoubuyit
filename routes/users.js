let fs = require('fs');
let express = require('express');
let router = express.Router();

let request = require("request");

let options = {
  method: 'GET',
  url: 'https://rawg-video-games-database.p.rapidapi.com/games',
  headers: {
    'x-rapidapi-host': 'rawg-video-games-database.p.rapidapi.com',
    'x-rapidapi-key': '1af368a0admshbaf56e0791f798cp1f836bjsnc1ced84aa968'
  }
};


/* GET users listing. */
router.get('/', function(req, res, next) {
  request(options, function (error, response, body) {
    let data = JSON.parse(body);
    
    res.render('users', {
      nombre: 'Homero',
      apellido: 'Thompson',
      title: 'GAME List',
      gameList: data
    });
  });
});

module.exports = router;
