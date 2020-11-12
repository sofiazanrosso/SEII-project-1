const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Flyer= require('../models/flyer');

//get all flyers
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

//post a new flyer
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

//GET request for an individual flyer
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
            res.status(404).json({ message: 'No valide entry found for given id'});
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
});

//DELETE request for a given id
router.delete('/:id', (req, res, next) => {
    const id = req.params.id;
    Product.remove({_id: id})
    .exec()
    .then(res => {
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    });
});


module.exports = router;