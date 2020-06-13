const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { check, validationResult, body } = require('express-validator');


// ************ Controller Require ************
const usersController = require('../controllers/usersController');


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

/*** CREATE ONE user ***/
// check('password').custom((value, {
//   req
// }) => {
//   return req.body.password === req.body.passwordConfirm;
// }).withMessage('La contraseña no coincide')
router.get('/create', usersController.root); /* GET - Form to create */
router.post('/create', [
  check('email').isEmail().withMessage('Debe ingresar un e-mail correcto'),
  check('name').isLength({
    min: 4,
    max: 100
  }).withMessage('El nombre es inválido'),
  check('lastname').isLength({
    min: 4,
    max: 100
  }).withMessage('El apellido es inválido')
  
], upload.any(), usersController.store); /* POST - Store in DB */

router.get('/', usersController.login); /* GET - Form to create */
router.post('/', usersController.validate); /* Post - Validation login */

/*** EDIT ONE USER ***/
router.get('/edit/:userId', usersController.edit); /* GET - Form to create */
router.put('/edit/:userId', upload.any(), usersController.update); /* PUT - Update in DB */

router.delete('/delete/:userId', usersController.destroy); /* DELETE - Delete from DB */


module.exports = router;
