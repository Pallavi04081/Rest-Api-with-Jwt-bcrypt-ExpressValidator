
const mongoose = require('mongoose')

const Registation  = new mongoose.Schema({
    name : {
        type:String,
        required : true
    },
    password:{
        type:String,
        required : true
    },
    email:{
        type:String,
        required : true,
        unique:true
    }
})

const UserRegistration = mongoose.model("UserRegistation",Registation)

module.exports = UserRegistration;