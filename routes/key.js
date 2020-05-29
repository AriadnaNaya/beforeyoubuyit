var express = require('express');
var router = express.Router();
const controller = require ("../controllers/productsController")

/* GET key page. */
router.get('/',controller.validaKey);

module.exports = router;
