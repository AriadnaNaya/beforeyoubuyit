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
  create: async (req, res) => {
    try {
      const getCategories = await db.Category.findAll({
        order: [['name', 'ASC']]
      });
      const getDevelopers = await db.Developer.findAll({
        order:[['name', 'ASC']]
      });
      Promise.all([getCategories, getDevelopers])
      .then(([categores, developers]) => {
        res.render('create-form', {
          categories: categores,
          developers: developers,
          user: req.session.user
        });
      });
    } catch(err){
      console.log(err);
    }
  },

  // Create -  Method to store

  // 1 - Create producto
  // 2 - Sacar id de producto en una promesa
  // 2 - then --> categoría por req.body.categoria
  // 4 - then --> developers por req.body.developers 
  // 3 - then --> pasarle array de tiendas
  store: (req, res) => {
    try {
      //Crear objeto con todas las propiedades del form
      //const newId = productsDB.length + 1;

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
      let store = req.body.store;
      let getSelectedChbox = (store) => {
        //Obtiene los tags con el "name" correspondiente
        var inpfields = store.getElementsByName('store');

        // Itera con los checkboxes, guardando los que tienen el estado checked y se pushean a store
        for (var i = 0; i < inpfields.length; i++) {
          if (inpfields[i].checked == true) {
            store.push(inpfields[i].value);
          }
        }
        return store;
      };

      db.Product.create({
        name: req.body.name,
        price: req.body.price,
        developers_id: req.body.developers,
        categories_id: req.body.categories,
        discount: req.body.discount,
        released: req.body.released,
        background_image: 'default-image.png',
        about: req.body.about,
        metacritic: req.body.metacritic,
        rating_bub: req.body.rating_bub,
        game_trailer: game_trailer,
        game_gameplay: game_gameplay,
        game_review: game_review,
        requirements_min: req.body.requirements_min,
        requirements_rec: req.body.requirements_rec
      })
      .then((product) => {
        let storeSelected = [];
        let productId = product.id;
        for (let j = 0; j < store.length; j++) {
          storeSelected.push({
            products_id: productId,
            stores_id: store[j],
            product_key: req.body.product_key
          })
          
        }
        // Obtiene checkboxes seleccionados
        

        db.Product_Store.bulkCreate(storeSelected);
        //Escribir en la tabla pivot --> Necesitamos el id de newProduct
        //res.send(storeSelected);
        res.redirect('/');
      });
    } catch(err){
      console.log(err);
    }
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

    //categories = categories.split(",");
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
    currentProduct.background_image ='default-image.png';
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

// "Product_Stores": {
//   "products_id": 4,
//   "stores_id": 6,
//   "product_key": false
// }



// 1 - Create producto
// 2 - Sacar id de producto en una promesa
// 2 - then --> categoría por req.body.categoria
// 4 - then --> developers por req.body.developers 
// 3 - then --> pasarle array de tiendas