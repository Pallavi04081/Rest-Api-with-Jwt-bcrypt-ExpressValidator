
const mongoose = require('mongoose')

const userPost  = new mongoose.Schema({
    title: {
        type:String,
        required : true
    },
    body:{
        type:String,
        required : true
    },
    image:{
        type:String,
        required : true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"UserRegistation"
    }
})

const UserPost = mongoose.model("UserPost",userPost)

module.exports = UserPost;