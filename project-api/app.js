const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const announcementRoute=require('./api/routes/announcements');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/',express.static('public'));

app.use('/announcements',announcementRoute);

module.exports = app;