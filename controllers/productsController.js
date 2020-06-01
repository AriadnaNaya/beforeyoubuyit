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
        toThousand: toThousand
      });
    },

    validaKey: (req, res, next) => {
        res.render('key', 
        { title: 'Carga Key',
          nombre: 'Admin',
          apellido: '-'
        });
    },

    // Create - Form to create
    create: (req, res) => {
     res.render('create-form');
     console.log('conectado')
    },

    // Create -  Method to store
    store: (req, res) => {
      //Crear objeto con todas las propiedades del form
      const newId = productsDemo.length + 1;
      let categories = req.body.categories;
      categories = categories.split(",")
      
      const newProduct = {
        id: newId,
        name: req.body.name,
        price: req.body.price,
        discount: req.body.discount,
        categories: categories,
        about: req.body.about,
        background_image: 'default-image.png'
      };
      // Lo agregamos al objeto original
      const finalProduct = [...productsDemo, newProduct];
      console.log(finalProduct);
      //Esto crea un nuevo array con todos los onjetos del array y agrega una nueva posicion con el objeto que creamos
      // Sobrescrivimos el JSON
      fs.writeFileSync(productsFilePathDemo, JSON.stringify(finalProduct, null, ' '));
      // redirigimos a la home
      res.redirect('/juegos');
    },

    edit: (req, res) => {
      //obtener id del producto
      id = req.params.id;
      const productToEdit = productsDemo.find(p => p.id == id);
      //renderizar el formulario de edición con los datos obtenidos
      res.render('edit-form', {
        productToEdit: productToEdit
      });

    },

     // Update - Method to update
     update: (req, res) => {
       // editar producto con id obtenido
       id = req.params.id;

       let categories = req.body.categories;
       categories = categories.split(",")

       const currentProduct = productsDemo.find(p => p.id == id);
       currentProduct.name = req.body.name;
       currentProduct.price = req.body.price;
       currentProduct.discount = req.body.discount;
       currentProduct.categories = categories
       currentProduct.about = req.body.about;
       // res.send(products);
       // reescribir json
       fs.writeFileSync(productsFilePathDemo, JSON.stringify(productsDemo, null, ' '));

       // volver al detalle
       res.redirect('/');
     },

    // Delete - Delete one product from DB
    destroy: (req, res) => {
      id = req.params.id;
      let newProducts = productsDemo.filter(p => p.id != id);
      fs.writeFileSync(productsFilePathDemo, JSON.stringify(newProducts, null, ' '));
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
            toThousand: toThousand
        });
    },

    confirmacionCompra: (req, res, next) => {
        res.render('confirmacion', {
            nombre: 'Homero',
            apellido: 'Thompson',
            title: 'GAME List',
            carritoList: productsDB
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
              reqMininimum: gameList[idJuego].requirements.minimum,
              reqRecommended: gameList[idJuego].requirements.recommended,
              rating: gameRatings()
            });
     },



}

module.exports = controller;
      