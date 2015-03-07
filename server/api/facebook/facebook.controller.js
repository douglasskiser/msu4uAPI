'use strict';

var sdk = require('facebook-node-sdk');

var request = require('request-json');

var facebookAPI = request.newClient('https://graph.facebook.com/v2.2/MoreheadStateUniversity/feed?access_token=260853504110892|7b4da6aec523657fae20184e6301e955');

/**
var fb = new sdk({
    appId: '1549571105313567',
	secret: 'b8db84b569fc8957292241ee3a8d1fc7'
}).setAccessToken(createdAccessToken);
**/
/**
fb.options({
	appId: '1549571105313567',
	appSecret: 'b8db84b569fc8957292241ee3a8d1fc7'
});
**/

// Get facebook feed
exports.index = function(req, res) {
facebookAPI.get('', function(err, response, body) {
		if (!err) {
			return res.json(body.data);
		}
	});
};