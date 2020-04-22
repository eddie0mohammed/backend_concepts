
const express = require('express');

const checkAuth = require('../middlewares/checkAuth');
const postController = require('../controllers/postController');

const router = express.Router();


// @route   POST /posts/new
// @desc    Create new post
// @access  Private
router.post('/new', checkAuth, postController.createPost);

// @route   GET /posts/
// @desc    Get all posts
// @access  Public
router.get('/', postController.getPosts);


module.exports = router;