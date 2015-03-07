'use strict';

var formidable = require('formidable'),
    fs = require('fs'),
    path = require('path'),
    twilioClient = require('twilio')('AC558645872803c0089ddf5d2974596066', '0b584565ef6318d6c243ded6d0c39978');

// Get list of Contents
exports.index = function(req, res) {
  var form = new formidable.IncomingForm();

  form.parse(req, function(err, fields, files) {
    var fileSize = files.file.size,
        fileExt = files.file.name.split('.').pop(),
        fileName = files.file.name,
        oldPath = files.file.path,
        newPath = path.join(__dirname, '/../../uploads/', fileName);

        console.log(newPath);

        fs.readFile(oldPath, function(err, data) {
          fs.writeFile(newPath, data, function(err) {
            if (err) {
              console.log(err);
              return res.send(500);
            }

            return res.send(200);
          });
        });
  });

  
};

exports.sms = function(req, res) {
  twilioClient.sendMessage({
    to: '+16065855637',
    from: '+17404144228',
    body: 'Node Test! Woo!'
  }, function(err, msg) {
    if (err) {
      console.log(err);
      res.send(500, err);
    }
    else {
      console.log(msg.sid);
      res.send(200);
    }
  });
};
