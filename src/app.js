const express = require('express')
const app = express();
const Router = require("./Route/Router")
app.use(express.json())

app.use("/",Router)




module.exports = app;