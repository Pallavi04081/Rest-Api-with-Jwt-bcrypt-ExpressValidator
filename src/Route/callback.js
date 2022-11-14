const UserRegistration = require('../Schema/RegistrationSchema')
const UserPost = require("../Schema/postSchema")
const {validationResult} = require('express-validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const secrateKey = "abcdefghijklmnopqrstuvwxyz"



const Registation = async(req,res)=>{
        try{
         const validation = validationResult(req)
         if(validation){
         becryptPassword = await bcrypt.hash(req.body.password,10)
         const Result = await UserRegistration.create({
             name : req.body.name,
             password : becryptPassword,
              email : req.body.email
         })
         res.json({
           Result:Result,
             message:"Registration Successful"
         })
         }
        }
        catch(error){
         console.log(error)
        }
}


const login = async(req,res)=>{
    try{
        const Result = await UserRegistration.find({name:req.body.name})
        const password = await bcrypt.compare(req.body.password,Result[0].password)
        if(password){
          const token =  jwt.sign({Result},secrateKey)
           res.json({
              token:token,
              message:"login successfull"
           })
        }
      }
      catch(error){
       console.log(error)
      }
}

const getpost = async(req,res)=>{
    try{
        const Result = await UserPost.find()
        res.json({
          Result:Result
        })
      }
      catch(error){
       console.log(error)
      }
}

const post = async(req,res)=>{
    try{
        const token = req.headers.authorization;
        if(token){
          const UserData = jwt.verify(token,secrateKey)
             const Result = await UserPost.create({
               title:req.body.title,
               body:req.body.body,
               image:req.body.image,
               user:UserData.Result[0]._id
             })      
          res.json({
            message:"post successfully  created",
            Result:Result
          })
        }
        else{
          res.json({
            message:"please login"
          })
        }
        
      }
      catch(error){
       console.log(error)
      }
}

const updatePost = async(req,res)=>{
    try{
        const token = req.headers.authorization;
        _id = req.params.id
        if(token){
          const UserData = jwt.verify(token,secrateKey)
           const postData = await UserPost.findOne({_id:_id}).populate("user");
            if(UserData.Result[0].email===postData.user.email){
              const Result = await UserPost.findByIdAndUpdate({_id:_id},{
                title:req.body.title,
                body:req.body.body,
                image:req.body.image,
                user:UserData.Result[0]._id
              })      
           res.json({
             message:"post successfully updated",
             Result:Result
           })
          }
          else{
            res.json({
              message:"premission denied please login with original account"
            })
          }
        }
        else{
          res.json({
            message:"please login"
          })
        }
        
      }
      catch(error){
       console.log(error)
      }
}

const Deletepost = async(req,res)=>{
    try{
        const token = req.headers.authorization;
        _id = req.params.id
        if(token){
          const UserData = jwt.verify(token,secrateKey)
           const postData = await UserPost.findOne({_id:_id}).populate("user");
            if(UserData.Result[0].email===postData.user.email){
              const Result = await UserPost.findByIdAndDelete({_id:_id})      
           res.json({
             message:"post successfully updated",
             Result:Result
           })
          }
          else{
            res.json({
              message:"premission denied please login with original account"
            })
          }
        }
        else{
          res.json({
            message:"please login"
          })
        }
        
      }
      catch(error){
       console.log(error)
      }
}



module.exports = {Deletepost,updatePost,login,Registation,post,getpost}

