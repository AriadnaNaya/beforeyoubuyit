var express = require('express');
var router = express.Router();
const controller = require ("../controllers/mainController")

/* GET home page. */
router.get('/', controller.homePageLogueado);

module.exports = router;
