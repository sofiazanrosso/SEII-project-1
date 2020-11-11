const express = require('express');
const router = express.Router();

//list of announcements
var announcements = [{
    id: 1,
    author: "Simba",
    category: "libri",
    published_at: "22/11/1963",
    url: "/announcements/1"
}];

//get an announcement
router.get('/:id',function(req,res){
    var id=req.params.id;
    var announcementFound = announcements.find((a)=> a.id==id);
    res.status(200).send(announcementFound);
}); 

//post an announcement
router.post('/',(req,res,next)=>{
    var product={
        id: req.body.id,
        author: req.body.author,
        category: req.body.category,
        published_at: req.body.published_at,
        url: req.body.url
    }
    res.status(201).json({
        message: 'Announcement posted'
    })
});

module.exports = router;