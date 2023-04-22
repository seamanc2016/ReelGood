//studentserver.js
const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const { join } = require('path/posix');
const path = require('path');
const axios = require('axios');
require('dotenv').config({ path: path.join(__dirname, 'certs', '.env') });

const multer = require('multer');
const upload = multer();

const cors = require('cors');
const { nextTick } = require('process');

/**
 * Router paths will go here
 */

/** router uses go here
 * app.use(${Routername},'/route/path')
 */

const corsOptions = {
  origin:'*',
  credentials:true,
  optionSuccessStatus:200
};
app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const decodeToken = (res,req ,next) => {

    // retrieves token from user API call

    // bearer iosdfjhaweu094u32094jerw2rsefwea
    console.log(req.headers)
    const token = req.headers.Authorization.split(' ')[1];
    try{
        const decodeValue = admin.auth().verifyIdToken(token);
        if(decodeValue){
            console.log(decodeValue);
            return next();
        }
        return res.json({message: 'unauthorize'})
    } catch (e){
        return res.json({message: 'Internal Error'});
    }
}
app.use(decodeToken);




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

app.listen(process.env.PORT || 5678); //start the server
console.log('Server is running...');