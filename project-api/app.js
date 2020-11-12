const express = require('express');
const bodyParser = require('body-parser');
const mongoose=require('mongoose');
const app = express();

const announcementRoute=require('./api/routes/announcements');
const { Mongoose } = require('mongoose');

// connection to the database mongoDB



const uri= 'mongodb://SEIIdb-1:seii-group-1@seii-project-1-shard-00-00.lxn68.mongodb.net:27017,seii-project-1-shard-00-01.lxn68.mongodb.net:27017,seii-project-1-shard-00-02.lxn68.mongodb.net:27017/<dbname>?ssl=true&replicaSet=atlas-pbzryp-shard-0&authSource=admin&retryWrites=true&w=majority';
mongoose.connect(uri,{
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.Promise = global.Promise;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/',express.static('public'));

//method to manage the announcements
app.use('/announcements',announcementRoute);

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

module.exports = app;