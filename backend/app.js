//studentserver.js
const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const { join } = require('path/posix');
const path = require('path');

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

/**
 * Routes will go here
*/

app.listen(process.env.PORT || 5678); //start the server
console.log('Server is running...');