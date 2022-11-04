const { Router } = require('express');
const express = require('express')
const router = express.Router();

const usercontroller = require('../controllers/user')

const chatcontroller = require('../controllers/chat')
const userauthenticate = require('../middleware/Auth')

router.post('/signup' , usercontroller.signup)

router.post('/login',usercontroller.login)

router.post('/chatsstart',userauthenticate.authenticate,chatcontroller.userMessage)

router.get('/getchats' , userauthenticate.authenticate , chatcontroller.getMessage)

module.exports = router;