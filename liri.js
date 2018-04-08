//Required Files & NPMs
require("dotenv").config();
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require("request"); 
var fs = require("fs");
var keys = require ("./keys.js"); 

//Objects containing API keys
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

//Input from user
var args = process.argv.slice(2);


//Twitter
    if (args[0] ==='my-tweets') {
        myTweets();
    }

    function myTweets() {
        var params = {BrittFlanagan89: 'nodejs', count: 20};
        client.get('statuses/user_timeline', params, function(error, tweets, response) {
            if (!error) {
                console.log("-----------------------");
                console.log(tweets[0].text);
                fs.appendFile('log.txt',"Request | my-tweets: "+tweets[0].text+"\n", function(err) {if (err) {return console.log(err);}});    
            }  
        });
    }

//Movies
    if (args[0] ==='movie-this') {
        var movieName;
        if (args.length < 2) {
            movieName = "Mr Nobody";
            movieThis(movieName);
        } else {
            var movieEntered = args[1];
            movieName = movieEntered.substr(1).slice(0, -1);
            movieThis(movieName);  
        }
    }

    function movieThis(movieName) {
        var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
        request(queryUrl, function(error, response, body) {
            if (!error && response.statusCode === 200) {
                console.log("-----------------------");
                console.log("Movie Title: " + JSON.parse(body).Title);
                console.log("Release Year: " + JSON.parse(body).Year);
                console.log("Rated: " + JSON.parse(body).Rated);
                fs.appendFile('log.txt',"Request | Movie Title: " + JSON.parse(body).Title+"\n", function(err) {if (err) {return console.log(err);}});
                fs.appendFile('log.txt',"Request | Release Year: " + JSON.parse(body).Year+"\n", function(err) {if (err) {return console.log(err);}}); 
                fs.appendFile('log.txt',"Request | Rated: " + JSON.parse(body).Rated+"\n", function(err) {if (err) {return console.log(err);}}); 
                    if (JSON.parse(body).Ratings.length >2) {
                        console.log("IMB Rating: " + JSON.parse(body).Ratings[0].Value);
                        console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
                        fs.appendFile('log.txt',"Request | IMB Rating: " + JSON.parse(body).Ratings[0].Value+"\n", function(err) {if (err) {return console.log(err);}}); 
                        fs.appendFile('log.txt',"Request | Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value+"\n", function(err) {if (err) {return console.log(err);}}); 
                    } else {
                        console.log("IMB Rating: " + JSON.parse(body).Ratings[0].Value);
                        fs.appendFile('log.txt',"Request | IMB Rating: " + JSON.parse(body).Ratings[0].Value+"\n", function(err) {if (err) {return console.log(err);}});
                    }
                console.log("Country: " + JSON.parse(body).Country);
                console.log("Language: " + JSON.parse(body).Language);
                console.log("Plot: " + JSON.parse(body).Plot);
                console.log("Actors: " + JSON.parse(body).Actors);  
                fs.appendFile('log.txt',"Request | Country: " + JSON.parse(body).Country+"\n", function(err) {if (err) {return console.log(err);}}); 
                fs.appendFile('log.txt',"Request | Language: " + JSON.parse(body).Language+"\n", function(err) {if (err) {return console.log(err);}}); 
                fs.appendFile('log.txt',"Request | Plot: " + JSON.parse(body).Plot+"\n", function(err) {if (err) {return console.log(err);}}); 
                fs.appendFile('log.txt',"Request | Actors: " + JSON.parse(body).Actors+"\n", function(err) {if (err) {return console.log(err);}}); 
            }
        });
    }


//Spotify
    var songName;
    if (args[0] ==='spotify-this-song') {
        if (args.length < 2) {
            songName = "The Sign";
            spotifySong(songName);
        } 
        else {
            var songEntered = args[1];
            songName = songEntered.substr(1).slice(0, -1);
            console.log(songName);
            spotifySong(songName);        
        }
    }

    function spotifySong(songName) {
        spotify.search({ type: 'track', query: songName }, function(err, data) {
            if (err) {
            return console.log('Error occurred: ' + err);
            } 
            
            if (songName === "The Sign") {
                console.log("THE SIGN");
                console.log("-----------------------");
                console.log("Song Name: " + data.tracks.items[5].name);
                console.log("Artist: " + data.tracks.items[5].artists[0].name);  
                console.log("Preview URL: " + data.tracks.items[5].preview_url);
                console.log("Album: " + data.tracks.items[5].album.name);
                fs.appendFile('log.txt',"Request | Song Name: " + data.tracks.items[5].name+"\n", function(err) {if (err) {return console.log(err);}});
                fs.appendFile('log.txt',"Request | Artist: " + data.tracks.items[5].artists[0].name+"\n", function(err) {if (err) {return console.log(err);}});
                fs.appendFile('log.txt',"Request | Preview URL: " + data.tracks.items[5].preview_url+"\n", function(err) {if (err) {return console.log(err);}});
                fs.appendFile('log.txt',"Request | Album: " + data.tracks.items[5].album.name+"\n", function(err) {if (err) {return console.log(err);}});
            }

            else {
                for(var i = 0; i < data.tracks.items.length; i++){ 
                    console.log("SONGS THAT CONTAIN "+songName);
                    console.log("-----------------------");
                    console.log("Song Name: " + data.tracks.items[i].name);
                    console.log("Artist: " + data.tracks.items[i].artists[0].name);  
                    console.log("Preview URL: " + data.tracks.items[i].preview_url);
                    console.log("Album: " + data.tracks.items[i].album.name);
                    fs.appendFile('log.txt',"Request | Song Name: " + data.tracks.items[i].name+"\n", function(err) {if (err) {return console.log(err);}});
                    fs.appendFile('log.txt',"Request | Artist: " + data.tracks.items[i].artists[0].name+"\n", function(err) {if (err) {return console.log(err);}});
                    fs.appendFile('log.txt',"Request | Preview URL: " + data.tracks.items[i].preview_url+"\n", function(err) {if (err) {return console.log(err);}});
                    fs.appendFile('log.txt',"Request | Album: " + data.tracks.items[i].album.name+"\n", function(err) {if (err) {return console.log(err);}});    
                }
            }
        });
    }

//Random File
    if (args[0] ==='do-what-it-says') {
        fs.readFile("random.txt", "utf8", function(error, data) { 
            if (error) {
                return console.log(error);
            }
            console.log(data);
            var dataArr = data.split(",");
            console.log(dataArr);
            if (dataArr[0] === "spotify-this-song") {
                spotifySong(dataArr[1]);
            }
            if (dataArr[0] === "movie-this") {
                movieThis(dataArr[1]);
            }
            if (dataArr[0] === "my-tweets") {
                myTweets();
            }
        });
    } 