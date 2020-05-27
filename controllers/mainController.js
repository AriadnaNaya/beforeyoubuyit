const juegosModel = require("../models/juegosModel");

const controller = {

    homePageLogueado: (req, res, next) => {
  
        res.render('home', {
          title: 'Home',
          nombre: 'Homero',
          apellido: 'Thompson'
        });
    },

    homeLogueo: (req, res, next)=> {
        res.render('index', 
        { title: 'Login',
          nombre: 'Homero',
          apellido: 'Thompson'
        });
    },

    juegos: (req, res, next) => {
  
        //request(JuegosModel, function (error, response, body) {
          let data = juegosModel;
          //if (error) throw new Error(error);
            res.render('juegos', {
              nombre: 'ARI',
              apellido: 'PRUEBA',
              title: 'GAME List',
              gameList: data
            });
       // });
  },
    
    
}




module.exports = controller;