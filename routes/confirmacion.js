const fs = require('fs');
const express = require('express');
const router = express.Router();

//const carritoModel = require("../models/carritoModel");

const controller = require ("../controllers/productsController")


router.get('/carrito', controller.confirmacionCompra);


module.exports = router;