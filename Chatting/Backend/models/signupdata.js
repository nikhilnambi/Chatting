const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');



mongoose.connect("mongodb+srv://usernk:usernk@ictak.svswr.mongodb.net/Chatting?retryWrites=true&w=majority");



const SignupData = new Schema({
    name:{
        type:String,
        uppercase:true
    },
    email: String,
    username: String,
    password: String,
    joined: { type: Date, default: Date.now },
    status: String,
    image:String,
    
    
})

SignupData.pre('save', async function (next){
    
    try{
          
          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(this.password,salt)
          this.password = hashedPassword;
          next()
    }
    catch(error){
        next(error)
    }
})

var userdata = mongoose.model('userdata', SignupData);

module.exports = userdata;