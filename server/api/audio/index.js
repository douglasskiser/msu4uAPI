'use strict';

var express = require('express');
var controller = require('./audio.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.download);

module.exports = router;