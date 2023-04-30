//studentserver.js
const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser")
const { join } = require('path/posix');
const path = require('path');
const axios = require('axios');
const csrf = require("csurf");
const multer = require('multer');
const cors = require('cors');
const admin = require('./src/config/firebase-config');
const mongoose = require('mongoose');
const Login = require('./Routes/Login');
const Signout = require('./Routes/Signout');
const Register = require('./Routes/Register');

const { writeToCollection, DeleteFromCollection, Readdocument, updatedocument, DeleteFavoritedMovie } = require('./database');

require('dotenv').config({ path: path.join(__dirname, 'certs', '.env') });




// Setup Cors options
const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200
};

const csrfMiddleware = csrf({ cookie: true }); // Sets csrf middleware

// setting up middlewares
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(cookieParser());
app.use('/Register', Register);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(csrfMiddleware);
app.use("/Login", Login);
app.use("/Signout", Signout);



const upload = multer();    // Allows for form submitions

// routing For endpoints


app.use(Login)
app.use(Signout)


// Checks session with firebase
const checkSession = (req, res, next) => {

    const sessionCookie = req.cookies.session || "a";
    console.log(req.cookies.session)
    console.log("checkingSession")

    admin.auth().verifySessionCookie(sessionCookie, true)
        .then(() => {
            console.log("next")
            next();
        })
        .catch((error) => {
            console.log(error)
            res.send("UNAUTHORIZED REQUEST!");
        });
}
// Add decodeToken and routes middleware to stack 

// add checkSession after login. Do not need to check session cookies if user isn't logged in yet!
app.use(checkSession);

//MongoDB API endpoints
/**
// Create a schema for the movie collection
const movieSchema = new mongoose.Schema({
  title: String,
  director: String,
  year: Number,
});

// Create a model for the movie collection
const Movie = mongoose.model('Movie', movieSchema);

// Define the route to add a new movie to the database
app.post('/movies', (req, res) => {
  // Get the movie details from the request body
  const { title, director, year } = req.body;

  // Create a new movie instance
  const movie = new Movie({ title, director, year });

  // Save the movie to the database
  movie.save((err, movie) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(movie);
  });
});




//MovieDB endpoints
/** 
* GET - Search for movies via MovieDB.
* @method /search/movie
* @param {string} Request.query.query - The query string for the movie search.
* @param {number} Request.query.page - A page is every 20 search results. For example, page = 1 means the first 20 search results. 
* @return {Response} 200/304 on success. 401 on Invalid API Key. 404 on Not Found.
*/
app.get('/search/movie', function (req, res) {
    //Guard clause
    if (req.query.query === undefined || req.query.page === undefined)
        return res.status(400).send({ message: 'At least one of the parameters: (query, page) is undefined. Please try again.' });

    //Make request to MovieDB API
    baseUrl = process.env.MOVIE_DB_BASE_URL;

    axios.get(`${baseUrl}/search/movie`, {
        params: {
            api_key: process.env.MOVIE_DB_API_KEY,
            query: req.query.query,
            language: 'en-US', //Keeping our app US based.
            page: req.query.page == '' ? 1 : req.query.page //Default to page 1 if empty string received
        }
    })
        .then(function (response) {
            //On success, return movie data object from MovieDB
            return res.status(response.status).send(response.data);
        })
        .catch(function (error) {
            // If a response has been received from the request server, the error object will contain the response property.
            if (error.response)
                return res.status(error.response.status).send(error.response.data);
        });

});

