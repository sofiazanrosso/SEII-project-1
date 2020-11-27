const express = require('express');
const app = express();
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');


// Configure dotenv
dotenv.config();


// DB Connection
mongoose.connect(
    process.env.DB_CONNECTION_STRING,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log('DB connection established.')
);
mongoose.Promise = global.Promise;


// Import API routes
const authRoute = require('./project-api/api/routes/auth');
const categoryRoute = require('./project-api/api/routes/categories');
const announcementRoute = require('./project-api/api/routes/announcements');
const flyerRoute = require('./project-api/api/routes/flyers');
const searchRoute = require('./project-api/api/routes/search');
const imageRoute = require('./project-api/api/routes/images'); // TEMP -> DELETE THIS LINE //
// const boardRoute = require('./project-api/api/routes/board'); // ???


// Middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT,POST,PATCH,DELETE,GET');
        return res.status(200).json({});
    }
    next();
});


// Public Route
app.use('/', express.static('local'));

// APIs Routes
app.use('/user', authRoute);
app.use('/categories', categoryRoute);
app.use('/announcements', announcementRoute);
app.use('/flyers', flyerRoute);
app.use('/search', searchRoute);
app.use('/img', imageRoute); // TEMP -> DELETE THIS LINE //
// app.use('/board', boardRoute); // ???


module.exports = app;