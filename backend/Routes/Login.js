const express = require('express');
const router = express.Router();

const admin = require('../src/config/firebase-config');

router.get('/', (req, res)=>{

    const idToken = req.token;   // get un-decoded idToken

    // setting time for cookie expiring in 5 days
    const expiresIn = 60 * 60 * 24 * 5 * 1000;

    admin
    .auth()
    .createSessionCookie(idToken, {expiresIn})
    .then((sessionCookie) => {
        console.log("success")
        const options = {maxAge: expiresIn, httpOnly: true };
        res.cookie("session", sessionCookie, options);
        res.send({status: "success"});
    }).catch((e) => {
        console.log("not working")
        res.status(401).send("UNAUTHORIZED REQUEST!");
    });

})

module.exports=router;