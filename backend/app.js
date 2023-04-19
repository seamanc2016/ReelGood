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

const cors = require('cors')

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

app.listen(process.env.PORT || 5678); //start the server
console.log('Server is running...');