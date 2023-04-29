const express = require('express');
const router = express.Router();
const admin = require('../src/config/firebase-config');
const { writeToCollection, DeleteFromCollection } = require('../database.js');

const decodeToken = async (req, res, next) => {
    // retrieves token from user API call

    const token = req.headers.authorization.split(' ')[1] || " ";
    try {
        const decodeValue = await admin.auth().verifyIdToken(token);
        if (decodeValue) {
            console.log("trying to decode value")
            console.log(decodeValue);
            req.decodeValue = decodeValue;
            req.token = token.toString();
            return next();
        }
        return res.json({ message: 'unauthorize' })
    } catch (e) {
        return res.json({ message: 'Internal Error' });
    }
}

router.get('/', decodeToken, async (req, res) => {

    const idToken = req.token;   // get un-decoded idToken
    const decodedtoken = req.decodeValue
    console.log(idToken)
    // setting time for cookie expiring in 5 days
    const expiresIn = 60 * 60 * 24 * 5 * 1000;

    // Practice Data
    const User = {
        _id: String(req.decodeValue.user_id),
        "first_name": "Eyan",
        "last_name": "Eubanks",
        "email": decodedtoken.email,
        "username": "eeubanks",
        "zipcode": 33212,
        "state": "Florida",
    }

    // Add mongodb code here
    await writeToCollection(User, "UsersDB", "Users");
    await DeleteFromCollection(req.decodeValue.user_id, "UsersDB", "Users");
    admin
        .auth()
        .createSessionCookie(idToken, { expiresIn })
        .then((sessionCookie) => {
            console.log("success")
            const options = { maxAge: expiresIn, httpOnly: false, path: "/", sameSite: 'None', secure: true };
            res.cookie("session", sessionCookie, options);
            res.send({ status: "success" });
        }).catch((e) => {
            console.log("not working")
            res.send("UNAUTHORIZED REQUEST!");
        });

})

module.exports = router;
