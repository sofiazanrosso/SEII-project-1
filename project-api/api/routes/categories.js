const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Category = require('../models/category');

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

module.exports = router;