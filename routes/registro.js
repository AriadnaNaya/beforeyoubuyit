var express = require('express');
var router = express.Router();
const controller = require ("../controllers/usersController");

/* GET login page. */
router.get('/',controller.registroUsuario);

module.exports = router;
