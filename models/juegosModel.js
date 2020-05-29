/*let options = {
  method: 'GET',
  url: 'https://rawg-video-games-database.p.rapidapi.com/games',
  headers: {
    'x-rapidapi-host': 'rawg-video-games-database.p.rapidapi.com',
    'x-rapidapi-key': '1af368a0admshbaf56e0791f798cp1f836bjsnc1ced84aa968'
  }
};
*/



const fs = require('fs');
const path = require('path');

const juegosPath = path.join(__dirname, '../data/juegos.json');
const dataBaseJuegos = fs.readFileSync(juegosPath, "utf-8");

const juegosLista = JSON.parse (dataBaseJuegos)
module.exports = juegosLista;