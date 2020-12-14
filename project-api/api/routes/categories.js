const express = require('express');
const mongoose = require('mongoose');
const announcement = require('../models/announcement');
const router = express.Router();

const Category = require('../models/category');
const Announcement = require('../models/announcement');

// ------------------------------------------------------------

/*
    GET all categories.
    You may want to view all categories.
    The attributes are:
        name (String)
        id (String)
*/
router.get('/', (req, res, next) => {
    Category.find()
    .select('_id name')
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

// ------------------------------------------------------------

/* 
    POST a new category.
    You may want to add a new category.
    The attributes are:
        name (String)
        id (String)
*/
router.post('/', (req, res,next) => {
    const category= new Category({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        nn_ids: req.body.ann_ids,
        fly_ids: req.body.fly_ids
    });

    //mongoose method to save models
    category.save().then(result => {
        console.log(result);
        res.status(201).json({
            message: 'POST request to /categories',
            createCategory: result
        });
    })
    .catch( err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    });
});

// ------------------------------------------------------------

/*
    GET request for an individual category.
    You may want to view a only a certain category of flyers and announcements. 
    The attributes are:
        name (String)
        id (String)
*/
router.get('/:id', (req, res, next) => {

    // Da controllare

    const catId = req.params.id;

    Announcement.find({ category: { $eq: catId } })
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

// ------------------------------------------------------------

/* 
    DELETE request for a given id.
    You may want to delete a specific category.
*/
router.delete('/:id', (req, res, next) => {

    // Take category id
    const id = req.params.id;

    // Query
    Category.remove({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Category deleted'
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
});

// ------------------------------------------------------------

module.exports = router;