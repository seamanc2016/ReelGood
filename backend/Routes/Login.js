const express = require('express');
const router = express.Router();
const admin = require('../src/config/firebase-config');
const { writeToCollection, DeleteFromCollection, Readdocument, updatedocument, DeleteFavoritedMovie } = require('../database.js');

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
    
    //*******************************THIS IS JUST FOR TESTING*************************************************/
    /**
     * Here are the functions that will be called for crud operations for database. The queries need to be
     * build before passed into the function. Please user the example query templates provided to create
     * queries to certain user data. The data in fields are just tempory data. Please change to fit needed
     * query requirements
     */


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

    const FavoriteMovies = {
        _id: String("us8daf9h289rt3r983jhoiwjf"/*req.decodeValue.user_id*/),
        movieId: [142684, 681341, 402760, 919631],
    }


    // Writes to user to usercollection to retrieve for user info page
    await writeToCollection(User, "UsersDB", "Users");

    // Deletes user from usercollection
    await DeleteFromCollection(req.decodeValue.user_id, "UsersDB", "Users");

    // Writes to favoriteMovies document to favorite movies collection
    await writeToCollection(FavoriteMovies, "UsersDB", "FavoritedMovies");

    // Returns Movie Array of user that matches user_id and array has movieid
    await Readdocument(String(req.decodeValue.user_id), "UsersDB", "FavoritedMovies", {$and: [{ _id: String(req.decodeValue.user_id)}, {"FavoriteMovie_Id": 142684}]})

    
    queryid = { _id: String(req.decodeValue.user_id)} // Userid query 
    query = {$push: {"FavoriteMovie_Id": 182612} }  // statement that pushes value to end of array

    // Finds Favorite movies document and then appends value to end of the array
    await updatedocument( queryid, "UsersDB", "FavoritedMovies", query )


    queryid1 = { _id: String(req.decodeValue.user_id)} // Userid query
    query1 = {$pull: {"FavoriteMovie_Id": 919631}}

    await DeleteFavoritedMovie(queryid1, "UsersDB", "FavoritedMovies", query1)
    /************************************ END OF MONGODB TESTING ********************************************************/

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
