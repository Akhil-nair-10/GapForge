const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controllers')
const {verifyUser} = require('../middlewares/auth.middleware')

router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);
router.post('/logout', authController.logoutUser);
router.get('/getMe', verifyUser, authController.getUser);

module.exports = router;