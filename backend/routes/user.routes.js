const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');

const {registerUser, loginUser, getUserProfile, logoutUser} = require('../controllers/user.controller');

router.post('/register', registerUser);

router.post('/login', loginUser);

router.get('/profile',authMiddleware.authUser, getUserProfile);

router.get('/logout', authMiddleware.authUser, logoutUser);




module.exports = router;