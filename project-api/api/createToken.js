const User = require('./models/user');
const { sign } = require('jsonwebtoken');


// Create new Access-Token for an User
module.exports.createAccessToken = user => {
    return sign(
        {
            _id: user._id
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: '15m'
        }
    );
};


// Create new Refresh-Token for an User
module.exports.createRefreshToken = user => {
    console.log('creatin RefreshToken for ' + user);
    return sign(
        {
            _id: user._id,
            tokenVersion: user.tokenVersion
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: '1d'
        }
    );
};
