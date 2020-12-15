const router = require('express').Router();
const mongoose = require('mongoose');
const verifyAuth = require('./verifyToken');
// Helpers
const { postAnnouncementValidation, patchAnnouncementValidation, postFlyerValidation } = require('../validation');
const { dateToday, dateExists, dateNotPast, dateAddMonths, datePlus2 } = require('../date');
// Models
const Announcement = require('../models/announcement');
const Category = require('../models/category');
const Flyer = require('../models/flyer');
const User = require('../models/user');

// ------------------------------------------------------------

router.get('/user', verifyAuth, (req, res) => {

    // Get user data from DataBase
    User.findById(req.payload._id, '_id email displayName')
        .then(user => {
            // Send data
            res.status(200).json(user);
        }).catch(err => {
            // Send generic error
            res.status(500).json({ error: 'Internal server error', details: err });
        });

});

// ------------------------------------------------------------

router.route('/announcements/')
    // Auth middleware for all sub-routes
    .all(verifyAuth)

    .get((req, res) => {
        // Get user's announcements
        Announcement.find({ author: req.payload._id })
            .then(announcements => {
                // Send data
                res.status(200).json({
                    count: announcements.length,
                    announcement: announcements
                });
            }).catch(err => {
                // Send generic error
                res.status(500).json({ error: 'Internal server error', details: err });
            });
    })

    .post(async (req, res) => {
        // Body validation
        const { error } = postAnnouncementValidation(req.body);

        if (error) {
            // Data in body is not accepted
            return res.status(400).send({ error: error.details[0].message });
        }
        
        //Dates are stored in the db as Strings, but to manage the expiry date we temporary manage them as Date type 
        const dToday = dateToday();

        // Create Announcement
        const announcement = new Announcement({
            _id: new mongoose.Types.ObjectId(),
            author: req.payload._id,
            category: req.body.category,
            title: req.body.title,
            content: req.body.content,
            contact: req.body.contact,
            publish_date: req.body.publish_date || dToday,
            expiry_date: req.body.expiry_date || (datePlus2(req.body.publish_date || dToday))
        });

        // Save Announcement
        announcement.save()
            .then(saved => {
                // Success, send saved announcement back
                return res.status(201).json(saved);
            })
            .catch(err => {
                // Send generic error
                return res.status(500).json({ error: 'Internal server error', details: err });
            });
    });

// ------------------------------------------------------------

router.route('/announcements/:id')
    // Auth middleware for all sub-routes
    .all(verifyAuth)

    .get((req, res) => {
        Announcement.findById(req.params.id)
            .then(announcement => {
                // Check if Announcement exists
                if (!announcement) {
                    // Not found
                    return res.status(404).json({ error: 'Announcement not found' });
                }
                // Verify that authenticated user is author
                if (req.payload._id == announcement.author) {
                    // Send data
                    res.status(200).json(announcement);
                } else {
                    // Forbidden
                    res.status(403).json({ error: 'Access forbidden' });
                }
            }).catch(err => {
                // Send generic error
                res.status(500).json({ error: 'Internal server error', details: err });
            });
    })

    .patch(async (req, res) => {
        // Verify that PATCH operation is valid
        await Announcement.findById(req.params.id)
            .then(announcement => {
                // Check if Announcement exists
                if (!announcement) {
                    // Not found
                    return res.status(404).json({ error: 'Announcement not found' });
                }
                // Verify that authenticated user is author
                if (req.payload._id != announcement.author) {
                    // Forbidden
                    return res.status(403).json({ error: 'Access forbidden' });
                }
            }).catch(err => {
                // Send generic error
                return res.status(500).json({ error: 'Internal server error', details: err });
            });
        // Body validation
        const { error } = patchAnnouncementValidation(req.body);
        if (error) {
            // Data in body is not accepted
            return res.status(400).send({ error: error.details[0].message });
        }
        // Accuraccurate expiry_date validation
        if (req.body.expiry_date) {
            if (!dateExists(req.body.expiry_date)) {
                return res.status(400).send({ error: 'Can\'t parse expiry_date' });
            }
            if (!dateNotPast(req.body.expiry_date)) {
                return res.status(400).send({ error: 'Value of expiry_date can\'t be in the past' });
            }
        }
        // Proceed with update
        Announcement.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
            .then(updated => {
                // Successful
                res.status(200).json(updated);
            }).catch(err => {
                // Send generic error
                return res.status(500).json({ error: 'Internal server error', details: err });
            });
    })

    .delete(async (req, res) => {
        // Verify that DELETE operation is valid
        await Announcement.findById(req.params.id)
            .then(announcement => {
                // Check if Announcement exists
                if (!announcement) {
                    // Not found
                    // Should this return 204 (= no content)?
                    return res.status(404).json({ error: 'Announcement not found' });
                }
                // Verify that authenticated user is author
                if (req.payload._id != announcement.author) {
                    // Forbidden
                    return res.status(403).json({ error: 'Access forbidden' });
                }
            }).catch(err => {
                // Send generic error
                return res.status(500).json({ error: 'Internal server error', details: err });
            });
        // Proceed with delete
        Announcement.deleteOne({ _id: req.params.id })
            .then(result => {
                res.sendStatus(204);
            }).catch(err => {
                // Send generic error
                res.status(500).json({ error: 'Internal server error', details: err });
            });
    });

