const express = require('express');
const Flex = require('./Flex');

const router = express.Router();
router.use('/flex', Flex);

module.exports = router;