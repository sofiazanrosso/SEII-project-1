// // // // // //
// TEMPORANEO  //
// // // // // //

const express = require('express');
const mongoose = require('mongoose');

const multer = require('multer');
const fs = require('fs-extra');
const { Buffer } = require('safe-buffer');
const upload = multer({ limits: { fileSize:  1024*1024*16 }, dest: '../uploads/' });

const router = express.Router();


const Image = require('../models/image');


router.get('/:id', (req, res, next) => {
    Image
        .findById(req.params.id)
        .exec()
        .then(doc => {
            if (doc) {
                res.status(200).json(doc);
            } else {
                res.status(404).json({ message: "nun c'è sta" });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});

router.post('/', upload.single('image'), (req, res, next) => {

    // Null
    if (req.file == null) {
        res.status(500).json({ error: "Errore" });
    }
    else {
        // Leggi immagine da temp
        const newImg = fs.readFileSync(req.file.path);

        // Per storage in mongoDB encode in base64
        const encImg = newImg.toString('base64');

        const imgDoc = new Image({
            _id: new mongoose.Types.ObjectId(),
            img: Buffer(encImg, 'base64'),
            mimeType: req.file.mimetype
        });

        // Carico
        imgDoc
            .save()
            .then(result => {
                console.log(result);
                res.status(201).json({ message: "È andato, sembrerebbe " });
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({ error: err });
            });
    }
});

module.exports = router;