const fs = require('fs');
const express = require('express');
const router = express.Router();

// const carritoModel = require("../models/carritoModel");

const controller = require ("../controllers/productsController")



router.get('/userId', controller.order);


module.exports = router;