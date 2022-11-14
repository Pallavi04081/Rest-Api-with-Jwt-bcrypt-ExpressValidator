const express = require('express')
const Router = express.Router()
const { body} = require('express-validator');
const { Deletepost, updatePost, post, getpost, login, Registation } = require('./callback');

Router.post("/Registration",body("name").isAlpha(),body("password").isAlphanumeric(),body("password").isLength({min:6}),body("email").isEmail(),Registation)

Router.post("/login",login)

Router.get("/post",getpost)

Router.post("/post",post)

Router.put("/post/:id",updatePost)

Router.delete("/delete/:id",Deletepost)

module.exports = Router;