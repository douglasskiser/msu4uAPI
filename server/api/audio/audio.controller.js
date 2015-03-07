'use strict';

var _ = require('lodash');
var Audio = require('./audio.model');
var path = require('path');
var fs = require('fs');

// Get list of audio files
exports.index = function(req, res) {
  Audio.find(function (err, files) {
    if(err) { return res.send(500, err); }
    return res.json(200, files);
  });
};

// Download an audio file
exports.download = function(req, res) {
  Audio.findById(req.params.id, function (err, file) {
    if(err) { return res.send(500, err); }
    if (!file) { return res.send(403); }

   	var fileName = file.fileName;
   	var filePath = path.join(__dirname, '/../../uploads/' + fileName);
   	
   	res.download(filePath);
  });
};

exports.remove = function(req, res) {
  Audio.remove({_id: req.params.id}, function(err) {
    if(err) { return res.send(500, err); }
    return res.json(200);
  });
};