require("dotenv").config();

var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var keys = require("./keys");
var request = require("request");

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

//takes in users input from command line
var command = process.argv[2];
var input = process.argv[3];


//checks user input...functions will run based on the command user entered

if (command === "my-tweets"){
	getTweets();
} else if (command === "spotify-this-song"){
	getSong();
} else if (command === "movie-this"){
	getMovie();
} else if (command === "do-what-it-says"){
	getCommand();
}







/*-----------------------------------FUNCTIONS---------------------------------------------------*/


//this function fetches last 20 tweets
function getTweets(){
	var params = {screen_name: 'greenSupes691'};
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
	  if (!error) {
	    console.log(tweets);
	  }
	});
}

//takes song from user input and searches artist,song name, link of song, album
function getSong(){
	spotify.search({ type: 'track', query: input }, function(err, data) {
	  if (err) {
	    return console.log('Error occurred: ' + err);
	  }
	 
	console.log(data); 
	});
}


//this function will fetch the movie data
function getMovie(){
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
	
}


