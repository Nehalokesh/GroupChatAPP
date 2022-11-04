const Message1 = require('../models/message')
const User = require('../models/user')

exports.userMessage = (req,res)=>{
   const message = req.body.chats;

    console.log(message);
    Message1.create({message:message , userId:req.user.id})
    .then(result =>{
        console.log(result)
        res.status(201).json({success:true})
    })
    .catch(err =>{
        console.log(err)
       res.status(500).json({message:"failed"})
    })

}


exports.getMessage = (req,res)=>{
    Message1.findAll({include: [
        {
          model: User,
          required: false,
        },
      ]})
    .then(response =>{
        res.status(201).json({response})
    })
    .catch(err =>{
        res.status(500).json({err})
    })
}