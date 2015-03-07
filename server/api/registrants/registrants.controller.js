'use strict';

var Registrants = require('./registrants.model');

// Get count of registrants
exports.index = function(req, res) {
  Registrants.find(function (err, users) {
    if(err) { return handleError(res, err); }
    return res.json(200, {
      numberOfRegistrants: users.length
    });
  });
};


// Creates a new thing in the DB.
exports.create = function(req, res) {
  Registrants.create(req.body, function(err, user) {
    if(err) { return handleError(res, err); }
    return res.json(201);
  });
};

// Deletes a thing from the DB.
exports.destroy = function(req, res) {
  Registrants.findById(req.params.id, function (err, user) {
    if(err) { return handleError(res, err); }
    if(!user) { return res.send(404); }
    user.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}