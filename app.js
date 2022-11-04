const express = require('express')
const chats = express();
const cors = require('cors')
const bodyparser = require('body-parser')
const sequelize = require('./util/database')

const userRoutes = require('./routes/chats')

const User = require('./models/user')
const Chat = require('./models/chats')

chats.use(cors())

chats.use(bodyparser.json())

chats.use(userRoutes)

User.hasMany(Chat)
Chat.belongsTo(User)

sequelize
//.sync({force:true})
.sync()
.then(result=>{
    chats.listen(3000)
})
.catch(err=>
    console.log(err))