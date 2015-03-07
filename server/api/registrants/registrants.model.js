'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var RegistantsSchema = new Schema({
  name: String,
  phone: String
});

module.exports = mongoose.model('Registants', RegistantsSchema);