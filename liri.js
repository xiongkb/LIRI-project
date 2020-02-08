require("dotenv").config();
var Spotify = require("node-spotify-api")
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);

var axios = require("axios");
var moment = require("moment");
var fs = require("fs");

var userInput = process.argv[3];
var userCommand = process.argv[2];

function concert() {
    for (var i = 4; i < process.argv.length; i++){
        userInput = userInput + "+" + process.argv[i];
    }
    axios.get("https://rest.bandsintown.com/artists/"+userInput+"/events?app_id="+keys.bandsInTown.key)
        .then(function(response) {
            for (var i = 0; i<response.data.length; i++) {
                console.log("======================");
                console.log(response.data[i].venue);
                console.log("Date: " + moment(response.data[i].datetime).format("MMMM Do YYYY, h:mm:ss a"));
                console.log("======================");
            };
        })
        .catch(function(err) {
            console.log(err.response.data.errorMessage);
        });
}

function spotifyThis() {
    if (process.argv.length < 3){
        userInput = "the+sign"
    }
    for (var i = 4; i < process.argv.length; i++){
        userInput = userInput + "+" + process.argv[i];
    }
    spotify.search({type: "track", query: userInput, limit: 1})
        .then(function(response) {
            console.log("==========================");
            console.log("Artist(s): " + response.tracks.items[0].artists[0].name);
            console.log("Song Name: " + response.tracks.items[0].name);
            console.log("Preview link: " + response.tracks.items[0].preview_url);
            console.log("Album: " + response.tracks.items[0].album.name);
            console.log("==========================")
        })
}

function movie() {
    if (process.argv.length < 3) {
        userInput = "mr+nobody"
    }
    for (var i = 4; i < process.argv.length; i++){
        userInput = userInput + "+" + process.argv[i];
    }
    axios.get("https://www.omdbapi.com/?t=" + userInput + "&apikey="+keys.ombd.key)
        .then(function(response) {
            if (response.data.Response === "False") {
                console.log(response.data.Error)
            } else {
                console.log("==============================");
                console.log("Title: " + response.data.Title);
                console.log("Year: " + response.data.Year);
                console.log("IMBD Rating: " + response.data.Ratings[0].Value);
                console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
                console.log("Country: " + response.data.Country);
                console.log("Language: " + response.data.Language);
                console.log("Plot: " + response.data.Plot);
                console.log("Actors: " + response.data.Actors);
                console.log("==============================");
            }
        });
}
switch(userCommand) {
    case "concert-this":
        concert();
        break;
    case "spotify-this-song":
        spotifyThis();
        break;
    case "movie-this":
        movie();
        break;
    case "do-what-it-says":
            fs.readFile("random.txt", "utf8", function(error, data) {
                if (error){
                    console.log(error);
                };
                console.log(data);
                var dataRay = data.split(",");
                if (dataRay[0] === "spotify-this-song") {
                    userInput = dataRay[1];
                    spotifyThis();
                }
                if (dataRay[2] === "concert-this") {
                    userInput = dataRay[3];
                    // concert();
                }
                if (dataRay[4] === "movie-this") {
                    userInput = dataRay[5];
                    // movie();
                }
            })
        break;
}