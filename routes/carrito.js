const fs = require('fs');
const express = require('express');
const router = express.Router();

const carritoModel = require("../models/carritoModel");



router.get('/', function (req, res, next) {
	res.render('carrito', {
		nombre: 'Homero',
		apellido: 'Thompson',
		title: 'GAME List',
		carritoList: carritoModel
	});



});


module.exports = router;