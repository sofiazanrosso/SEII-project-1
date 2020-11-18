const { text } = require('express');
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Announcement= require('../models/announcement');


router.get('/:text', (req, res, next) => {

    const txt = req.params.text;

    // Eventualmente si può distinguere tra case-sensitive e non
    // const options = req.body.caseSensitive ? '' : 'i';
    const options = 'i';

    // Per quando announcements avrà un titolo
    // .find({ $or: [ { "title": { $regex: txt, $options: options } }, { "content": { $regex: txt, $options: options } } ] })

    Announcement
    .find({ "content": { $regex: txt, $options: options } })
    .exec()
    .then(docs => {
        const response = {
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