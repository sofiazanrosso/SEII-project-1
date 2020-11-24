const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const multer = require('multer');
const fs = require('fs-extra');
// const fs = require('fs');

const { Buffer } = require('safe-buffer');
const upload = multer({ limits: { fileSize: 1024 * 1024 * 10 }, dest: '../uploads/' });

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads')
//     },
//     filename: (req, file, cb) => {
//         cb(null, file.fieldname + '-' + Date.now())
//     }
// });
// const upload = multer({ storage: storage });


const Flyer = require('../models/flyer');


//get all flyers
router.get('/', (req, res, next) => {
    Flyer
        .find()
        // .select('_id author title category publish_date expiry_date')
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                flyer: docs.map(doc => {
                    return {
                        _id: doc._id,
                        author: doc.author,
                        title: doc.title,
                        category: doc.category,
                        image: {
                            name: doc.image.name,
                            mimeType: doc.image.mimeType,
                            buffer: doc.image.buffer
                        },
                        publish_date: doc.publish_date,
                        expiry_date: doc.expiry_date,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3000/flyers/' + doc._id
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

//GET request for an individual flyer
router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    Flyer
        .findById(id)
        .exec()
        .then(doc => {
            console.log("From database", doc);
            if (doc) {
                res.setHeader('content-type', doc.image.mimeType);
                res.send(doc.image.buffer);
                // res.status(200).json(doc.image.buffer);
            } else {
                res.status(404).json({ message: 'No valid entry found for given id' });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});

//post a new flyer
router.post('/', upload.single('image'), (req, res, next) => {
    if (req.file == null) {
        res.status(500).json({ error: 'Errore file' });
    }
    else {
        // Read image from temp location
        const newImg = fs.readFileSync(req.file.path);

        // Encode image to base64 for mongoDB storage
        const encImg = newImg.toString('base64');

        // Create doc
        const flyer = new Flyer({
            _id: new mongoose.Types.ObjectId(),
            author: req.body.author,
            title: req.body.title,
            category: req.body.category,
            image: {
                name: req.file.path,
                mimeType: req.body.mimeType,
                buffer: Buffer(encImg, 'base64')
            },
            publish_date: req.body.publish_date,
            expiry_date: req.body.expiry_date
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
    }
});

//DELETE request for a given id
router.delete('/:id', (req, res, next) => {
    const id = req.params.id;
    Flyer
        .deleteOne({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Flyer deleted',
                request: {
                    type: 'DELETE',
                    url: 'http://localhost:3000',
                    data: { author: 'String', content: 'String' }
                }
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