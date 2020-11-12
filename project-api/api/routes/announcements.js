const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Announcement= require('../models/announcement');


//get all announcements
router.get('/',(req,res,next)=>{
    //TODO implementare la get di tutta la lista in locale
    /*
    const an = res.body;
    const response={
        //number of announcements
        count : an.length(),
        announcement: an.map(ann=>{
            return {
                _id: ann._id,
                author: ann.author,
                category: ann.category,
                content: ann.content,
                publish_date: ann.publish_date,
                expiry_date: ann.expiry_date,
                request : {
                    type: 'GET',
                    url: 'http://localhost:3000/announcements/'+ann._id
                }
            }
        })
    }
    res.status(200).json(response);
    */
    
    Announcement.find()
    .exec()
    .then(doc=>{
        const response={
            //number of announcements
            count : doc.length,
            announcement: doc.map(ann=>{
                return {
                    _id: ann._id,
                    author: ann.author,
                    category: ann.category,
                    content: ann.content,
                    publish_date: ann.publish_date,
                    expiry_date: ann.expiry_date,
                    request : {
                        type: 'GET',
                        url: 'http://localhost:3000/announcements/'+ann._id
                    }
                }
            })
        }
        res.status(200).json(response);
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        });
    });
    
});


//post an announcement
router.post('/',(req,res,next)=>{
    /*
    const product={
        _id: req.body._id,
        author: req.body.author,
        category: req.body.category,
        content: req.body.content,
        publish_date: req.body.publish_date,
        expiry_date: req.body.expiry_date
    }

    res.status(201).json({
        message: 'Announcement posted',
        prod: product
    })*/

    const announcement= new Announcement({
        _id: new mongoose.Types.ObjectId(),
        author: req.body.author,
        category: req.body.category,
        content: req.body.content,
        publish_date: req.body.publish_date,
        expiry_date: req.body.expiry_date
    });

    announcement.save()
    .then(result=>{
        console.log(result);
        res.status(201).json({
            message: "Announcement posted",
            announcementPosted: {
                _id: result._id,
                author: result.author,
                category: result.category,
                content: result.content,
                publish_date: result.publish_date,
                expiry_date: result.expiry_date,
                request: {
                    type: 'POST',
                    url: "http://localhost:3000/announcement/"+result._id
                }
            }
        });
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        })
    });
});


//get an announcement
router.get('/:id',function(req,res){
    /*
    var id=req.params.id;
    var announcementFound = announcements.find((a)=> a.id==id);
    res.status(200).send(announcementFound);
    */
   const id=req.params._id;
   Announcement.findById(id)
   .exec()
   .then(doc=>{
       console.log("From database",doc);;
       if(doc){
            res.status(200).json({
                announcement: doc,
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/announcements'
                }
            });
       }else{
            res.status(404).json({
                message:"No value found"
            });
       }
   })
   .catch(err=>{
        console.log(err);
        res.status(500).json({error:err});
    });
}); 

module.exports = router;