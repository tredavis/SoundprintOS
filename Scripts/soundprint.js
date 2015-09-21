var apiKeys = require('/Users/Montre/Dev/SoundprintOS/SoundprintOS/Scripts/apikeys.js');
var lastFmCustomCalls = require('/Users/Montre/Dev/SoundprintOS/SoundprintOS/Services/LastFm/lastFmCalls.js');
var LastfmAPI = require('lastfmapi');
var Keys = apiKeys();
var lfm = new LastfmAPI({ api_key: Keys.LastFm.apiKey, secret: Keys.LastFm.secret});

function SoundPrint() {
	this.User = {
		type: "Sound Print User",
		spotifyLibrary: null,
		lastFmLibrary: null,
		lastFmManager: lfm
	}
	
	this.ApiCalls = {
		type: "Pre Built Calls",
		lfm: lastFmCustomCalls
	}

	var about = {
		Version: "1.0.0",
		Author: "Montre Davis",
		Created: "2015",
		Updated: "September 2015"
	};

	return this;
};

SoundPrint.prototype.signIn = function(){

};

module.exports = SoundPrint;