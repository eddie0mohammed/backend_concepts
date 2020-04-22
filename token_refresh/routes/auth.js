
const express = require('express');

const authController = require('../controllers/authController')

const router = express.Router();


// @route   POST /auth/login
// @desc    login
// @access  Public
router.post('/login', authController.login);

// @route   POST /auth/refreshAccessToken
// @desc    access token expired => refresh access token
// @access  Public
router.post('/refreshAccessToken', authController.refreshAccessToken);

// @route   POST /auth/logout
// @desc    remove refresh token
// @access  Public
router.post('/logout', authController.logout);


module.exports = router;