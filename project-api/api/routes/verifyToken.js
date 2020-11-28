const jwt = require('jsonwebtoken');


// Token verification middleware
module.exports = (req, res, next) => {

    // Look for token
    const token = req.header('auth-token');
    if (!token) {
        // No token found in header request
        return res
            .status(401)
            .send({ error: 'Access denied, token required' });
    }

    // Verify token
    try {
        const verify = jwt.verify(toke, process.env.TOKEN_SECRET);
        req.user = verify;

        // Valid token, Go after middleware
        next();
    } catch {
        // Invalid token
        return res
            .status(400)
            .send({ error: 'Invalid token' });
    }
}