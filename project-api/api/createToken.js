const User = require('./models/user');
const { sign } = require('jsonwebtoken');

// ------------------------------------------------------------

// Create new Access-Token for an User
module.exports.createAccessToken = user => {
    return sign(
        {
            _id: user._id
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: '150m'
        }
    );
};

// ------------------------------------------------------------