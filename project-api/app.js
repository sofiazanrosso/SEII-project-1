const express = require('express');
const bodyParser = require('body-parser');
const mongoose=require('mongoose');
const morgan = require('morgan');
const app = express();

const announcementRoute=require('./api/routes/announcements');
const flyerRoute=require('./api/routes/flyers');
const categoryRoute=require('./api/routes/categories');
const searchRoute = require('./api/routes/search');

// const category = require('./api/models/category');

// connection to the database mongoDB
const uri= 'mongodb://SEIIdb-1:seii-group-1@seii-project-1-shard-00-00.lxn68.mongodb.net:27017,seii-project-1-shard-00-01.lxn68.mongodb.net:27017,seii-project-1-shard-00-02.lxn68.mongodb.net:27017/<dbname>?ssl=true&replicaSet=atlas-pbzryp-shard-0&authSource=admin&retryWrites=true&w=majority';
mongoose.connect(uri,{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.Promise = global.Promise;

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/',express.static('public'));

//CORS
app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods','PUT,POST,PATCH,DELETE,GET');
        return res.status(200).json({});
    }
    next();
});

//method to manage the announcements
app.use('/announcements',announcementRoute);
//method to manage the flyers
app.use('/flyers', flyerRoute);
//method to manage the categories
app.use('/categories', categoryRoute);
// Method to manage searches
app.use('/search', searchRoute);

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