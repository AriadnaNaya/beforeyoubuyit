const carritoModel = require("../models/carritoModel");
const juegosModel = require("../models/juegosModel");

const controller = {

    validaKey: (req, res, next) => {
        res.render('key', 
        { title: 'Carga Key',
          nombre: 'Admin',
          apellido: '-'
        });
    },

    cargaJuegos:(req, res, next) => {
  
          //let data = JSON.parse(juegosLista);
          //if (error) throw new Error(error);
          let idJuego = req.params.id;
          let gameList = juegosModel;
          let getRatings = gameList [0].ratings;
      
          // First, get the max vote from the array of objects
          var maxVotes = Math.max(...getRatings.map(e => e.percent));
      
          // Get the object having votes as max votes
          var maxRated = getRatings.find(game => game.percent === maxVotes);
            res.render('carga', {
              nombre: 'Admin',
              apellido: '-',
              title: 'carga',
              juego: gameList [0],
              gameList: juegosModel,
              rating: maxRated.title
            });

    },

    carrito: (req, res, next) => {
        res.render('carrito', {
            nombre: 'Homero',
            apellido: 'Thompson',
            title: 'GAME List',
            carritoList: carritoModel
        });
    },

    confirmacionCompra: (req, res, next) => {
        res.render('confirmacion', {
            nombre: 'Homero',
            apellido: 'Thompson',
            title: 'GAME List',
            carritoList: carritoModel
        });
    },

    detalleProducto: (req, res, next) => {

          //let data = JSON.parse(juegosLista); 
          //const juegosJSONPath = path.join(__dirname, '../data/juegos.json');
          //fs.writeFileSync (juegosJSONPath, JSON.stringify (data, null, " "))
          //if (error) throw new Error(error);
          let idJuego = req.params.id;
          let gameList = juegosModel;
          let getRatings = gameList [idJuego].ratings;

          // First, get the max vote from the array of objects
          var maxVotes = Math.max(...getRatings.map(e => e.percent));
      
          // Get the object having votes as max votes
          var maxRated = getRatings.find(game => game.percent === maxVotes);
      
            res.render('detalle', {
              nombre: 'Homero',
              apellido: 'Thompson',
              title: 'detalle',
              juego: gameList [idJuego],
              rating: maxRated.title
            });
     },



}

module.exports = controller;
      