const express = require('express');
const mongoose = require('mongoose');
const announcement = require('../models/announcement');
const router = express.Router();

const Category = require('../models/category');
const Announcement = require('../models/announcement');

//get all categories
router.get('/', (req, res, next) => {
    Category.find()
    .exec()
    .then(doc => {
        const response = {
            count : doc.length,
            category: doc.map(cat=>{
                return {
                    _id: cat._id,
                    name: cat.name,
                    request : {
                        type: 'GET',
                        url: 'http://localhost:3000/categories/' + cat._id
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

// la post delle categories non c'è, le categorie sono decise a priori

//GET request for an individual category

router.get('/:id', (req, res, next) => {
    //extract the id
    const id = req.params.id;
    Category.find()
    .select('_id ann_ids fly_ids')
    .exec()
    .then(docs => {
        console.log("From database", docs);
        /* const response = {
            how to retrive data from the database? 
        }*/
        
        if (docs) {
            //Announcement.findById(id)
            res.status(200).json({
                count: docs.length,
                orders: docs.map ( doc => {
                    return {
                        _id: doc._id,
                        announcements: doc.ann_ids,
                        flyers: doc.fly_ids
                        //get?
                    }
                })
            });
            
        } else {
            res.status(404).json({ message: 'No valid entry found for given id'});
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
});

module.exports = router;