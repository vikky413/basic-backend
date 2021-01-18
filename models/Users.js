const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const userShecma = new mongoose.Schema({
    name:{
        type:String,
        unique:true,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
});
userShecma.pre('save',function(next){
    const user = this;
    if(!user.isModified('password')){
        return next()
    }
    bcrypt.genSalt(10,(err,salt)=>{
        if(err){
            return next(err)
        }
       bcrypt.hash(user.password,salt,(err,hash)=>{
           if(err){
               return next(err)
           }
           user.password = hash;
           next()
       })
    })

})
userShecma.methods.comparePassword = function(candidatePassword){
    const user = this;
    return new Promise((resolve,reject)=>{
        bcrypt.compare(candidatePassword,user.password,(err,ismatch)=>{
            if(err){
                return err
            }
            if(!ismatch){
                return reject(err)
            }
            resolve(true)
        })
    })
}

mongoose.model('User',userShecma)

