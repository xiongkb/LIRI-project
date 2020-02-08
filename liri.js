require("dotenv").config();
var Spotify = require("node-spotify-api")
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);

var axios = require("axios");
var moment = require("moment");

var userInput = process.argv[3];
var userCommand = process.argv[2];

switch(userCommand) {
    case "concert-this":
        
        for (var i = 4; i < process.argv.length; i++){
            userInput = userInput + "+" + process.argv[i];
        }
        axios.get("https://rest.bandsintown.com/artists/"+userInput+"/events?app_id="+keys.bandsInTown.key)
            .then(function(response) {
                for (var i = 0; i<response.data.length; i++) {
                    console.log(response.data[i].venue);
                    console.log("Date: " + moment(response.data[i].datetime).format("MMMM Do YYYY, h:mm:ss a"));
                };
            })
            .catch(function(err) {
                console.log(err.response.data.errorMessage);
            });

        break;
    case "spotify-this-song":
        if (process.argv.length < 4){
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
        break;
    case "movie-this":
        if (process.argv.length < 4) {
            userInput = "mr+nobody"
        }
        for (var i = 4; i < process.argv.length; i++){
            userInput = userInput + "+" + process.argv[i];
        }
        axios.get("https://www.omdbapi.com/?t=" + userInput + "&apikey="+keys.ombd.key)
            .then(function(response) {
                // console.log(response.data)
                if (response.data.Response === "False") {
                    console.log(response.data.Error)
                } else {
                    console.log("==============================");
                    console.log("Title: " + response.data.Title);
                    console.log("Year: " + response.data.Year);
                    console.log("IMBD Rating: " + response.data.Ratings[0].Source);
                    console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Source);
                    console.log("Country: " + response.data.Country);
                    console.log("Language: " + response.data.Language);
                    console.log("Plot: " + response.data.Plot);
                    console.log("Actors: " + response.data.Actors);
                    console.log("==============================");
                }
            });
        break;
    case "do-what-it-says":

        break;
}