/** 
* GET - Get a list of movies in theatres via MovieDB.
* @method /movie/now_playing
* @param {number} Request.query.page - A page is every 20 search results. For example, page = 1 means the first 20 search results. 
* @return {Response} 200/304 on success. 401 on Invalid API Key. 404 on Not Found.
*/
app.get('/movie/now_playing', function (req, res) {
    //Guard clause
    if (req.query.page === undefined)
        return res.status(400).send({ message: 'The parameter: (page) is undefined. Please try again.' });

    //Make request to MovieDB API
    baseUrl = process.env.MOVIE_DB_BASE_URL;

    axios.get(`${baseUrl}/movie/now_playing`, {
        params: {
            api_key: process.env.MOVIE_DB_API_KEY,
            region: 'US',
            language: 'en-US', //Keeping our app US based.
            page: req.query.page == '' ? 1 : req.query.page //Default to page 1 if empty string received
        }
    })
        .then(function (response) {
            //On success, return movie data object from MovieDB
            return res.status(response.status).send(response.data);
        })
        .catch(function (error) {
            // If a response has been received from the request server, the error object will contain the response property.
            if (error.response)
                return res.status(error.response.status).send(error.response.data);
        });


});

/** 
* GET - Get a list of the current popular movies on MovieDB. This list updates daily.
* @method /movie/popular
* @param {number} Request.query.page - A page is every 20 search results. For example, page = 1 means the first 20 search results. 
* @return {Response} 200/304 on success. 401 on Invalid API Key. 404 on Not Found.
*/
app.get('/movie/popular', function (req, res) {
    //Guard clause
    if (req.query.page === undefined)
        return res.status(400).send({ message: 'The parameter: (page) is undefined. Please try again.' });

    //Make request to MovieDB API
    baseUrl = process.env.MOVIE_DB_BASE_URL;

    axios.get(`${baseUrl}/movie/popular`, {
        params: {
            api_key: process.env.MOVIE_DB_API_KEY,
            region: 'US',
            language: 'en-US', //Keeping our app US based.
            page: req.query.page == '' ? 1 : req.query.page //Default to page 1 if empty string received
        }
    })
        .then(function (response) {
            //On success, return movie data object from MovieDB
            return res.status(response.status).send(response.data);
        })
        .catch(function (error) {
            // If a response has been received from the request server, the error object will contain the response property.
            if (error.response)
                return res.status(error.response.status).send(error.response.data);
        });

});

/** 
* GET - Get a list of upcoming movies in theatres via MovieDB
* @method /movie/upcoming
* @param {number} Request.query.page - A page is every 20 search results. For example, page = 1 means the first 20 search results. 
* @return {Response} 200/304 on success. 401 on Invalid API Key. 404 on Not Found.
*/
app.get('/movie/upcoming', function (req, res) {
    //Guard clause
    if (req.query.page === undefined)
        return res.status(400).send({ message: 'The parameter: (page) is undefined. Please try again.' });

    //Make request to MovieDB API
    baseUrl = process.env.MOVIE_DB_BASE_URL;

    axios.get(`${baseUrl}/movie/upcoming`, {
        params: {
            api_key: process.env.MOVIE_DB_API_KEY,
            region: 'US',
            language: 'en-US', //Keeping our app US based.
            page: req.query.page == '' ? 1 : req.query.page //Default to page 1 if empty string received
        }
    })
        .then(function (response) {
            //On success, return movie data object from MovieDB
            return res.status(response.status).send(response.data);
        })
        .catch(function (error) {
            // If a response has been received from the request server, the error object will contain the response property.
            if (error.response)
                return res.status(error.response.status).send(error.response.data);
        });

});

/** 
* GET - Get the primary information about a movie via MovieDB
* @method /movie/:movie_id
* @param {number} Request.params.movie_id -  The unique identifier for a movie on TMBD.
* @return {Response} 200/304 on success. 401 on Invalid API Key. 404 on Not Found.
*/
app.get('/movie/:movie_id', function (req, res) {
    //Make request to MovieDB API
    baseUrl = process.env.MOVIE_DB_BASE_URL;

    axios.get(`${baseUrl}/movie/${req.params.movie_id}`, {
        params: {
            api_key: process.env.MOVIE_DB_API_KEY,
            language: 'en-US', //Keeping our app US based.
        }
    })
        .then(function (response) {
            //On success, return movie data object from MovieDB
            return res.status(response.status).send(response.data);
        })
        .catch(function (error) {
            // If a response has been received from the request server, the error object will contain the response property.
            if (error.response)
                return res.status(error.response.status).send(error.response.data);
        });

});

