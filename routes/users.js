const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');


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

router.get('/create/', usersController.root); /* GET - Form to create */
router.post('/create/', upload.any(), usersController.store); /* POST - Store in DB */

// router.get('/login/', usersController.login); /* GET - Form to create */
// router.post('/login/', usersController.validate); /* Post - Validation login */

module.exports = router;
