'use strict';

var Audio = require('../audio/audio.model');
var ss = require('socket.io-stream');
var path = require('path');
var fs = require('fs');


exports.register = function(socket) {
    ss(socket).on('upload', function(stream, data) {

        var file = path.basename(data.name);
        var name = file.slice(0, file.length - 4);
        var fileName = file.slice(0, file.length - 4) + '_' + Date.now();
        var fileType = file.slice(file.length - 4, file.length);

        stream.pipe(fs.createWriteStream(path.join(__dirname, '/../../uploads/', fileName + fileType)));

        Audio.create({
            name: name,
            type: fileType,
            fileName: fileName + fileType,
        }, function(err, clip) {
            if (err) {
                return socket.emit('upload:error', err);
            }

            socket.emit('audio:update', clip);
            return socket.emit('upload:done');
        });





    });
};
