const jwt = require('jsonwebtoken');

// ------------------------------------------------------------

// access-token verification middleware
// Permits only authorized access
module.exports = (req, res, next) => {

    // Look for access-token in header
    const token = req.header('authorization');
    if (!token) {
        // No token found in header request
        return res
            .status(401)
            .send({ error: 'Access denied, authorization required' });
    }

    // Verify token
    try {
        const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.payload = payload;

        // Valid token, go after middleware
        next();
    } catch {
        // Invalid token
        return res
            .status(401)
            .send({ error: 'Access denied, invalid authorization' });
    }
}

// ------------------------------------------------------------