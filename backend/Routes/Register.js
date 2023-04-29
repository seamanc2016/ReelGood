const express = require('express');
const router = express.Router();
const admin = require('../src/config/firebase-config');
const {writeToCollection}= require('../database.js');


router.post('/', (res,req) => {
    console.log(res.body);
})



module.exports=router;