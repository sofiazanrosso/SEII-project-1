const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { createAccessToken } = require('../createToken');
const { loginValidation, registerValidation } = require('../validation');
const User = require('../models/user');


// Register
// Save new user if valid
router.post('/register', async (req, res) => {

    // Registration data validation
    const { error } = registerValidation(req.body);
    if (error) {
        return res
            .status(400)
            .send({ error: error.details[0].message });
    }

    // Check new user email is unused
    const userDoc = await User.findOne({ email: req.body.email }).select('email');
    if (userDoc) {
        return res
            .status(400)
            .send({ error: 'Email already taken' });
    }

    // Data is valid

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    // New User
    const user = new User({
        email: req.body.email,
        password: hashPassword,
        displayName: req.body.displayName
    });

    try {
        const savedUser = await user.save();

        // Respond with saved user info
        res.json({
            savedUser: {
                email: savedUser.email,
                displayName: savedUser.displayName
            }
        });
    } catch (err) {
        res.status(400).send({ error: err });
    }
});


// Login
// Get refresh-token and access-token providing valid email and password
router.post('/login', async (req, res) => {

    // Login data validation
    const { error } = loginValidation(req.body);
    if (error) {
        return res
            .status(400)
            .send({ error: error.details[0].message });
    }

    // Check email exists
    const userDoc = await User.findOne({ email: req.body.email }).select('_id email displayName password');
    if (!userDoc) {
        return res
            .status(400)
            .send({ error: 'This email is not associated to an account' });
    }

    // Check password is correct
    const passwordCheck = await bcrypt.compare(req.body.password, userDoc.password);
    if (!passwordCheck) {
        return res
            .status(400)
            .send({ error: 'Invalid password' });
    }

    // email & password are valid

    // Response with access-token
    res.json({
        accessToken: createAccessToken(userDoc),
        user: {
            email: userDoc.email,
            displayName: userDoc.displayName
        }
    })
});


module.exports = router;