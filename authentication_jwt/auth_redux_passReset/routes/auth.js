
const express = require('express');

const authController = require('../controllers/authController');
const checkAuth = require('../middleware/checkAuth');


const router = express.Router();



// @route   POST /auth/register
// @desc    Create new user
// @access  Public
router.post('/register', authController.createUser);


// @route   POST /auth/login
// @desc    Login
// @access  Public
router.post('/login', authController.login);

// @route   GET /auth
// @desc    get currently logged in user
// @access  Private
router.get('/', checkAuth, authController.getUser);


// @route   POST /auth/forgotPassword
// @desc    post request to get email link to reset password
// @access  Public
router.post('/forgotPassword', authController.forgotPassword);


// @route   GET /auth/forgotPassword/:token
// @desc    url to reset password => redirected to resetPassword page
// @access  Public
router.get('/resetPassword/:token', authController.redirectToResetPassword);

// @route   POST /auth/resetPassword/:token
// @desc    send post request to reset password
// @access  Public
router.post('/resetPassword/:token', authController.resetPassword);


module.exports = router;