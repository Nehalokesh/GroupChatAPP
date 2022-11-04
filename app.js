const express = require('express')
const chats = express();
const cors = require('cors')
const bodyparser = require('body-parser')
const sequelize = require('./util/database')

const Group = require('./models/group')
const userGroup = require('./models/userGroup');

const userRoutes = require('./routes/chats')

const User = require('./models/user')
const Chat = require('./models/message')

chats.use(cors())

chats.use(bodyparser.json())

chats.use(userRoutes)

User.hasMany(Chat)
Chat.belongsTo(User)


User.hasMany(userGroup)
Group.hasMany(userGroup)

Group.hasMany(Chat)
Chat.belongsTo(Group)

userGroup.belongsTo(User)
userGroup.belongsTo(Group)

sequelize
//.sync({force:true})
.sync()
.then(result=>{
    chats.listen(3000)
})
.catch(err=>
    console.log(err))