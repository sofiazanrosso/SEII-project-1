const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const app = express();

const Category= require('../models/category');
const Flyer= require('../models/flyer');
const Announcement = require('../models/announcement');

const AnnRoute = require('../routes/announcements');



//get board
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
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

module.exports = router;