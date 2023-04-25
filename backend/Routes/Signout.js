const express = require('express');
const router = express.Router();

const admin = require('../src/config/firebase-config');

router.get('/', (req, res)=>{
    res.clearCookie("session");
    res.send("LOGGEDOUT");
})

module.exports=router;