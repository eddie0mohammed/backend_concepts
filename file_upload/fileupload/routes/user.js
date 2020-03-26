

const express = require('express');


const userController = require('../controllers/userController');



const router = express.Router();


// @route   POST    /user
// @desc    Create new user
// @access  Public
router.post('/', userController.uploadMiddleWare, userController.createUser);



module.exports = router;