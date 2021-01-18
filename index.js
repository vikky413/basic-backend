const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const app = express()
const PORT = 3000;
app.use(bodyParser.json())
require('./models/Users');
const authToken = require('./Router/authToken')
const authRouter = require('./Router/authRouter');
app.use(authRouter);
const {mogoUrl} = require('./key')
mongoose.connect(mogoUrl,{useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true})

mongoose.connection.on('connected',()=>{
    console.log("mongoose connection successfully")
})
mongoose.connection.on('error',(err)=>{
    console.log("error is",err)})

app.get('/',authToken,(req,res)=>{
    res.send("Your email is : "+ req.user.password)
})
app.listen(PORT);