const fs = require('fs');
const express = require('express');
const router = express.Router();

// const carritoModel = require("../models/carritoModel");

const productsController = require("../controllers/productsController")



router.get('/', productsController.root); /* GET - All products */
/*** CREATE ONE PRODUCT ***/
router.get('/create', productsController.create); /* GET - Form to create */
router.post('/create', productsController.store); /* POST - Store in DB */
/*** EDIT ONE PRODUCT ***/
router.get('/edit/:id', productsController.edit); /* GET - Form to create */
router.put('/edit/:id', productsController.update); /* PUT - Update in DB */
/* GET detalle page. */
/*** DELETE ONE PRODUCT***/
router.delete('/delete/:id', productsController.destroy); /* DELETE - Delete from DB */
router.get('/:id', productsController.detail);




module.exports = router;