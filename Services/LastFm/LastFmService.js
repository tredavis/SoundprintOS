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

function TrackModel(rank, name, artist, playcount, image, url){
    this.trackRank = rank,
    this.trackArtist = artist,
    this.playCount = playcount,
    this.name = name,
    this.image = image,
    this.url = url
}

var displayContainer = [];
function DisplayData(trackObject){
    displayContainer.push(trackObject);
    var div = '';
    if(displayContainer.length > 5){
        for(var i = 0; i < displayContainer.length; i++){
            var track = displayContainer[i];
             div += '<div>Track Name: '+ track.name + 'Track Rank:'+ 
             track.trackRank + ' Play Count: ' + track.playCount + '<br/>' + 
             "<a href="+track.url +"><img src="+track.image[3]["#text"]+ "<br/></a>"  
             + '</div><br/><br/>';
             
        }
        
    }
    document.getElementById("results").innerHTML = div;
}

socket.on('lastFmRecentTracks', function(data){
    var results = JSON.parse(data.body);
    var topTracks = results.toptracks.track;
    for(var i = 0; i < topTracks.length; i++){
        var track = topTracks[i];
        var tDto = new TrackModel(track['@attr'].rank, track.name, track.artist, track.playcount, track.image, track.url );
        DisplayData(tDto);
    }
    
});
});

