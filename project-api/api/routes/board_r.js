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
    Board.find()
    .exec()
    .then(doc => {
        const response = {
            count : doc.length,
            board: doc.map(brd =>{
                return {
                    //announcements: board.ann[i]._id,      potrebbe essere qualcosa del genere?  
                    _id: brd._id
                    //app.AnnRoute()
                    //richiamare get all flyers, get all annoucenments
                    //richiamare get categories
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