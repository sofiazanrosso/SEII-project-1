const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Announcement = require('../models/announcement');
const Flyer = require('../models/flyer');


router.get('/:includes', async (req, res, next) => {

    const lookfor = req.params.includes;

    // Announcements query
    const announcements = await Announcement.find({
        $or: [
            { "title": { $regex: lookfor, $options: 'i' } },
            { "content": { $regex: lookfor, $options: 'i' } }
        ]
    });

    // Flyers query
    const flyers = await Flyer.find(
        { "title": { $regex: lookfor, $options: 'i' } }
    );

    // Construct json 
    const response = {
        announcements: {
            count: announcements.length,
            announcements: announcements
        },
        flyers: {
            count: flyers.length,
            flyers: flyers
        }
    };

    // Send response
    return res.status(200).json(response);

});


module.exports = router;