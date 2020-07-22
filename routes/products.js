const fs = require('fs');
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { check, validationResult, body } = require('express-validator');
// const carritoModel = require("../models/carritoModel");

const productsController = require("../controllers/productsController");

// ************ Code Multer ************

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/images/products');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({
  storage: storage
})



router.get('/', productsController.root); /* GET - All products */
/*** CREATE ONE PRODUCT ***/
router.get('/create', productsController.create); /* GET - Form to create */
router.post('/create', [
  check('name').notEmpty().withMessage('Debe tener un nombre'),
  check('about').isLength({
    min: 20,
    max: 200
  }).withMessage('La descripción debe tener al menos 20 caracteres'),
  check('price').notEmpty().withMessage('El juego debe tener un precio'),
  check('game_trailer').notEmpty().withMessage('Debes ingresar un trailer válido'),
  check('rating_bub').notEmpty().withMessage('Debes ingresar una valoración de juego')
],
productsController.store); /* POST - Store in DB */
/*** EDIT ONE PRODUCT ***/
router.get('/edit/:id', productsController.edit); /* GET - Form to create */
router.put('/edit/:id', upload.any(),
[
  check('name').notEmpty().withMessage('Debe tener un nombre'),
  check('about').isLength({
    min: 20,
    max: 200
  }).withMessage('La descripción debe tener al menos 20 caracteres'),
  check('price').notEmpty().withMessage('El juego debe tener un precio'),
  check('game_trailer').notEmpty().withMessage('Debes ingresar un trailer válido'),
  check('rating_bub').notEmpty().withMessage('Debes ingresar una valoración de juego')
],
productsController.update); /* PUT - Update in DB */
/* GET detalle page. */
/*** DELETE ONE PRODUCT***/
router.delete('/delete/:id', productsController.destroy); /* DELETE - Delete from DB */

router.get('/:id', productsController.detail);






module.exports = router;