/** 
* GET - Get the cast and crew of a movie via MovieDB
* @method /movie/:movie_id/credits
* @param {number} Request.params.movie_id -  The unique identifier for a movie on TMBD.
* @return {Response} 200/304 on success. 401 on Invalid API Key. 404 on Not Found.
*/
app.get('/movie/:movie_id/credits', function (req, res) {
    //Make request to MovieDB API
    baseUrl = process.env.MOVIE_DB_BASE_URL;

    axios.get(`${baseUrl}/movie/${req.params.movie_id}/credits`, {
        params: {
            api_key: process.env.MOVIE_DB_API_KEY,
            language: 'en-US', //Keeping our app US based.
        }
    })
        .then(function (response) {
            //On success, return movie data object from MovieDB
            return res.status(response.status).send(response.data);
        })
        .catch(function (error) {
            // If a response has been received from the request server, the error object will contain the response property.
            if (error.response)
                return res.status(error.response.status).send(error.response.data);
        });

});

/** 
* GET - Get a list of recommended movies for a movie via MovieDB
* @method /movie/:movie_id/recommendations
* @param {number} Request.params.movie_id -  The unique identifier for a movie on TMBD.
* @param {number} Request.query.page - A page is every 20 search results. For example, page = 1 means the first 20 search results. 
* @return {Response} 200/304 on success. 401 on Invalid API Key. 404 on Not Found.
*/
app.get('/movie/:movie_id/recommendations', function (req, res) {
    //Guard clause
    if (req.query.page === undefined)
        return res.status(400).send({ message: 'The parameter: (page) is undefined. Please try again.' });

    //Make request to MovieDB API
    baseUrl = process.env.MOVIE_DB_BASE_URL;

    axios.get(`${baseUrl}/movie/${req.params.movie_id}/recommendations`, {
        params: {
            api_key: process.env.MOVIE_DB_API_KEY,
            language: 'en-US', //Keeping our app US based.
            page: req.query.page == '' ? 1 : req.query.page //Default to page 1 if empty string received
        }
    })
        .then(function (response) {
            //On success, return movie data object from MovieDB
            return res.status(response.status).send(response.data);
        })
        .catch(function (error) {
            // If a response has been received from the request server, the error object will contain the response property.
            if (error.response)
                return res.status(error.response.status).send(error.response.data);
        });

});

//Yelp Endpoints
/** 
* GET - Gets a list of cinemas based on the location provided. Powered by Yelp.
* @method /theatres
* @param {string} Request.query.location -  Indicates the geographic area to be used when searching for businesses.
* @param {string} Request.query.sort_by -  Sort by one of the these modes: "best_match" (default), "rating", or "distance".
* @param {number} Request.query.page - A page is every 10 search results. For example, page = 1 means the first 10 search results. 
* @return {Response} 200/304 on success. 400 on undefined params. 401 on Invalid API Key. 404 on Not Found.
*/
app.get('/theatres', function (req, res) {
    //Guard clause
    if (req.query.location === undefined || req.query.sort_by === undefined || req.query.page === undefined)
        return res.status(400).send({ message: 'The parameters: (location, sort_by, page) is undefined. Please try again.' });

    //Make request to Yelp API
    baseUrl = process.env.YELP_BASE_URL;

    axios.get(`${baseUrl}/businesses/search`, {
        params: {
            location: req.query.location,
            sort_by: req.query.sort_by,
            term: 'cinema',
            limit: 10,
            offset: -10 + (10 * req.query.page) //Very odd way that Yelp has you skim through search results
        },
        headers: {
            Authorization: process.env.YELP_API_KEY
        }
    })
        .then(function (response) {
            //On success, return movie data object from Yelp
            return res.status(response.status).send(response.data);
        })
        .catch(function (error) {
            // If a response has been received from the request server, the error object will contain the response property.
            console.log(error);
            if (error.response)
                return res.status(error.response.status).send(error.response.data);
        });

});

