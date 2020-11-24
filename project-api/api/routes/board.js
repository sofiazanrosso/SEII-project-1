const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const app = express();

const Category= require('../models/category');
const Flyer= require('../models/flyer');
const Announcement = require('../models/announcement');
const Board = require ('../models/board');
const board = require('../models/board');
const { response } = require('../../app');




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
    

    /*
    Board.find()
    .exec()
    .then(
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
        })
    ,  (req, res, next) => {
        Flyer.find()
        .exec()
        .then(doc => {
            const response = {
                count : doc.length,
                announcement: doc.map(fly =>{
                    return {
                        _id: fly._id,
                        //title: fly.title,
                        author: fly.author,
                        publish_date: fly.publish_date,
                        expiry_date: fly.expiry_date,
                        request : {
                            type: 'GET',
                            url: 'http://localhost:3000/flyers/'+fly._id
                        }
                    }
                })
            }
            res.status(200).json(response);
        })
    })     
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
    */



    
});

/*
function getAnnouncements() {
    const annList = Announcement.find()
                .exec()
                .then(doc => {
                    const annResponse = {
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
                    return annResponse;         
                })
    return annList;
}
*/

module.exports = router;