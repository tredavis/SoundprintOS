$(document).ready(function(){
var socket = io.connect('http://localhost:8080');

//Get Parameter By Name
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

var lastFmToken = getParameterByName("token");

function emitToken(token){
    
    if(token != '')
    socket.emit('LastFmToken', { token : token});
    
    }

emitToken(lastFmToken);

socket.on('lastFmRecentTracks', function(data){
   console.log(JSON.parse(data.body)); 
});
});

