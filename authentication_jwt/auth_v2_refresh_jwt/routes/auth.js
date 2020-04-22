

const express = require('express');

const authController = require('../controllers/authController');
const checkAuth = require('../middlewares/checkAuth');

const router = express.Router();




// @route   POST /auth/register
// @desc    Create new user
// @access  Public
router.post('/register', authController.register);  


// @route   POST /auth/login
// @desc    Login 
// @access  Public
router.post('/login', authController.login);


// @route   GET /auth/users
// @desc    Get all users
// @access  Private
router.get('/users', checkAuth, authController.getUsers);


// @route   GET /auth/user
// @desc    Get current user
// @access  Private
router.get('/user', checkAuth, authController.getUser);


// @route   POST /auth/refreshAccessToken
// @desc    access token expired => refresh access token
// @access  Public
router.post('/refreshAccessToken', authController.refreshAccessToken);

// @route   POST /auth/logout
// @desc    remove refresh token
// @access  Public
router.post('/logout', authController.logout);


module.exports = router;