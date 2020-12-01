const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Announcement= require('../models/announcement');


/* 
    GET all announcements.
    You may want to view all announcement. 
    The attributes are:
        title (String)
        author (String)
        category (String)
        content (String)
        publish date (String)
        expiry date (String)
        url
*/
router.get('/',(req,res,next)=>{
    
    Announcement.find()
    .exec()
    .then(doc=>{
        const response={
            //number of announcements
            count : doc.length,
            announcement: doc.map(ann=>{
                return {
                    _id: ann._id,
                    title: ann.title,
                    author: ann.author,
                    category: ann.category,
                    content: ann.content,
                    publishDate: ann.publishDate,
                    expiryDate: ann.expiryDate,
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


/*
    POST of an announcement.
    The attributes required are:
        title (String)
        author (String)
        category (id)
        content (String)
        publishDate (String)
        expiryDate (String)
*/
router.post('/',(req,res,next)=>{
    
    const announcement= new Announcement({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        author: req.body.author,
        category: req.body.category,
        content: req.body.content,
        publishDate: req.body.publishDate,
        expiryDate: req.body.expiryDate
    });

    announcement.save()
    .then(result=>{
        console.log(result);
        res.status(201).json({
            message: "Announcement posted",
            announcementPosted: {
                _id: result._id,
                title: result.title,
                author: result.author,
                category: result.category,
                content: result.content,
                publishDate: result.publishDate,
                expiryDate: result.expiryDate,
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


/*
    GET a specific announcement.
    The Id (String) is required in the path.
*/
router.get('/:id',(req,res,next)=>{

   const id=req.params.id;
   Announcement.findById(id)
   .exec()
   .then(doc=>{
       console.log("From database",doc);
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


/*
    PATCH method for an announcement.
    Allows to change the expiry date.
*/
router.patch('/:id',(req,res,next)=>{
    const id = req.params.id;
    const updateOps={};
    for(const ops of req.body){
        updateOps[ops.newExpireData]=ops.value;
    }
    Announcement.update({_id: id, $set: updateOps})
    .exec()
    .then(result=>{
        console.log(result);
        res.status(200).json({
            message: "Expire date updated",
            url: 'http://localhost:3000/announcements/'+id
        });
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});


/*
    DELETE method for an announcement.
    The Id (String) is required in the path.
*/
router.delete('/:id',(req,res,next)=>{
    const id=req.params.id;
    Announcement.remove({_id : id})
    .exec()
    .then(result=>{
        res.status(200).json({
            message: 'Announcement deleted',
            request: {
                type: 'DELETE',
                url: 'http://localhost:3000',
                data: {author: 'String', content: 'String'}
            }
        });
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

module.exports = router;