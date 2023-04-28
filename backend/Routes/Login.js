const express = require('express');
const router = express.Router();
const admin = require('../src/config/firebase-config');


const decodeToken = async (req, res ,next) => {
    // retrieves token from user API call
    console.log("im in decode token" + req.header.authorization)

    const token = req.headers.authorization.split(' ')[1] || " ";
    try{
        const decodeValue = await admin.auth().verifyIdToken(token);
        if(decodeValue){
            console.log("trying to decode value")
            console.log(decodeValue);
            req.decodeValue = decodeValue;
            req.token = token.toString();
            return next();
        }
        return res.json({message: 'unauthorize'})
    } catch (e){
        return res.json({message: 'Internal Error'});
    }
}

router.get('/',decodeToken, (req, res)=>{

    const idToken = req.token;   // get un-decoded idToken
    console.log("im in login" + idToken)
    // setting time for cookie expiring in 5 days
    const expiresIn = 60 * 60 * 24 * 5 * 1000;

    admin
    .auth()
    .createSessionCookie(idToken, {expiresIn})
    .then((sessionCookie) => {
        console.log("success")
        const options = {maxAge: expiresIn, httpOnly: false, path: "/", sameSite: 'None', secure: true };
        res.cookie("session", sessionCookie, options);
        res.send({status: "success"});
    }).catch((e) => {
        console.log("not working")
        res.send("UNAUTHORIZED REQUEST!");
    });

})

module.exports=router;