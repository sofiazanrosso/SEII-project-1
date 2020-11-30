// const { Response } = require('express');

// Sends refresh-token as a httpOnly-cookie in the response
module.exports.sendRefreshToken = (res, token) => {
    res.cookie('auth', token, {
        httpOnly: true,
        path: '/auth/refresh'
    });
};
