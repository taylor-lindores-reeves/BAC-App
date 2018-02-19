const controller = require('../controllers/controller');
const express = require('express');
const router = express.Router();


router.get('/', controller.first);


module.exports = router;