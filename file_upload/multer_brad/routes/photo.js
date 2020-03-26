

const express = require('express');

const photoController = require('../controllers/photoController');


const router = express.Router();


// @route   POST /photo
// @desc    create photo
// @access  PUBLIC
router.post('/', photoController.uploadPhotoMiddleware, photoController.saveToDB);


module.exports = router;