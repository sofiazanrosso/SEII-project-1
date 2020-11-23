const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Flyer= require('../models/flyer');
const Category= require('../models/category');

/*
    GET all flyers.
    You may want to view all flyers. 
    The attributes are:
        author (String)
        category (String)
        content (String)
        publish date (String)
        expiry date (String)
        url
*/ 
router.get('/', (req, res, next) => {
    Flyer.find()
    .exec()
    .then(doc => {
        const response = {
            count : doc.length,
            flyer: doc.map(fly=>{
                return {
                    _id: fly._id,
                    author: fly.author,
                    category: fly.category,
                    content: fly.content,
                    publish_date: fly.publish_date,
                    expiry_date: fly.expiry_date,
                    request : {
                        type: 'GET',
                        url: 'http://localhost:3000/flyers/' + fly._id
                    }
                }
            })
        }
        res.status(200).json(response);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

/*
    POST a new flyer.
    You may want to add a new flyer. 
    The attributes are:
        author (String)
        category (String)
        content (String)
        publish date (String)
        expiry date (String)
        url
*/
router.post('/', (req, res,next) => {
    const flyer= new Flyer({
        _id: new mongoose.Types.ObjectId(),
        author: req.body.author,
        category: req.body.category,
        content: req.body.content,
        publish_date: req.body.publish_date,
        expiry_date: req.body.expiry_date
    });

    //mongoose method to save models
    flyer.save().then(result => {
        console.log(result);
        res.status(201).json({
            message: 'POST request to /flyers',
            createFlyer: result
        });
    })
    .catch( err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    });
});

/* 
    GET request for an individual flyer.
    You may want to view a specific flyer. 
    The attributes are:
        author (String)
        category (String)
        content (String)
        publish date (String)
        expiry date (String)
        url
*/
router.get('/:id', (req, res, next) => {
    //extract the id
    const id = req.params.id;
    Flyer.findById(id)
    .exec()
    .then(doc => {
        console.log("From database", doc);
        if (doc) {
            res.status(200).json(doc);
        } else {
            res.status(404).json({ message: 'No valid entry found for given id'});
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
});

/* 
    DELETE request for a given id.
    You may want to delete a specific flyer.
*/
router.delete('/:id', (req, res, next) => {
    const id = req.params.id;
    Flyer.remove({_id: id})
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'Flyer deleted',
            request: {
                type: 'DELETE',
                url: 'http://localhost:3000',
                data: {author: 'String', content: 'String'}
            }
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    });
});


module.exports = router;