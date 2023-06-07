let express =require('express');
let router =express.Router();
let mongoose = require('mongoose');

//connect to model
let Product =require('../models/product');

//Manage routes
router.get('/',(req,res,next)=>{
    Product.find()
})