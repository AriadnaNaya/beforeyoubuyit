const fs = require('fs');
const path = require('path');

const carritoModel = require("../models/carritoModel");
const juegosModel = require("../models/juegosModel");

const productsFilePath = path.join(__dirname, '../data/juegos.json');
const productsFilePathDemo = path.join(__dirname, '../data/juegosDemo.json');
const productsFilePathDB = path.join(__dirname, '../data/juegosDB.json');

const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const productsDemo = JSON.parse(fs.readFileSync(productsFilePathDemo, 'utf-8'));
const productsDB = JSON.parse(fs.readFileSync(productsFilePathDB, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const finalPrice = (price, discount) => {
  if (discount > 0) {
    price = price - (price * discount / 100);
  } else {
    price = price;
  }
  return toThousand(price);
}


const controller = {

    root: (req, res) => {
      res.render('products', 
      {
        products: productsDB,
        finalPrice: finalPrice,
        toThousand: toThousand, 
        user: req.session.user
        
      });
    },

    search: (req, res, next) => {
        let id = req.query.id;
        const results = productsDB.find(p => p.id == id);
        
        res.render('reseults', {
          results: results
        });
    },

    // Create - Form to create
    create: (req, res) => {
     res.render('create-form', {
		  user: req.session.user
		});
    },

    // Create -  Method to store
    store: (req, res) => {
      //Crear objeto con todas las propiedades del form
      const newId = productsDB.length + 1;
      let categories = req.body.categories;
      let developers = req.body.developers;
      let store = req.body.store;
      let requirements = {
        minimum: req.body.requirements_min,
        recommended: req.body.requirements_rec
      }
      // Obtiene checkboxes seleccionados
      let getSelectedChbox = (store) => {
        //Obtiene los tags con el "name" correspondiente
        var inpfields = store.getElementsByName('store');
        
        // Itera con los checkboxes, guardando los que tienen el estado checked y se pushean a store
        for (var i = 0; i < inpfields.length; i++) {
          if (inpfields[i].checked == true) store.push(inpfields[i].value);
        }
        return store;
      }
      
      categories = categories.split(",");
      developers = developers.split(",");

      function extractVideoID(url) {
        var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
        var match = url.match(regExp);
        if (match && match[7].length == 11) {
          return match[7];
        } else {
          alert("No se pudo extaer ID del video! Debes ingresar una dirección de youtube!");
        }
      }

      let game_trailer = extractVideoID(req.body.game_trailer);
      let game_review = extractVideoID(req.body.game_review);
      let game_gameplay = extractVideoID(req.body.game_gameplay);
      
      const newProduct = {
        id: newId,
        name: req.body.name,
        price: req.body.price,
        discount: req.body.discount,
        released: req.body.released,
        background_image: req.files[0].filename,
        about: req.body.about,
        developers: developers,
        store: store,
        metacritic: req.body.metacritic,
        rating_bub: req.body.rating_bub,
        ratings: null,
        categories: categories,
        game_trailer: game_trailer,
        game_gameplay: game_gameplay,
        game_review: game_review,
        requirements: requirements
      };
      // Lo agregamos al objeto original
      const finalProduct = [...productsDB, newProduct];
      //console.log(newProduct);
      //Esto crea un nuevo array con todos los onjetos del array y agrega una nueva posicion con el objeto que creamos
      // Sobrescrivimos el JSON
      fs.writeFileSync(productsFilePathDB, JSON.stringify(finalProduct, null, ' '));
      // redirigimos a la productos
      res.redirect('/');
    },

    edit: (req, res) => {
      //obtener id del producto
      id = req.params.id;
      const productToEdit = productsDB.find(p => p.id == id);
      //renderizar el formulario de edición con los datos obtenidos
      res.render('edit-form', {
        productToEdit: productToEdit,
        user: req.session.user
      });

    },

     // Update - Method to update
     update: (req, res) => {
       // editar producto con id obtenido
       id = req.params.id;

       let categories = req.body.categories;
       let developers = req.body.developers;
       let store = req.body.store;
       let requirements = {
         minimum: req.body.requirements_min,
         recommended: req.body.requirements_rec
       }
       // Obtiene checkboxes seleccionados
       let getSelectedChbox = (store) => {
        //Obtiene los tags con el "name" correspondiente
        var inpfields = store.getElementsByName('store');

        // Itera con los checkboxes, guardando los que tienen el estado checked y se pushean a store
        for (var i = 0; i < inpfields.length; i++) {
          if (inpfields[i].checked == true) store.push(inpfields[i].value);
        }
        return store;
      }

      categories = categories.split(",");
      developers = developers.split(",");

      function extractVideoID(url) {
        var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
        var match = url.match(regExp);
        if (match && match[7].length == 11) {
          return match[7];
        } else {
          alert("No se pudo extaer ID del video! Debes ingresar una dirección de youtube!");
        }
      }

      let game_trailer = extractVideoID(req.body.game_trailer);
      let game_review = extractVideoID(req.body.game_review);
      let game_gameplay = extractVideoID(req.body.game_gameplay);

      const currentProduct = productsDB.find(p => p.id == id);
      currentProduct.name = req.body.name;
      currentProduct.price = req.body.price;
      currentProduct.discount = req.body.discount;
      currentProduct.released = req.body.released;
      currentProduct.background_image = req.files[0].filename;
      currentProduct.about = req.body.about;
      currentProduct.developers = developers;
      currentProduct.store = store;
      currentProduct.metacritic = req.body.metacritic;
      currentProduct.rating_bub = req.body.rating_bub;
      currentProduct.ratings = null;
      currentProduct.categories = categories;
      currentProduct.game_trailer = game_trailer;
      currentProduct.game_gameplay = game_gameplay;
      currentProduct.game_review = game_review;
      currentProduct.requirements = requirements;
      //console.log(currentProduct);
      // reescribir json
      fs.writeFileSync(productsFilePathDB, JSON.stringify(productsDB, null, ' '));

      // volver al detalle
      res.redirect('/');
     },

    // Delete - Delete one product from DB
    destroy: (req, res) => {
      id = req.params.id;
      let newProducts = productsDB.filter(p => p.id != id);
      fs.writeFileSync(productsFilePathDB, JSON.stringify(newProducts, null, ' '));
      res.redirect('/');
    },

    cargaJuegos:(req, res, next) => {
  
          //let data = JSON.parse(juegosLista);
          //if (error) throw new Error(error);
          let idJuego = req.params.id;
          let gameList = juegosModel;
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
              gameList: products,
              rating: maxRated.title
            });

    },

    carrito: (req, res, next) => {
        res.render('carrito', {
            nombre: 'Homero',
            apellido: 'Thompson',
            title: 'Carrito',
            carritoList: productsDB,
            finalPrice: finalPrice,
            toThousand: toThousand,
            user: req.session.user
        });
    },

    confirmacionCompra: (req, res, next) => {
      console.log (productsDB)
        res.render('confirmacion', {
            nombre: 'Homero',
            apellido: 'Thompson',
            title: 'GAME List',
            carritoList: productsDB,
            user: req.session.user
        });
    },

    detail: (req, res, next) => {
          let idJuego = req.params.id-1;
          let gameList = productsDB;
          let gameRatings = () => {
            if (gameList[idJuego].ratings) {
              let getRatings = gameList[idJuego].ratings;
              // First, get the max vote from the array of objects
              var maxVotes = Math.max(...getRatings.map(e => e.percent));

              // Get the object having votes as max votes
              var maxRated = getRatings.find(game => game.percent === maxVotes);
              return maxRated.title;
            } else {
              return null;
            }
          }
            res.render('detalle', {
              nombre: 'Homero',
              apellido: 'Thompson',
              title: 'detalle',
              juego: gameList[idJuego],
              finalPrice: finalPrice,
              toThousand: toThousand,
              rating: gameRatings(),
              user: req.session.user
            });
     },



}

module.exports = controller;
      