
var express = require('express');
var request = require('request');
var app = new express();
var path = require("path");
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var prettyjson = require('prettyjson');

//Soundprint Base Library
var Soundprint = require('./Scripts/soundprint.js')
var sp = new Soundprint();
var user = sp.User;
var calls = sp.Calls;


//App can access anything in the directories registerd below
app.use(express.static(path.join(__dirname, "Views")));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));
app.use('/Services',  express.static(__dirname + '/Services'));

app.set('Views', path.join(__dirname, 'Views'));
app.set('view engine', 'jade');


io.on('connection', function (socket) {
  
  //Last Fm Token
  socket.on('LastFmToken', function (data) {
    user.lastFmManager.authenticate(data.token, function (err, session) {
      var sess = session;
      console.log(sess);
      if (err) {
        throw err;
        }
        else{
          request.get(calls.lfm.userTopTracks(session.username, user.lastFmManager.api.api_key), function (err, response, body) 
          {
            socket.emit('lastFmRecentTracks', { body: body });
            });
        }
    });
    
  });
  
  
});


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