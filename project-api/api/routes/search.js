const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Announcement = require('../models/announcement');


router.get('/', (req, res, next) => {

    // Query mongoDB
    const query = {};


    // Ricerca case-sensitive   >>>>>>>>> C'è un modo migliore per farlo? <<<<<<<<<<<<<
    const caseSensitiveOptions = req.query.caseSensitive === 'true' ? '' : 'i';

    // Match stringa con content
    if (typeof req.query.includes !== 'undefined') {
        query["$or"] = [{ "title": { $regex: req.query.includes, $options: caseSensitiveOptions } }, { "content": { $regex: req.query.includes, $options: caseSensitiveOptions } }];
    }

    // Range ammesso di publishDate
    if (typeof req.query.from_publish !== 'undefined' || typeof req.query.to_publish !== 'undefined') {
        d = {};
        if (typeof req.query.from_publish !== 'undefined') {
            d["$gte"] = req.query.from_publish;
        }
        if (typeof req.query.to_publish !== 'undefined') {
            d["$lte"] = req.query.to_publish;
        }
        query["publishDate"] = d;
    }

    // Range ammesso di expiryDate
    if (typeof req.query.from_expiry !== 'undefined' || typeof req.query.to_expiry !== 'undefined') {
        d = {};
        if (typeof req.query.from_expiry !== 'undefined') {
            d["$gte"] = req.query.from_expiry;
        }
        if (typeof req.query.to_expiry !== 'undefined') {
            d["$lte"] = req.query.to_expiry;
        }
        query["expiryDate"] = d;
    }


    Announcement
        .find(query)
        .exec()
        .then(docs => {
            const response = {
                debug: {
                    caseSensitive: caseSensitiveOptions !== 'i',
                    query: query
                },
                count: docs.length,
                announcements: docs.map(doc => {
                    return {
                        _id: doc._id,
                        author: doc.author,
                        content: doc.content,
                        publishDate: doc.publishDate,
                        expiryDate: doc.expiryDate,

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