var express = require('express');
var router = express.Router();
const controller = require ("../controllers/mainController")

/* GET login page. */
router.get('/', controller.homeLogueo);

module.exports = router;
