const fs = require('fs');
const express = require('express');
const router = express.Router();

// const carritoModel = require("../models/carritoModel");

const productsController = require("../controllers/productsController")



router.get('/', productsController.root); /* GET - All products */
router.get('/edit', productsController.edit); /* GET - All products */




module.exports = router;