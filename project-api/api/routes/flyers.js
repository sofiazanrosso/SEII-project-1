const router = require('express').Router();
const mongoose = require('mongoose');
const Category = require('../models/category');
const Flyer = require('../models/flyer');

// ------------------------------------------------------------

const multer = require('multer');

// where to store the images and the name of the saved file
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './images/');
    },
    filename: function(req, file, cb) {
        cb(null, new Date().getMilliseconds() + file.originalname + "");
    }
});

// type of images accepted
const fileFilter = (req, file, cb) => {

    if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
        cb(null, true);                                                         // accept the file
    } else {
        cb(new Error('type not accepted'), false);                              // reject the file
    }
    
}

const upload = multer({
    storage: storage,
    limits: { 
        fileSize: 1024 * 1024 * 10 
    },
    fileFilter: fileFilter
});

// ------------------------------------------------------------

/*
    GET all flyers.
    You may want to view all flyers. 
    The attributes are:
        author (String)
        category (String)
        image (String)
        publish date (String)
        expiry date (String)
        url
*/
router.get('/', async (req, res, next) => {

    // Query
    const flyers = await Flyer.find().select('_id author title category image publishDate expiryDate');

    // Map
    const response = {
        count : flyers.length,
        flyer: flyers.map(x => {
            return {
                _id: x._id,
                author: x.author,
                title: x.title,
                category: x.category,
                image: x.image,
                contact: x.contact,
                publishDate: x.publishDate,
                expiryDate: x.expiryDate
            }
        })
    }

    // Response
    res.send(response);

});

// ------------------------------------------------------------

/* 
    GET request for an individual flyer.
    You may want to view a specific flyer. 
    The attributes are:
        author (String)
        category (String)
        image (String)
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
        res.status(200).json({
            flyer: flyer,
            request: {
                type: 'GET',
                url: 'http://localhost:3000/flyers'
            }
        });
    } else {
        res.status(404).json({ message: 'No valid entry found for given id' });
    }
});

// ------------------------------------------------------------

/*
    POST a new flyer.
    You may want to add a new flyer. 
    The attributes are:
        author (String)
        category (String)
        image (String)
        publish date (String)
        expiry date (String)
        url
*/
router.post('/', upload.single('image'), (req, res, next) => {

    var defaultPath;
    var messaggio = "image okay";

    // Image file
    if (req.file == null) {
        messaggio = "error file: default image will be posted";
        defaultPath = "../default.png";
    } else {
        defaultPath = req.file.path;
    }

    // Create Flyer
    const flyer = new Flyer({
        _id: new mongoose.Types.ObjectId(),
        author: req.body.author,
        category: req.body.category,
        title: req.body.title,
        contact: req.body.contact,
        image: defaultPath,                       // require the path
        publishDate: req.body.publishDate,
        expiryDate: req.body.expiryDate,
        resMessage: messaggio
    });

    // Post
    flyer
        .save()
        .then(result => {
            res.status(201).json({
                message: 'POST request to /flyers',
                result: result
            })
        })
        .catch(err => {
            res.status(500).json({ error: err })
        });
});

// ------------------------------------------------------------

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
            res.status(500).json({
                error: err
            })
        });
});

// ------------------------------------------------------------

module.exports = router;