app.post("/Favorite", async (req, res, next) => {

    // Setup variables
    const uid = String(req.body.uid)
    const movieId = parseInt(req.body.movieId)

    // see if this user already has a favoriteMovie movie list
    let result = await Readdocument(String(req.body.uid), "UsersDB", "FavoritedMovies", { _id: String(uid)});

    // If null response, create a new favoriteMovie list 
    if (result == null) {
        const FavoriteMovies = {
            _id: uid,
            movieId: [],    // make a empty array
        }

        await writeToCollection(FavoriteMovies, "UsersDB", "FavoritedMovies");
    }

    // After creating favorite movies list or determining if user already has one...

    // Create query parameters
    const UserFavoriteId = {_id: uid};
    const UserFavoriteMovieId = {$push: {"FavoriteMovie_Id": movieId}}

    result = await updatedocument(UserFavoriteId, "UsersDB", "FavoritedMovies", UserFavoriteMovieId);

    if (result)
        res.send({ msg: "Successfullly updated" });
    else
        res.send({ msg: "Error updating favorites list" });

});

/***********DELETE /favorites/:uid for remove.*/
//app.delete()
/**
 * Handle the DELETE request to remove a user's favorite movie from the database
 * @param {Object} req - The HTTP request object
 * @param {Object} res - The HTTP response object
 * @param {Function} next - The next middleware function
 * @returns {void}
 */
app.put("/Favorite", async (req, res, next) => {
    // Setup variables
    const uid = String(req.body.uid)
    const movieId = parseInt(req.body.movieId)

    // see if this user already has a favoriteMovie movie list
    let result = await Readdocument(uid, "UsersDB", "FavoritedMovies", { _id: uid });

    
    // Create query parameters
    const UserFavoriteId = { _id: uid };
    const UserFavoriteMovieId = { $pull: { "FavoriteMovie_Id": movieId } }

    result = await updatedocument(UserFavoriteId, "UsersDB", "FavoritedMovies", UserFavoriteMovieId);

    if (result) {
        res.send({ msg: "Successfully deleted" });
    } else {
        res.send({ msg: "Error deleting favorite movie from your list" });
    }
});

/***** chatgpt provided GET endpoints for user favorites and user account information */
// Route handler for retrieving a user's favorite movies
/**
Handle a GET request to retrieve a user's favorite movies from the database.
@function
@async
@param {object} req - The request object.
@param {object} res - The response object.
@param {function} next - The next middleware function.
@throws {error} - Error retrieving favorite movies.
@returns {json} - A JSON object containing the user's favorite movies.
*/
app.get("/Favorites/:uid", async (req, res, next) => {
    try {
        const uid = req.params.uid;
        console.log(req.params.uid)
        // Retrieve user's favorite movies from database
        const result = await Readdocument(uid, "UsersDB", "FavoritedMovies", { _id: uid });

        // Send response with favorite movies
        res.status(200).json(result[0].FavoriteMovie_Id);
    } catch (error) {
        // Handle error
        console.error(error);
        res.status(500).send({ error: "Error retrieving favorite movies" });
    }
});
// Route handler for retrieving a user's account information
/**
 * Retrieve user's account information from database and send as response
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @param {function} next - The next middleware function
 * @param {string} req.params.uid - The user ID parameter
 * @returns {object} - The account information for the user as a JSON response
 * @throws {error} - If an error occurs while retrieving account information, sends a 500 status code with an error message
 */
app.get("/accountinfo/:uid", async (req, res, next) => {
    try {
        const uid = req.params.uid;
        // Retrieve user's account information from database
        const result = await Readdocument(uid, "UsersDB", "Users", { _id: uid });
        // Send response with account information
        res.status(200).json(result);
    } catch (error) {
        // Handle error
        console.error(error);
        res.status(500).send({ error: "Error retrieving account information" });
    }
})
// Extract the account information from the database document
const accountInfo = (result) => {
    name: result.name,
        email; result.email
        ;
}

app.listen(process.env.PORT || 5678); //start the server
console.log('Server is running...');

