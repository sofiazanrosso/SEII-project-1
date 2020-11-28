const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { registerValidation, loginValidation } = require('../validation');
const User = require('../models/user');


// User registration
router.post('/register', async (req, res) => {

    // Validation
    const { error } = registerValidation(req.body);
    if (error) {
        return res
            .status(400)
            .send({ error: error.details[0].message });
    }

    // Check email is unused
    const userDoc = await User.findOne({ email: req.body.email }).select('email');
    if (userDoc) {
        return res
            .status(400)
            .send({ error: 'Email already taken' });
    }

    // Data in valid

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    // New User
    const user = new User({
        email: req.body.email,
        password: hashPassword,
        display_name: req.body.display_name
    });

    try {
        const savedUser = await user.save();
        res.send(savedUser);
    } catch (err) {
        res.status(400).send(err);
    }
});


// User login
router.post('/login', async (req, res) => {

    // Validation
    const { error } = loginValidation(req.body);
    if (error) {
        return res
            .status(400)
            .send({ error: error.details[0].message });
    }

    // Check email exists
    const userDoc = await User.findOne({ email: req.body.email }).select('_id password');
    if (!userDoc) {
        return res
            .status(400)
            .send({ error: 'This email is not associated to an account' });
    }

    // Check password is correct
    const passwordCheck = await bcrypt.compare(req.body.password, userDoc.password);
    if (!passwordCheck) {
        return res
            .status(400).
            send('Invalid password');
    }

    // email & password are valid

    // Create and assign token
    const token = jwt.sign({ _id: userDoc._id }, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send(token);

    // Login
    // res.send('Logged in');
});

module.exports = router;