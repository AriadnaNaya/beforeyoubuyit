const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { check, validationResult, body } = require('express-validator');

const loggedUser = require('../middlewares/loggedUser');

// ************ Controller Require ************
const usersController = require('../controllers/usersController');

const logsMiddleware = require('../middlewares/logsDbMiddleware'); // Middleware de logs en 



// ************ Code Multer ************

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, './public/images/users');
  },
  filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage })

/*** Get user Profile  ***/

/*** CREATE ONE user ***/

router.get('/create', usersController.create); /* GET - Form to create */
router.post('/create', [
  check('email').isEmail().withMessage('Debe ingresar un e-mail correcto'),
  check('name').isLength({
    min: 4,
    max: 100
  }).withMessage('El nombre es inválido'),
  check('lastname').isLength({
    min: 4,
    max: 100
  }).withMessage('El apellido es inválido'),
  check('password').custom((value, {req}) => {
    return value === req.body.passwordConfirm;
  }).withMessage('La contraseña no coincide')
], usersController.store); /* POST - Store in DB */

router.get('/login', usersController.login); /* GET - Form to create */
router.post('/login', usersController.logUser); /* Post - Validation login */
router.get('/profile/:userId', loggedUser, usersController.profile); /* GET - user profile */

/*** EDIT ONE USER ***/
router.get('/edit/:userId', usersController.edit); /* GET - Form to create */
router.put('/edit/:userId', upload.any(), logsMiddleware, usersController.update); /* PUT - Update in DB */
router.delete('/delete/:userId', logsMiddleware, usersController.destroy); /* DELETE - Delete from DB */


module.exports = router;
