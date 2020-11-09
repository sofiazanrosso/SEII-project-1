var express    = require('express');
var bodyParser = require('body-parser');
const { json } = require('body-parser');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/',express.static('public'));

//starting the server
var port = process.env.PORT || 3000;
app.listen(port, function(){
  console.log('Products server listening at http://localhost:' + port);  
});

//list of announcements
var announcements = [{
    id: 1,
    author: "Simba",
    category: "libri",
    published_at: "22/11/1963",
    url: "/announcements/1"
}];

//get an announcement
app.get('/announcements/:id',function(req,res){
    var id=req.params.id;
    var announcementFound = announcements.find((a)=> a.id==id);
    res.status(200).send(announcementFound[id]);
});