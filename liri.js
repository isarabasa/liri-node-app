// enviromental variables with the dotenv package
require("dotenv").config();

var axios = require("axios");
var request = require("request");
var moment = require("moment");
var fs = require("fs");
var keys = require("./keys.js");
var spotify = require("node-spotify-api");
var spotify = new spotify(keys.spotify);

// var spotify = new Spotify({
//   id: keys.spotify.id,
//   secret: keys.spotify.secret
// });

var command = process.argv[2];
// var input = JSON.stringify(process.argv[3]);


// CONCERT
if (command === "concert-this") {

  var artist = process.argv[3];

  request("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp", function (error, response, body) {

      if (!error && response.statusCode === 200) {
          console.log("-------------------------------------");
          console.log("Venue: " + JSON.parse(body)[0].venue.name);
          console.log("Location: " + JSON.parse(body)[0].venue.city + " " + JSON.parse(body)[0].venue.region);
          console.log("Date: " + moment(JSON.parse(body)[0].datetime).format("MM/DD/YYYY"));
          console.log("-------------------------------------");
      }
  });

    // SONG SPOTIFY
} else if (command === "spotify-this-song") {
  var song = process.argv[3];

  if (song === undefined) {
      song = "The Sign";
  }

  spotify.search({
      type: "track",
      query: song
  }, function (err, data) {
      if (err) {
          return console.log("Error occured: " + err);
      }
      // console.log(data.tracks.items[0]);
      console.log("-------------------------------------");
      console.log("Artist: " + data.tracks.items[0].artists.name);
      console.log("Song Name: " + data.tracks.items[0].name);
      console.log("Preview Link: " + data.tracks.items[0].preview_url);
      console.log("Album: " + data.tracks.items[0].album.name);
      console.log("-------------------------------------");
  });


    //  MOVIE
} else if (command === "movie-this") {

  var movie = process.argv[3];

  if (movie === undefined) {
      movie = "Mr. Nobody";
  }

  request("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy", function (error, response, body) {

      if (!error && response.statusCode === 200) {

          // Information about Movie
          console.log("-------------------------------------");
          console.log("Title: " + JSON.parse(body).Title);
          console.log("Year Released: " + JSON.parse(body).Year);
          console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
          console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
          console.log("Country Produced: " + JSON.parse(body).Country);
          console.log("Language: " + JSON.parse(body).Language);
          console.log("Plot: " + JSON.parse(body).Plot);
          console.log("Actors: " + JSON.parse(body).Actors);
          console.log("-------------------------------------");
      }
  });

    // Do what it says
} else if (command === "do-what-it-says") {

    fs.readFile("random.txt", "utf8", function (error, data) {

        if (error) {
            return console.log(error);
        }

        console.log(data);
        var dataArr = data.split(",");
        console.log(dataArr);

        command = dataArr[0];
        whatToCommand = dataArr[1];

        if (command === "concert-this") {

            var artist = whatToCommand;

            request("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp", function (error, response, body) {

                if (!error && response.statusCode === 200) {
                    console.log("-------------------------------------");
                    console.log("Venue: " + JSON.parse(body)[0].venue.name);
                    console.log("Location: " + JSON.parse(body)[0].venue.city + " " + JSON.parse(body)[0].venue.region);
                    console.log("Date: " + moment(JSON.parse(body)[0].datetime).format("MM/DD/YYYY"));
                    console.log("-------------------------------------");
                }
            });


            // Do what it says SONG
        } else if (command === "spotify-this-song") {
            var song = whatToCommand;

            if (song === undefined) {
                song = "The Sign";
            }

            spotify.search({
                type: "track",
                query: song
            }, function (err, data) {
                if (err) {
                    return console.log("Error occured: " + err);
                }
                console.log(data.tracks.items[0].album[0]);
            });

            // Do what it says MOVIE
        } else if (command === "movie-this") {

            var movie = whatToCommand;

            if (movie === undefined) {
                movie = "Mr. Nobody";
            }

            request("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy", function (error, response, body) {

                if (!error && response.statusCode === 200) {

                    // Movie INFO
                    console.log("-------------------------------------");
                    console.log("Title: " + JSON.parse(body).Title);
                    console.log("Year Released: " + JSON.parse(body).Year);
                    console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
                    console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
                    console.log("Country Produced: " + JSON.parse(body).Country);
                    console.log("Language: " + JSON.parse(body).Language);
                    console.log("Plot: " + JSON.parse(body).Plot);
                    console.log("Actors: " + JSON.parse(body).Actors);
                    console.log("-------------------------------------");
                }
            });


            // IF Command incorrectly entered
        } else {
            console.log("Command Error");
        }

        console.log("-------------------------------------");
        console.log("Command: ", command);
        console.log("-------------------------------------");
    });


    // IF Command not entered or incorrectly entered
} else {
    console.log("Command Error");
}
