const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const app = express();

const Category= require('../models/category');
const Flyer= require('../models/flyer');
const Announcement = require('../models/announcement');
const Board = require ('../models/board');
const board = require('../models/board');
const { response } = require('../../../app');

// ------------------------------------------------------------

/* 
    GET the board.
*/
router.get('/', (req, res, next) => {
    
    Announcement.find()
    .exec()
    .then(doc => {
        const response = {
            count : doc.length,
            announcement: doc.map(ann =>{
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
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });
        
});

// ------------------------------------------------------------

module.exports = router;