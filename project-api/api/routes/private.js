const router = require('express').Router();
const mongoose = require('mongoose');
const verifyAuth = require('./verifyToken');
// Helpers
const { postAnnouncementValidation, patchAnnouncementValidation } = require('../validation');
const { dateToday, dateExists, dateNotPast, dateAddMonths } = require('../date');
// Models
const Announcement = require('../models/announcement');
const Category = require('../models/category');
const Flyer = require('../models/flyer');
const User = require('../models/user');


//
//
// >>>> Category required o no ????
//

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
                    announcements: announcements
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
        // Check if assigned category exists
        await Category.exists({ _id: req.body.category })
            .then(exists => {
                if (!exists) {
                    // The assigned Category doesn't exists
                    return res.status(400).send({ error: 'The assigned Category doesn\'t exists' });
                }
            }).catch(err => {
                // Send generic error
                return res.status(500).json({ error: 'Internal server error', details: err });
            });
        // Accuraccurate dates validation
        if (req.body.publish_date) {
            if (!dateExists(req.body.publish_date)) {
                return res.status(400).send({ error: 'Can\'t parse publish_date' });
            }
            if (!dateNotPast(req.body.publish_date)) {
                return res.status(400).send({ error: 'Value of publish_date can\'t be in the past' });
            }
        }
        if (req.body.expiry_date) {
            if (!dateExists(req.body.expiry_date)) {
                return res.status(400).send({ error: 'Can\'t parse expiry_date' });
            }
            if (!dateNotPast(req.body.expiry_date)) {
                return res.status(400).send({ error: 'Value of expiry_date can\'t be in the past' });
            }
        }
        // Create Announcement
        const announcement = new Announcement({
            _id: new mongoose.Types.ObjectId(),
            author: req.payload._id,
            category: req.body.category,
            title: req.body.title,
            content: req.body.content,
            publish_date: req.body.publish_date || dateToday(),
            expiry_date: req.body.expiry_date || dateAddMonths(req.body.publish_date || dateToday()),
        });
        // Save Announcement
        announcement.save()
            .then(saved => {
                // Success, send saved announcement back
                res.status(201).json(saved);
            })
            .catch(err => {
                // Send generic error
                res.status(500).json({ error: 'Internal server error', details: err });
            });
    });


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


router.route('/flyers/')
    // Auth middleware for all sub-routes
    .all(verifyAuth)

    .get((req, res) => {

    })

    .post((req, res) => {

    });


router.route('/flyers/:id')
    // Auth middleware for all sub-routes
    .all(verifyAuth)

    .get((req, res) => {

    })

    .patch((req, res) => {

    })

    .delete((req, res) => {

    });


module.exports = router;