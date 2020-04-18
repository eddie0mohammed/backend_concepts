
const express = require('express');

const postController = require('../controllers/postController');
const authenticateToken = require('../middlewares/authenticateToken');

const router = express.Router();


// @route   GET /posts
// @desc    get all posts
// @access  Public
router.get('/', authenticateToken,  postController.getAllPosts);





module.exports = router;