// enviromental variables with the dotenv package
require("dotenv").config();

var request = require("request");
var moment = require("moment");
var fs = require("fs");
var keys = require("./keys.js");
var spotify = require("node-spotify-api");
// var spotify = new Spotify(keys.spotify);

var command = process.argv[2];
var input = JSON.stringify(process.argv[3]);

function userCommand(command, input) {
switch (command) {
  case "concert-this":
    concertThis(input);
    break;
  case "spotify-this-song":
    spotifyThisSong(input);
    break;
  case "movie-this":
    movieThis(input);
    break;
  default:
    console.log("Please enter one of the following commands: 'concert-this', 'spotify-this-song', 'movie-this' ");
    break;
  }
};

userCommand(command, input); 




// search Spotify for songs function
function spotifyThisSong(songName) {
  var spotify = new Spotify(keys.spotify);
  spotify.search({ type: 'track', query: input }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }  
  console.log(data); 
  });
};





// Bands in Town for concerts function
function concertthis(bandQuery) {

  
}



