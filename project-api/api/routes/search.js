const { text } = require('express');
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Announcement= require('../models/announcement');


router.get('/', (req, res, next) => {

    // Settaggi della query mongoDB
    const queryOpts = [];


    // Eventualmente si può distinguere tra case-sensitive e non
    // const options = req.body.caseSensitive ? '' : 'i';
    const options = 'i';

    // Per quando announcements avrà un titolo
    // queryOpts.push( { "title": { $regex: txt, $options: options } }, { "content": { $regex: txt, $options: options } } );

    // Match stringa con content
    if(typeof req.query.includes !== 'undefined'){
        queryOpts.push( { "title": { $regex: req.query.includes, $options: options } } );
    }

    // Range ammesso di publish_date
    if(typeof req.query.from_publish !== 'undefined' || typeof req.query.to_publish !== 'undefined'){
        d = {};
        if(typeof req.query.from_publish !== 'undefined'){
            d["$gte"] = req.query.from_publish;
        }
        if(typeof req.query.to_publish !== 'undefined'){
            d["$lte"] = req.query.to_publish;
        }
        queryOpts.push( { publish_date: d } );
    }

    // Range ammesso di expiry_date
    if(typeof req.query.from_expiry !== 'undefined' || typeof req.query.to_expiry !== 'undefined'){
        d = {};
        if(typeof req.query.from_expiry !== 'undefined'){
            d["$gte"] = req.query.from_expiry;
        }
        if(typeof req.query.to_expiry !== 'undefined'){
            d["$lte"] = req.query.to_expiry;
        }
        queryOpts.push( { expiry_date: d } );
    }

    // Query
    const query = { $or: queryOpts};

    Announcement
    .find(query)
    .exec()
    .then(docs => {
        const response = {
            debug: {
                query: query
            },
            count: docs.length,
            caseSensitive: req.body.caseSensitive === 'true',
            products: docs.map(doc => {
                return {
                    _id: doc._id,
                    content: doc.content,
                    publish_date: doc.publish_date,
                    expiry_date: doc.expiry_date,

                    request: {
                        type: "GET",
                        url: 'http://localhost:3000/announcements/' + doc._id
                    }
                }
            })
        }
        res.status(200).json(response);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
    });
});


module.exports = router;