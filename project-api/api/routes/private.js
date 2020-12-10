const router = require('express').Router();
const verifyAuth = require('./verifyToken');


router.get('/', verifyAuth, (req, res) => {
    res.send(req.payload);
});


module.exports = router;