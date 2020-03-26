
const express = require('express');

const authController = require('../controllers/authController');



const router = express.Router();



// @route   POST /auth/register
// @desc    Create new user
// @access  Public
router.post('/register', authController.createUser);


// @route   POST /auth/login
// @desc    Login
// @access  Public
router.post('/login', authController.login);


module.exports = router;