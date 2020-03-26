

const express = require('express');

const imageController = require('../controllers/imageController');

const router = express.Router();


// @route   POST /images
// @desc    Create new image
// @access  Public
router.post('/', imageController.multerMiddleware, imageController.saveImage);


// @route   GET /images
// @desc    retrieve all imageURL
// @access  Public
router.get('/', imageController.getImages);


module.exports = router;