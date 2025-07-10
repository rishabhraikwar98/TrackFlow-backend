const express = require('express');
const router = express.Router();
const {register,login,logout,getCurrentUser} = require('../controller/authController');
const protect  = require('../middleware/authMiddleware');

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get("/me",protect, getCurrentUser);


module.exports = router;

