const express = require('express');
const bodyParser = require('body-parser');
const mongoose=require('mongoose');
const app = express();

const announcementRoute=require('./api/routes/announcements');
const { Mongoose } = require('mongoose');

// connection to the database mongoDB



const uri= '';
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