// ------------------------------------------------------------

router.route('/flyers/')
    // Auth middleware for all sub-routes
    .all(verifyAuth)

    .get((req, res) => {
        Flyer.find({ author: req.payload._id })
            .then(flyers => {
                res.status(200).json({
                    count: flyers.length,
                    flyer: flyers
                });
            }).catch(err => {
                res.status(500).json({ error: 'Internal server error', details: err });
            });
    })

    .post(async (req, res) => {

        const { error } = postFlyerValidation(req.body);

        if (error) {
            return res.status(400).send({ error: error.details[0].message });
        }

        await Category.exists({ _id: req.body.category })
            .then(exists => {
                if (!exists) {
                    return res.status(400).send({ error: 'The assigned Category doesn\'t exists' });
                }
            }).catch(err => {
                return res.status(500).json({ error: 'Internal server error', details: err });
            });

        // Accuraccurate dates validation
        if (req.body.publishDate) {
            if (!dateExists(req.body.publishDate)) {
                return res.status(400).send({ error: 'Can\'t parse publishDate' });
            }
            if (!dateNotPast(req.body.publishDate)) {
                return res.status(400).send({ error: 'Value of publishDate can\'t be in the past' });
            }
        }

        if (req.body.expiryDate) {
            if (!dateExists(req.body.expiryDate)) {
                return res.status(400).send({ error: 'Can\'t parse expiryDate' });
            }
            if (!dateNotPast(req.body.expiryDate)) {
                return res.status(400).send({ error: 'Value of expiryDate can\'t be in the past' });
            }
        }

        // Create Announcement
        const flyer = new Flyer({
            _id: new mongoose.Types.ObjectId(),
            author: req.payload._id,
            category: req.body.category,
            title: req.body.title,
            image: req.file.path,
            contact: req.body.contact,
            publishDate: req.body.publishDate || dateToday(),
            expiryDate: req.body.expiryDate || dateAddMonths(req.body.publishDate || dateToday(), 2),
        });

        // Save Announcement
        flyer.save()
            .then(saved => {
                // Success, send saved announcement back
                res.status(201).json(saved);
            })
            .catch(err => {
                // Send generic error
                res.status(500).json({ error: 'Internal server error', details: err });
            });

    });

// ------------------------------------------------------------

router.route('/flyers/:id')
    // Auth middleware for all sub-routes
    .all(verifyAuth)

    .get((req, res) => {
        Flyer.findById(req.params.id)
            .then(flyer => {
                // Check if Announcement exists
                if (!flyer) {
                    // Not found
                    return res.status(404).json({ error: 'Flyer not found' });
                }
                // Verify that authenticated user is author
                if (req.payload._id == flyer.author) {
                    // Send data
                    res.status(200).json(flyer);
                } else {
                    // Forbidden
                    res.status(403).json({ error: 'Access forbidden' });
                }
            }).catch(err => {
                // Send generic error
                res.status(500).json({ error: 'Internal server error', details: err });
            });

    })

    .patch(async (req, res) => {

        // Verify that PATCH operation is valid
        await Flyer.findById(req.params.id)
            .then(flyer => {
                // Check if Announcement exists
                if (!flyer) {
                    // Not found
                    return res.status(404).json({ error: 'Flyer not found' });
                }
                // Verify that authenticated user is author
                if (req.payload._id != flyer.author) {
                    // Forbidden
                    return res.status(403).json({ error: 'Access forbidden' });
                }
            }).catch(err => {
                // Send generic error
                return res.status(500).json({ error: 'Internal server error', details: err });
            });

        // Body validation
        const { error } = patchFlyerValidation(req.body);
        if (error) {
            // Data in body is not accepted
            return res.status(400).send({ error: error.details[0].message });
        }

        // Accuraccurate expiry_date validation
        if (req.body.expiryDate) {
            if (!dateExists(req.body.expiryDate)) {
                return res.status(400).send({ error: 'Can\'t parse expiryDate' });
            }
            if (!dateNotPast(req.body.expiryDate)) {
                return res.status(400).send({ error: 'Value of expiryDate can\'t be in the past' });
            }
        }

        // Proceed with update
        Flyer.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
            .then(updated => {
                // Successful
                res.status(200).json(updated);
            }).catch(err => {
                // Send generic error
                return res.status(500).json({ error: 'Internal server error', details: err });
            });

    })

    .delete(async (req, res) => {

        // Verify that DELETE operation is valid
        await Flyer.findById(req.params.id)
            .then(flyer => {
                // Check if Announcement exists
                if (!flyer) {
                    // Not found
                    // Should this return 204 (= no content)?
                    return res.status(404).json({ error: 'Flyer not found' });
                }
                // Verify that authenticated user is author
                if (req.payload._id != flyer.author) {
                    // Forbidden
                    return res.status(403).json({ error: 'Access forbidden' });
                }
            }).catch(err => {
                // Send generic error
                return res.status(500).json({ error: 'Internal server error', details: err });
            });

        // Proceed with delete
        Flyer.deleteOne({ _id: req.params.id })
            .then(result => {
                res.sendStatus(204);
            }).catch(err => {
                // Send generic error
                res.status(500).json({ error: 'Internal server error', details: err });
            });

    });

// ------------------------------------------------------------

module.exports = router;