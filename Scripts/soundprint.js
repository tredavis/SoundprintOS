var apiKeys = require('/Users/Montre/Dev/SoundprintOS/SoundprintOS/Scripts/apikeys.js')
var Keys = apiKeys();
var LastfmAPI = require('lastfmapi');
var lfm = new LastfmAPI({
    api_key: Keys.LastFm.apiKey,    // sign-up for a key at http://www.last.fm/api
    secret: Keys.LastFm.secret,
    //  useragent: 'appname/vX.X MyApp' // optional. defaults to lastfm-node.
});

function SoundPrint() {
	this.User = {
		type: "Sound Print User",
		spotifyLibrary: null,
		lastFmLibrary: null,
		lastFmManager: lfm
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