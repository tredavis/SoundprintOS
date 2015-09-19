var LastfmAPI = require('lastfmapi');
var lfm = new LastfmAPI({
    api_key: '2b8b02b383d09762b0c035a6df2d17b4',    // sign-up for a key at http://www.last.fm/api
    secret: '502d28218a3b06ada17c49e19d842fe1',
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