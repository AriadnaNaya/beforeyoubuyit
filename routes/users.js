const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

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

router.get('/profile/:userId', loggedUser,usersController.profile); /* GET - user profile */

/*** CREATE ONE user ***/

router.get('/create/', usersController.root); /* GET - Form to create */
router.post('/create/', upload.any(), usersController.store); /* POST - Store in DB */

router.get('/', usersController.login); /* GET - Form to create */
router.post('/', usersController.validate); /* Post - Validation login */

/*** EDIT ONE USER ***/
router.get('/edit/:userId', usersController.edit); /* GET - Form to create */
router.put('/edit/:userId', upload.any(), logsMiddleware, usersController.update); /* PUT - Update in DB */
router.delete('/delete/:userId', logsMiddleware, usersController.destroy); /* DELETE - Delete from DB */


module.exports = router;
