/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Events = require('../api/events/events.model');
var Registrants = require('../api/registrants/registrants.model');
var User = require('../api/user/user.model');
var Audio = require('../api/audio/audio.model');
var rimraf = require('rimraf');
var path = require('path');
var mkdirp = require('mkdirp');
var fs = require('fs');

Registrants.find({}).remove(function() {
  Registrants.create({
    name: 'Test Registrant',
    phone: '6068387777'
  }, function() {
      console.log('finished populating registrants');
    });
});

Events.find({}).remove(function() {
  Events.create({
    name: 'Test Event',
    description: 'Test Description About Event',
    date: Date.now(),
    time: 'Noon - 1',
    location: 'Somewhere'
  }, function() {
      console.log('finished populating events');
    });
});

User.find({}).remove(function() {
  User.create({
    provider: 'local',
    name: 'Test User',
    email: 'test@test.com',
    password: 'test'
  }, {
    provider: 'local',
    role: 'admin',
    name: 'Admin',
    email: 'admin@admin.com',
    password: 'admin'
  }, function() {
      console.log('finished populating users');
    }
  );
});

Audio.find({}).remove(function() {
  rimraf(path.join(__dirname, '/../uploads'), function(err) {
    if (err) {
      throw err;
    } else {
      fs.exists(path.join(__dirname, '/../uploads'), function(exists) {
            if (!exists) {
                mkdirp(path.join(__dirname, '/../uploads'), function(err) {
                    if (err) console.log(err);
                    console.log('uploads folder created');
                });
            }
        });
      console.log('finshed removing audio');
    }
  });
  
});