const fs = require('fs');
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

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
router.post('/create', upload.any(), productsController.store); /* POST - Store in DB */
/*** EDIT ONE PRODUCT ***/
router.get('/edit/:id', productsController.edit); /* GET - Form to create */
router.put('/edit/:id', upload.any(), productsController.update); /* PUT - Update in DB */
/* GET detalle page. */
/*** DELETE ONE PRODUCT***/
router.delete('/delete/:id', productsController.destroy); /* DELETE - Delete from DB */

router.get('/:id', productsController.detail);






module.exports = router;