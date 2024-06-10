const express = require('express');
const authController = require('../Controllers/auth');
const validateSignUp = require('../Middleware/authValidation');
const router = express.Router();

router.post('/signup', authController.signUp);

router.post('/login', authController.logIn);

module.exports = router;