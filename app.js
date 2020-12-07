const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');


// Import API routes
const authRoute = require('./project-api/api/routes/auth');
const categoryRoute = require('./project-api/api/routes/categories');
const announcementRoute = require('./project-api/api/routes/announcements');
const flyerRoute = require('./project-api/api/routes/flyers');
const searchRoute = require('./project-api/api/routes/search');
// const boardRoute = require('./project-api/api/routes/board'); // ???


// Configure dotenv
dotenv.config();


// ------------------------------------------------------------

// connection to the database mongoDB
const uri = 'mongodb://SEIIdb-1:seii-group-1@seii-project-1-shard-00-00.lxn68.mongodb.net:27017,seii-project-1-shard-00-01.lxn68.mongodb.net:27017,seii-project-1-shard-00-02.lxn68.mongodb.net:27017/<dbname>?ssl=true&replicaSet=atlas-pbzryp-shard-0&authSource=admin&retryWrites=true&w=majority';
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
console.log("DB connected");

// ------------------------------------------------------------

mongoose.Promise = global.Promise;


// Middleware
app.use(morgan('dev'));
app.use(cookieParser());
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


// Public Route Middleware
app.use('/', express.static('local'));

// APIs Routes Middleware
app.use('/auth', authRoute);
app.use('/categories', categoryRoute);
app.use('/announcements', announcementRoute);
app.use('/flyers', flyerRoute);
app.use('/search', searchRoute);
// app.use('/board', boardRoute); // ???


// Temp
app.use('/img', require('./project-api/api/routes/images'));
app.use('/private', require('./project-api/api/routes/private'));


module.exports = app;