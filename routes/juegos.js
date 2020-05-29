const fs = require('fs');
const express = require('express');
const router = express.Router();
// const request = require("request");
// const JuegosModel = require('../models/juegosModel');

const controller = require ("../controllers/mainController")


router.get('/', controller.juegos);

module.exports = router;
