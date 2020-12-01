const router = require('express').Router();
const mongoose = require('mongoose');
const Category = require('../models/category');
const Flyer = require('../models/flyer');

// Bad Upload
const multer = require('multer');
const fs = require('fs-extra');
const { Buffer } = require('safe-buffer');
const upload = multer({ limits: { fileSize: 1024 * 1024 * 10 }, dest: './tmp/uploads/' });


/*
    GET all flyers.
    You may want to view all flyers. 
    The attributes are:
        author (String)
        category (String)
        content (String)
        publish date (String)
        expiry date (String)
        url
*/
router.get('/', async (req, res, next) => {

    // Query
    const flyers = await Flyer.find().select('_id author title category publishDate expiryDate');

    // Map
    const flyersMap = flyers.map(x => {
        return {
            _id: x._id,
            author: x.author,
            title: x.content,
            category: x.category,
            publishDate: x.publishDate,
            expiryDate: x.expiryDate,
            request: {
                type: 'GET',
                url: window.location.origin + '/flyers/' + x._id
            }
        }
    });

    // Response
    res.send(flyersMap);

});


/* 
    GET request for an individual flyer.
    You may want to view a specific flyer. 
    The attributes are:
        author (String)
        category (String)
        content (String)
        publish date (String)
        expiry date (String)
        url
*/
router.get('/:id', async (req, res, next) => {

    // Take Flyer id
    const id = req.params.id;

    // Query
    const flyer = await Flyer.findById(id);

    // Response
    if (flyer) {
        res.status(200).json(doc);
    } else {
        res.status(404).json({ message: 'No valid entry found for given id' });
    }
});


/*
    POST a new flyer.
    You may want to add a new flyer. 
    The attributes are:
        author (String)
        category (String)
        content (String)
        publish date (String)
        expiry date (String)
        url
*/
router.post('/', upload.single('image'), (req, res, next) => {

    // Image file
    if (req.file == null) {
        return res.status(500).json({ error: 'Errore file' });
    }

    // Read image from temp location
    const newImg = fs.readFileSync(req.file.path);

    // Encode image to base64 for mongoDB storage
    const encImg = newImg.toString('base64');

    // Create Flyer
    const flyer = new Flyer({
        // _id: new mongoose.Types.ObjectId(),
        author: req.body.author,
        category: req.body.category,
        title: req.body.title,
        image: {
            name: req.file.path,
            mimeType: req.body.mimeType,
            buffer: Buffer(encImg, 'base64')
        },
        publishDate: req.body.publishDate,
        expiryDate: req.body.expiryDate
    });

    // Post
    flyer
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'POST request to /flyers',
                result: result
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err })
        });
});


/* 
    DELETE request for a given id.
    You may want to delete a specific flyer.
*/
router.delete('/:id', (req, res, next) => {

    // Take Flyer id
    const id = req.params.id;

    // Query
    Flyer.remove({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Flyer deleted'
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
});


module.exports = router;