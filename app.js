const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


// Deactivate console log in tests
if (process.env.NODE_ENV == 'test') {
    // console.log = () => { };
}


// dotenv-flow
// Loads environment variables from .env file into process.env
require('dotenv-flow').config();
// Priority:  .env.NODE_ENV.local  >  .env.NODE_ENV  >  .env.local  >  .env


// Don't show logs in testing mode
if (process.env.NODE_ENV != 'test') {
    // morgan
    // HTTP request logger middleware
}
// app.use(require('morgan'));


// DB Connection
mongoose.connect(
    process.env.DB_CONNECTION_STRING,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log('DB connection established.')
);
// Make mongoose use native promises
// LEGACY - Mongoose 5.0 does this by default
mongoose.Promise = global.Promise;
//console.log('DB_CONNECTION_STRING: ' + process.env.DB_CONNECTION_STRING);


// bodyParser
// Parses incoming request bodies before handlers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// CORS - Cross-Origin Resource Sharing
// Allows server to indicate any other origins than its own from which a browser should permit loading of resources
// Manages requests to the server hosting the cross-origin resource, in order to check that the server will permit the actual request.
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT,POST,PATCH,DELETE,GET');
        return res.status(200).json({});
    }
    next();
});


// Public Route Middleware
app.use('/', express.static('local'));


// Import API routes
const authRoute = require('./project-api/api/routes/auth');
const privateRoute = require('./project-api/api/routes/private');
const categoryRoute = require('./project-api/api/routes/categories');
const announcementRoute = require('./project-api/api/routes/announcements');
const flyerRoute = require('./project-api/api/routes/flyers');
const searchRoute = require('./project-api/api/routes/search');


// APIs Routes Middleware
app.use('/auth', authRoute);
app.use('/private', privateRoute);
app.use('/categories', categoryRoute);
app.use('/announcements', announcementRoute);
app.use('/flyers', flyerRoute);
app.use('/search', searchRoute);


// ------------------------------------------------------------

/*
app.use((req,res,next)=>{
    const error=new Error('Not Found');
    error.status(404);
    next(error);
})

//if I have an error i print it
app.use((error,req,res,next)=>{
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});
*/

module.exports = app;