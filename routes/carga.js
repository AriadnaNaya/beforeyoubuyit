const fs = require('fs');
const express = require('express');
const router = express.Router();
//const request = require("request");
//const JuegosModel = require('../models/juegosModel');
const controller = require ("../controllers/productsController")

/* GET detalle page. */
router.get('/', controller.cargaJuegos);

module.exports = router;