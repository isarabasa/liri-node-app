// enviromental variables with the dotenv package
require("dotenv").config();

var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var Spotify = new Spotify(keys.spotify);
var fs = require("fs");

var userOption = process.argv[2];
var input = process.argv[3];

Spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
   
  console.log(data); 
  });

 userInput(userOption, inputParameter);