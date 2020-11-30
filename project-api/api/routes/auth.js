const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { createAccessToken, createRefreshToken } = require('../createToken');
const { loginValidation, registerValidation, revokeValidation } = require('../validation');
const User = require('../models/user');
const { sendRefreshToken } = require('../sendRefreshToken');


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
    const userDoc = await User.findOne({ email: req.body.email }).select('_id email tokenVersion displayName password');
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

    // Include refresh-token in response
    sendRefreshToken(res, createRefreshToken(userDoc));

    // Response with access-token
    res.json({
        accessToken: createAccessToken(userDoc),
        user: {
            email: userDoc.email,
            displayName: userDoc.displayName
        }
    })
});


// User logout
router.post('/logout', (req, res) => {

});


// Refresh
// Get new access-token with valid refresh-token
router.post('/refresh', async (req, res) => {

    // Get refresh-token
    const token = req.cookies.auth;

    // Abort if token is absent
    if (!token) {
        return res.send({ ok: false, accessToken: '' });
    }

    //Verify refresh-token is valid
    let payload = null;
    try {
        payload = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    } catch (err) {
        console.log(err);
        return res.send({ ok: false, accessToken: '' });
    }

    // refresh-token is valid

    // Check if user exists
    const user = await User.findOne({ _id: payload._id }).select('_id email tokenVersion displayName');
    if (!user) {
        return res.send({ ok: false, accessToken: '' });
    }

    // Check if token version is up to date
    if (user.tokenVersion !== payload.tokenVersion) {
        console.log(user.tokenVersion + " e " + payload.tokenVersion);
        return res.send({ ok: false, accessToken: '' });
    }

    // Proceed with response

    // Send back renewed refresh-token (as a httpOnly-cookie)
    sendRefreshToken(res, createRefreshToken(user));
    // res.cookie('auth', createRefreshToken(user), {
    //     httpOnly: true,
    //     path: '/auth/refresh'
    // });

    // Send back an access-token
    return res.send({ ok: true, accessToken: createAccessToken(user) });
});


// Revoke refresh-token
router.post('/revokeRefreshToken', async (req, res) => {

    // Registration data validation
    const { error } = revokeValidation(req.body);
    if (error) {
        return res
            .status(400)
            .send({ error: error.details[0].message });
    }

    const updatedUser = await User.incrementTokenVersion(req.body._id);

    res.send();
});


module.exports = router;