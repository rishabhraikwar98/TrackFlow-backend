const express = require('express');
const router = express.Router();
const {register,login,logout,getCurrentUser} = require('../controller/authController');
const protect  = require('../middleware/authMiddleware');
const ValidationMiddleware = require("../middleware/validationMiddleware")
const {registerSchema,loginSchema} = require("../schemas/auth.schema")
router.post('/register',ValidationMiddleware(registerSchema), register);
router.post('/login',ValidationMiddleware(loginSchema), login);
router.post('/logout', logout);
router.get("/me",protect, getCurrentUser);


module.exports = router;

