//import { start } from "repl";

require("dotenv").config();

var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var keys = require("./keys");
var request = require("request");
var fs = require("fs");

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

//takes in users input from command line
var command = process.argv[2];
var input = process.argv[3];

//Start Liri to accept a command
startLiri(command, input);

//checks user input...functions will run based on the command user entered
function whichCommand(caseData, functionData){
	switch (caseData) {
		case "my-tweets":
			getTweets();
			break;
		case "spotify-this-song":
			getSong(functionData);
			break;
		case "movie-this":
			getMovie(functionData);
			break;
		case "do-what-it-says":
			getCommand();
			break;
		default:
			console.log("Sorry, I don't recognize that. Enter one of the following commands: my-tweets, spotify-this-song, movie-this or do-what-it-says");
	}
}

function startLiri(command, input){
	whichCommand(command,input);
}


/*-----------------------------------FUNCTIONS---------------------------------------------------*/


//this function fetches last 20 tweets
function getTweets(){
	var params = {
		screen_name: "greenSupes691"
	};
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
	  if (!error) {
			for (var i =0; i < tweets.length; i++){
				console.log(tweets[i].created_at);
				console.log("");
				console.log(tweets[i].text);
			}
	  }
	});
}


// Writes to the log.txt file
var getArtistNames = function(artist) {
  return artist.name;
};

//takes song from user input and searches artist,song name, link of song, album
function getSong(input){
	spotify.search({
		type: 'track',
		query: input
	},
	function(err, data) {
	  if (err) {
	    return console.log('Error occurred: ' + err);
	  }
		var songs = data.tracks.items;

		for (var i = 0; i < songs.length; i++) {
			console.log(i);
			console.log("artist(s): " + songs[i].artists.map(getArtistNames));
			console.log("song name: " + songs[i].name);
			console.log("preview song: " + songs[i].preview_url);
			console.log("album: " + songs[i].album.name);
			console.log("-----------------------------------");
		}
	});
}


//this function will fetch the movie data
function getMovie(input){
	var movieName = input;
	//request url to use movieName input from user
	var queryURL = "http://www.omdbapi.com/?t=" + movieName + "&plot=short&tomatoes=true&apikey=b9acf8b7";

	//url runs and returns response
	request(queryURL, function(error, response, body) {

	//if there is an error, it will log an error
	  if (error) {
	    console.log("An error occured");
	  }

	  //if there is NO error, the response will be logged
	  console.log("\nTitle: " + JSON.parse(body).Title + "\nRelease Year: " + JSON.parse(body).Year + "\nIMDB Rating: " + JSON.parse(body).imdbRating + "\nRotten Tomatoes Rating: " + JSON.parse(body).Ratings[2].Value + "\nCountry Origin: " + JSON.parse(body).Country + "\nMovie Language(s): " + JSON.parse(body).Language + "\nPlot: " + JSON.parse(body).Plot + "\nActors: " + JSON.parse(body).Actors);

	});
}


//takes text in random.txt and uses it to call one of the LIRI commands
function getCommand(){
	fs.readFile("random.txt", "utf8", function(error, data) {
	        if (error) {
	            console.log(error);
	        }else {
	        	//takes the text in random.txt file and splits it where there is a comma and puts the strings into an array
	            var dataArr = data.split(",");
	            var command = dataArr[0];
	            var input = dataArr[1];
							console.log(command + input);
							
							if(dataArr.length === 2){
								startLiri(command, input);
							} else if (dataArr.length ==1){
								startLiri(command);
							}	            
	        }
	    });
}


