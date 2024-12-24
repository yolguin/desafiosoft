const express = require('express');
const { registerUser, loginUser, getUser } = require('./controllers');
const { verifyToken, logRequest } = require('./middlewares');
const router = express.Router();

router.post('/usuarios', logRequest, registerUser); 
router.post('/login', logRequest, loginUser);       
router.get('/usuarios', logRequest, verifyToken, getUser); 

module.exports = router;
