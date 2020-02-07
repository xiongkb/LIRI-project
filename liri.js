require("dotenv").config();
var Spotify = require("node-spotify-api")
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
console.log(spotify);

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
            
        break;
    case "movie-this":
        for (var i = 4; i < process.argv.length; i++){
            userInput = userInput + "+" + process.argv[i];
        }
        axios.get("https://www.omdbapi.com/?t=" + userInput + "&apikey="+keys.ombd.key)
            .then(function(response) {
                // console.log(response.data)
                if (response.data.Response === "False") {
                    console.log(response.data.Error)
                }else {
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