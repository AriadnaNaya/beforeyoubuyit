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

const db = require('../database/models');

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

  root: async (req, res) => {
    try {
      let product = await db.Product.findAll({
        include: [{
          association: 'stores'
        }]
      });
      res.render('products', {
        products: product,
        finalPrice: finalPrice,
        toThousand: toThousand,
        user: req.session.user

      });
    } catch (err) {
      console.log(err);

    }
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
  store: async (req, res) => {
    //Crear objeto con todas las propiedades del form
    // await db.Product.create({
      
    // })
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

    //Stores - Categories son tablas intermedias
    //Se puede armar un modelo de la tabla pivot y asociarlo
    //Hacer un for donde por cada categoría/store cree un nuevo registro en la tabla pivot
    //Se captura el ID y hacemos un for con create para cada valor
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

  order: async (req, res, next) => {
    try {
      let product = await db.Product.findAll({
        include: [{
          association: 'stores'
        }]
      });
      res.render('carrito', {
        nombre: 'Homero',
        apellido: 'Thompson',
        title: 'Carrito',
        carritoList: product,
        finalPrice: finalPrice,
        toThousand: toThousand,
        user: req.session.user
      });
    } catch(err){
      console.log(err);
    }
  },

  confirmacionCompra: (req, res, next) => {
    res.render('confirmacion', {
      nombre: 'Homero',
      apellido: 'Thompson',
      title: 'GAME List',
      carritoList: productsDB,
      user: req.session.user
    });
  },

  detail: async (req, res, next) => {
    try {
      let idJuego = req.params.id;
      let gameList = await db.Product.findByPk(idJuego, {
        include: [
          {association: 'stores'},
          {association: 'developers'},
          {association: 'categories'}
        ]
      });
      res.render('detalle', {
        juego: gameList,
        finalPrice: finalPrice,
        toThousand: toThousand,
        user: req.session.user
      });
      
    } catch(err) {
      console.log(err);
    }
  },



}

module.exports = controller;