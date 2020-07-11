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

const formatReleaseDate = (date) => {
  let parts = date.split('-');
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  // Please pay attention to the month (parts[1]); JavaScript counts months from 0:
  // January - 0, February - 1, etc.
  var mydate = new Date(Date.UTC(parts[0], parts[1] - 1, parts[2]));
  //mydate = mydate.toLocaleDateString('es-ES', options);
  mydate = mydate.toDateString('es-ES');
  return mydate;
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
      const getStores = await db.Store.findAll();
      Promise.all([getCategories, getDevelopers, getStores])
      .then(([categores, developers, stores]) => {
        res.render('create-form', {
          categories: categores,
          developers: developers,
          stores: stores,
          user: req.session.user
        });
      });
    } catch(err){
      console.log(err);
    }
  },

  // Create -  Method to store
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
        release: req.body.release,
        background_image: 'default-image.svg',
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
  //obtener id del producto
  // id = req.params.id;
  // const productToEdit = productsDB.find(p => p.id == id);
  //renderizar el formulario de edición con los datos obtenidos
  edit: (req, res) => {
    
    try {
      const getProduct = db.Product.findByPk(req.params.id);
      const getCategories = db.Category.findAll({
        order: [
          ['name', 'ASC']
        ]
      });
      const getDevelopers = db.Developer.findAll({
        order: [
          ['name', 'ASC']
        ]
      });
      const getStores = db.Store.findAll();
      Promise.all([getProduct, getCategories, getDevelopers, getStores])
        .then(([product, categories, developers, stores]) => {
          res.render('edit-form', {
            productToEdit: product,
            categories: categories,
            developers: developers,
            stores: stores,
            user: req.session.user
          });
        });
    } catch (err) {
      console.log(err);
    }
    

  },

  // Update - Method to update
  update: (req, res) => {
    // editar producto con id obtenido
    //id = req.params.id;

    try {
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

      db.Product.update({
          name: req.body.name,
          price: req.body.price,
          developers_id: req.body.developers,
          categories_id: req.body.categories,
          discount: req.body.discount,
          release: req.body.release,
          background_image: req.files[0].filename,
          about: req.body.about,
          metacritic: req.body.metacritic,
          rating_bub: req.body.rating_bub,
          game_trailer: game_trailer,
          game_gameplay: game_gameplay,
          game_review: game_review,
          requirements_min: req.body.requirements_min,
          requirements_rec: req.body.requirements_rec
        }, {
          where: {
            id: req.params.id
          }
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
          db.Product_Store.bulkCreate(storeSelected, {
            //updateOnDuplicate: ["name"]
            updateOnDuplicate: ['products_id', 'stores_id', 'product_key']
          });
          //Escribir en la tabla pivot --> Necesitamos el id de newProduct
          //res.send(storeSelected);
          res.redirect('/');
        });
    } catch(err){
      console.log(err);
    }
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
        formatReleaseDate: formatReleaseDate,
        user: req.session.user
      });
      
    } catch(err) {
      console.log(err);
    }
  },
}

module.exports = controller;