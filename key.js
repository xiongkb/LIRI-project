js
console.log("this is loaded");

exports.spotify = {
    id: process.env.SPOTIFY_ID,
    secret: process.env.SPOTIFY_SECRET
};

// key for OMBd: http://www.omdbapi.com/?i=tt3896198&apikey=86ef8aed [86ef8aed]
// key for BandsinTown: https://rest.bandsintown.com/artists/celine+dion/events?app_id=codingbootcamp [codingbootcamp]