var request = require("request");
var fs = require("fs");
var nodeArgs = process.argv;
var commands = nodeArgs[2];
var titleArgs = [];
for (var i = 3; i < nodeArgs.length; i++) {
  titleArgs.push(nodeArgs[i]);
}

var title = titleArgs.join(" ");

var twitterKeys = require("./keys.js");
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var client = new Twitter(twitterKeys);
var spotify = new Spotify({
  id: "4469a9de63dd4bb5a6122e375fb62bdc",
  secret: "d01a09238553410192b635d4322b153b"
});
var queryUrl = "http://www.omdbapi.com/?t=" + title + "&y=&plot=short&apikey=trilogy";


switch(commands){
	case "my-tweets":
		client.get('statuses/home_timeline', function(error, tweets, response) {
		  if(error) throw error;
		  if (tweets.length < 20){
		  	for(var i = 0; i < tweets.length; i++){
		  	console.log(tweets[i].created_at);
		  	console.log("Tweet: " + tweets[i].text);  
		  	 console.log("*******************************************\n")
		  	}
		  }
		  else if(tweets.length >= 20){
		  	for(var i = 0; i < 20; i++){
		  	console.log(tweets[i].created_at);
		  	console.log("Tweet: " + tweets[i].text);  
		  	 console.log("*******************************************\n")
		  	}
		  }
		  

		  // console.log(response); 
		});
		break;
	case "spotify-this-song":
		if(title === ""){

			spotify.search({ type: 'track', query: 'dark horse'}, function(err, data) {
			  if (err) {
			    return console.log('Error occurred: ' + err);
			  }
			 console.log("Artist(s): " + data.tracks.items[0].artists[0].name);
			 console.log("Song Name: " + data.tracks.items[0].name);
			 console.log("Sample Link: " + "https://open.spotify.com/embed?uri="+data.tracks.items[0].uri);
			 console.log("Album: " + data.tracks.items[0].album.name);
			 console.log("\n");
			
			});
		}
		else if(title !== ""){

			spotify.search({ type: 'track', query: title}, function(err, data) {
			  if (err) {
			    return console.log('Error occurred: ' + err);
			  }
			 console.log("Artist(s): " + data.tracks.items[0].artists[0].name);
			 console.log("Song Name: " + data.tracks.items[0].name);
			 console.log("Sample Link: " + "https://open.spotify.com/embed?uri="+data.tracks.items[0].uri);
			 console.log("Album: " + data.tracks.items[0].album.name);
			 console.log("\n");
			
			});
		}
		break;
	case "movie-this":

		if(title === ""){
			queryUrl = "http://www.omdbapi.com/?t= Mr Nobody &y=&plot=short&apikey=trilogy";
			request(queryUrl, function(error, response, body){
			 if (!error && response.statusCode === 200) {
			 	console.log("*Movie Title: " + JSON.parse(body).Title);
		    	console.log("*Year: " + JSON.parse(body).Released);
		    	console.log("*IMDB Rating: " + JSON.parse(body).imdbRating);
		    	console.log("*Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
		    	console.log("*Country: " + JSON.parse(body).Country);
		    	console.log("*Plot: " + JSON.parse(body).Plot);
		    	console.log("*Actors: " + JSON.parse(body).Actors);
		    	console.log("\n");
		  }
		});
	}else if(title !== ""){
		request(queryUrl, function(error, response, body){
			 if (!error && response.statusCode === 200) {
			 	console.log("*Movie Title: " + JSON.parse(body).Title);
		    	console.log("*Year: " + JSON.parse(body).Released);
		    	console.log("*IMDB Rating: " + JSON.parse(body).imdbRating);
		    	console.log("*Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
		    	console.log("*Country: " + JSON.parse(body).Country);
		    	console.log("*Plot: " + JSON.parse(body).Plot);
		    	console.log("*Actors: " + JSON.parse(body).Actors);
		    	console.log("\n");
		  }

		});
	}
		
		break;
	case "do-what-it-says":
		fs.readFile("random.txt", "utf8", function(error, data) {

		  // If the code experiences any errors it will log the error to the console.
		  if (error) {
		    return console.log(error);
		  }

		  // We will then print the contents of data
		  var action = data;
		  var actionArr = action.split(" ");
		  var command = actionArr[0];
		  var titleArr = [];
		  for (var i = 1; i < actionArr.length; i++) {
			  titleArr.push(actionArr[i]);
			}
		var title2 = titleArr.join(" ");


		switch(command){
				case "my-tweets":
					client.get('statuses/home_timeline', function(error, tweets, response) {
					  if(error) throw error;
					  if (tweets.length < 20){
					  	for(var i = 0; i < tweets.length; i++){
					  	console.log(tweets[i].created_at);
					  	console.log("Tweet: " + tweets[i].text);  
					  	 console.log("*******************************************\n")
					  	}
					  }
					  else if(tweets.length >= 20){
					  	for(var i = 0; i < 20; i++){
					  	console.log(tweets[i].created_at);
					  	console.log("Tweet: " + tweets[i].text);  
					  	 console.log("*******************************************\n")
					  	}
					  }
					  

					  // console.log(response); 
					});
					break;
				case "spotify-this-song":
					if(title2 === ""){

						spotify.search({ type: 'track', query: 'dark horse'}, function(err, data) {
						  if (err) {
						    return console.log('Error occurred: ' + err);
						  }
						 console.log("Artist(s): " + data.tracks.items[0].artists[0].name);
						 console.log("Song Name: " + data.tracks.items[0].name);
						 console.log("Sample Link: " + "https://open.spotify.com/embed?uri="+data.tracks.items[0].uri);
						 console.log("Album: " + data.tracks.items[0].album.name);
						 console.log("\n");
						
						});
					}
					else if(title2 !== ""){

						spotify.search({ type: 'track', query: title2}, function(err, data) {
						  if (err) {
						    return console.log('Error occurred: ' + err);
						  }
						 console.log("Artist(s): " + data.tracks.items[0].artists[0].name);
						 console.log("Song Name: " + data.tracks.items[0].name);
						 console.log("Sample Link: " + "https://open.spotify.com/embed?uri="+data.tracks.items[0].uri);
						 console.log("Album: " + data.tracks.items[0].album.name);
						 console.log("\n");
						
						});
					}
					break;
				case "movie-this":

					if(title2 === ""){
						queryUrl = "http://www.omdbapi.com/?t= Mr Nobody &y=&plot=short&apikey=trilogy";
						request(queryUrl, function(error, response, body){
						 if (!error && response.statusCode === 200) {
						 	console.log("*Movie Title: " + JSON.parse(body).Title);
					    	console.log("*Year: " + JSON.parse(body).Released);
					    	console.log("*IMDB Rating: " + JSON.parse(body).imdbRating);
					    	console.log("*Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
					    	console.log("*Country: " + JSON.parse(body).Country);
					    	console.log("*Plot: " + JSON.parse(body).Plot);
					    	console.log("*Actors: " + JSON.parse(body).Actors);
					    	console.log("\n");
					  }
					});
				}else if(title2 !== ""){
					request(queryUrl, function(error, response, body){
						 if (!error && response.statusCode === 200) {
						 	console.log("*Movie Title: " + JSON.parse(body).Title);
					    	console.log("*Year: " + JSON.parse(body).Released);
					    	console.log("*IMDB Rating: " + JSON.parse(body).imdbRating);
					    	console.log("*Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
					    	console.log("*Country: " + JSON.parse(body).Country);
					    	console.log("*Plot: " + JSON.parse(body).Plot);
					    	console.log("*Actors: " + JSON.parse(body).Actors);
					    	console.log("\n");
					  }

					});
				}
					
					break;
				}

		});
	break;
}