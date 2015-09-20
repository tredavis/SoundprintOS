
var express = require('express');
var app = new express();
var path = require("path");

//Soundprint Base Library
var Soundprint = require('./Scripts/soundprint.js')
var sp = new Soundprint();
var user = sp.User;


//App can access anything in the directories registerd below
app.use(express.static(path.join(__dirname, "Views")));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));
app.use('/Services',  express.static(__dirname + '/Services'));

app.set('Views', path.join(__dirname, 'Views'));
app.set('view engine', 'jade');

var server = require('http').createServer(app);

app.route("/")
.get(function(req, res){
	res.redirect('index.html');
})
.post(function(req, rest){
	console.log(req);
})

//LastFM
app.route('/lastfmsignin')
.get(function(req, res){
    var authUrl = user.lastFmManager.getAuthenticationUrl({ 'cb': 'http://localhost:8080/' });
    res.redirect(authUrl);
	
	})
	.post(function(request, response){
		
	})

app.get('/?token*/', function(){
   res.redirect('google.com');
});
//404 Page Error
app.use(function (req,res) {
    res.render('404', {url:req.url});
});



console.log('listening on 8080')
server.listen(8080)