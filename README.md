# Liri

## Description

LIRI is a Language Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data.

## Running App

LIRI takes in 4 different commands:
* `my-tweets`
** Show last 20 tweets

* `spotify-this-song`
** Returns Artist, song name, preview link of song from Spotify and album of the song entered

* `movie-this`
** Returns Title of the movie, year the movie came out, IMDB Rating of the movie, Rotten Tomatoes Rating of the movie, Country where the movie was produced, Language of the movie, plot of the movie, actors in the movie.

* `do-what-it-says`
** Takes in the text from random.txt file and will use it to run of the Liri commands

## Technologies/Languages Used

* Javascript
* Node
* NPM
** Twitter
** Spotify
** Request
** Dotenv
* OMDB API
* Command Line

## Code Snippets

* `movie-this`
```
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
```
