const express = require('express')
const router = express.Router();

const usercontroller = require('../controllers/user')
const chatcontroller = require('../controllers/message')
const groupChatcontroller = require('../controllers/group')
const userauthenticate = require('../middleware/Auth')

router.post('/signup' , usercontroller.signup)
router.post('/login',usercontroller.login)
router.post('/chatsstart',userauthenticate.authenticate,chatcontroller.userMessage)

router.get('/getchats' , userauthenticate.authenticate , chatcontroller.getMessage)

router.post('/postgroupChatting',userauthenticate.authenticate,groupChatcontroller.groupMessage)

router.get('/getgroupChat',userauthenticate.authenticate,groupChatcontroller.groupdetails)

router.post('/postmessage/:id',userauthenticate.authenticate,groupChatcontroller.postMessage)

router.get('/getmessage/:id',groupChatcontroller.getMessage)

router.post('/AddUser/:id',groupChatcontroller.addUser)

router.get('/getUser/:id',groupChatcontroller.getUser)

router.delete('/deleteUser/:id',groupChatcontroller.deleteUser)

module.exports = router;