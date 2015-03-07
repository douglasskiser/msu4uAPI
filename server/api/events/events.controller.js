'use strict';

var _ = require('lodash');
var Events = require('./events.model');

// Get list of Events
exports.index = function(req, res) {
  Events.find(function (err, events) {
    if(err) { return res.send(500, err); }
    return res.json(200, events);
  });
};

// Creates a new event obj in the DB.
exports.create = function(req, res) {
  Events.create(req.body, function(err, evt) {
    if(err) { return res.send(500, err); }
    return res.json(200, evt);
  });
};

// Get a single event
exports.getOne = function(req, res) {
  Events.findById(req.params.id, function (err, evt) {
    if(err) { return res.send(500, err); }
    if(!evt) { return res.send(404); }
    return res.json(evt);
  });
};

// Update a single event
exports.update = function(req, res) {
  Events.findById(req.params.id, function (err, evt) {
    if(err) { return res.send(500, err); }
    if(!evt) { return res.send(404); }

    var updatedEvent = req.body;
    
    evt.name = updatedEvent.name;
    evt.description = updatedEvent.description;
    evt.date = updatedEvent.date;
    evt.time = updatedEvent.time;
    evt.location = updatedEvent.location;

    evt.save(function(err, thisEvent) {
      if(err) { return res.send(500, err); }
      return res.send(200, thisEvent);
    });
  });
};

// Remove a single event
exports.remove = function(req, res) {
  Events.findByIdAndRemove(req.params.id, function (err, evt) {
    if(err) { return res.send(500, err); }
    return res.send(204);   
  });
};