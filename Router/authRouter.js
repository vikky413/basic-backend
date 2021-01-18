const express = require('express')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const key = require('../key')
const {jwtToken}  = require('../key')
const router = express.Router()
const User = mongoose.model('User')

router.post('/signup',async (req,res)=>{
    console.log(req.body)
    const {name,email,password} = req.body;
    try{
    var user = new User({name,email,password});
     await user.save();
      const token = jwt.sign({userId:user._id},jwtToken)
    res.send({token})
    } catch(err){
       return  res.status(422).send(err.message)
    }
});

router.post('/signin',async (req,res)=>{
  const {email,password} = req.body;
  if(!email || !password){
    return res.status(422).send({error:'Enter Email and Password'})
  }
  const user = await User.findOne({email})
  if(!user){
    return res.status(422).send({error:"User is not signup "})
  }
  try{
    await user.comparePassword(password);
    const token = jwt.sign({userId:user._id},jwtToken)
    res.send({token})
  }
  catch(err){
     return res.status(422).send({error:"User and password not Matched"})
  }

})
module.exports = router;