
const mongoose  = require('mongoose')
const app = require('./app')

mongoose.connect('mongodb://127.0.0.1:27017/gitAssingement2').then(()=>{
    console.log("connected to mongodb")
}).catch(error=>{
    console.log(error.message)
})

app.listen(3000,()=>{
    console.log("server is up")
})