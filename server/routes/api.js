const express = require('express');
const router = express.Router();

router.use('/users', require('./users'));//plug in user model


module.exports = router;
