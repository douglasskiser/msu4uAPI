'use strict';

var express = require('express');
var controller = require('./events.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.getOne);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.remove);

module.exports = router;