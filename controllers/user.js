const user = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

function generateAccessToken(id)
{
    return jwt.sign({userId:id},'Nehalokesh')
}


function isstringinvalid(string)
{
    if(string == undefined || string.length === 0)
    {
        return true
    }
    else
    {
        return false
    }
}
exports.signup = async (req,res)=>{
    try{
        const {name,phoneNumber,email,password} = req.body;
        if(isstringinvalid(email) || isstringinvalid(password) || isstringinvalid(name))
        {
            return res.status(400).json({err:"bad parameters"})
        }
        user.findAll({where:{email : email}})
        .then(users =>{
            if(users.length === 1)
            {
                 res.status(402).json({message:"user already exist"})
            }
            else
            {
                const saltrounds =10;
                bcrypt.hash(password,saltrounds,async(err,hash)=>{
                    
                    await user.create({name,email,password:hash,phoneNumber})
                    res.status(201).json({message :'successfully created'})
                })
            }
        })
    }
    catch(err)
    {
        console.log(err)
        res.status(500).json({err})
    }
}
exports.login= async(req,res)=>{
    try{
        const email = req.body.email;
        const password = req.body.password;

        // console.log(email)
        if(isstringinvalid(email) || isstringinvalid(password))
        {
        return res.status(400).json({err:"bad parameters . something is missing"})
        }

         const User = await  user.findAll({where:{email:email}})
       console.log(User)
       if(User)
       {
        bcrypt.compare(password,User[0].password,(err,result)=>{
            if(err)
            {
                res.status(500).json({success:false , message:"something went wrong"})
            }
            if(result == true)
            {
                res.status(200).json({success:true , message:"user is successfully logged" , token: generateAccessToken(User[0].id)})
            }
            else
            {
                return res.status(400).json({success:false , message:"Password is incorrect"})
            }
           })
       }

    }
    catch(err){
        res.status(404).json({message:"user doesn't exist",err})
    }
}