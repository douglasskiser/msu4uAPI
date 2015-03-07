'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var AudioSchema = new Schema({
	name: String,
	type: String,
	fileName: String,
    uploadDate: {
    	type: Date,
    	default: Date.now
    }
});

module.exports = mongoose.model('Audio', AudioSchema);
