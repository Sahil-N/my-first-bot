

var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
var inquirer = require("inquirer");
var request = require("request");
var keys = require("./keys");
var tweetCount = 20;




var client = new Twitter({
  consumer_key: keys.twitterKeys.consumer_key,
  consumer_secret: keys.twitterKeys.consumer_secret,
  access_token_key: keys.twitterKeys.access_token_key,
  access_token_secret: keys.twitterKeys.access_token_secret
});

var spotify = new Spotify({
  id: keys.spotifyKeys.clientId,
  secret: keys.spotifyKeys.clientSecret
});






console.log("the bot has started");
console.log("******");
console.log("*****");
console.log("***");
console.log("**");
console.log("*");
start();


//console.log(keys);


function start(){

  inquirer.prompt([
    {
      type: "list",
      name: "userInput",
      message: "What would you like to do?",
      choices: ["Show me tweets", "Lookup music", "Lookup film", "end it"]
    }
  ])
  // console.log("");
  .then(function(introResponse) {
    switch (introResponse.userInput) {
      case "Show me tweets":
        console.log("");
        callTwitter();
        break;

      case "Lookup music":
        console.log("");
        callSpotify();
        break;

      case "Lookup film":
        console.log("");
        callOmdb();
        break;

      case "end it":
        console.log("");
        console.log("");
        console.log("");
        console.log("See you Space Bowboy...");
        console.log("");
        console.log("");
        console.log("");
        console.log("            ^^                   @@@@@@@@@");
        console.log("       ^^       ^^            @@@@@@@@@@@@@@@");
        console.log("                            @@@@@@@@@@@@@@@@@@");
        console.log("                           @@@@@@@@@@@@@@@@@@@@");
        console.log(" ~~~~ ~~ ~~~~~ ~~~~~~~~ ~~ &&&&&&&&&&&&&&&&&&&& ~~~~~~~ ~~~~~~~~~~~ ~~~");
        console.log(" ~         ~~   ~  ~       ~~~~~~~~~~~~~~~~~~~~ ~       ~~     ~~ ~");
        console.log("   ~      ~~      ~~ ~~ ~~  ~~~~~~~~~~~~~ ~~~~  ~     ~~~    ~ ~~~  ~ ~~");
        console.log("   ~  ~~     ~         ~      ~~~~~~  ~~ ~~~       ~~ ~ ~~  ~~ ~");
        console.log(" ~  ~       ~ ~      ~           ~~ ~~~~~~  ~      ~~  ~             ~~");
        console.log("       ~             ~        ~      ~      ~~   ~             ~ ");
        console.log("");
        console.log("");
        console.log("");
        console.log("");
        console.log("");
        console.log("");
        console.log("");
        console.log("");
        console.log("");
        console.log("");
        console.log("");
        console.log("");

        break;
    }
  })
};












function callTwitter() {
  inquirer.prompt([
    {
      type: "list",
      name: "twitName",
      message: "Choose a rapper", 
      choices: ["OfficiaIKanye", "gucci1017", "1future", "JheneAiko", "torylanez"]
    }
  ])

  .then(function(twitterLook) {
    var params = {screen_name: twitterLook.twitName };
    client.get("statuses/user_timeline", params, function(error, tweets, response) {
      if (!error) {
        for (var i=0; i < tweetCount; i++){
          
          console.log("*****")

          console.log(i + ". ");
          console.log(tweets[i].text);
          console.log(tweets[i].created_at);

          console.log("*****")

        }
      console.log("******************************")
      console.log("");
      start();
      }

      else {
        console.log(error);
        start();
      }
    });
  })
};





var spotSong = "thong song";





function callSpotify() {
  inquirer.prompt([
    {
      type: "list",
      name: "musicSearch",
      message: "What's your favorite song?", 
      choices: ["Wonderwall", "Barbie Girl", "Thong Song", "Who let the dogs out"]
    }
  ])

  .then(function(spotifyLook) {
    spotify.search({ type: "track", query: spotifyLook.musicSearch}, function(err, data){
      if(err) {
        return console.log('Error occurred: ' + err);
        start();

      }
      // console.log(data.tracks.items[0].album.name); //test
      console.log("Track: " + data.tracks.items[0].name);
      console.log("Artist: " + data.tracks.items[0].artists[0].name);
      console.log("Album: " + data.tracks.items[0].album.name);//finish this
      console.log("Link: " + data.tracks.items[1].href);
      start();
    })
  })
};

function callOmdb() {
  inquirer.prompt([
    {
      type: "list",
      name: "movieSearch",
      message: "What's your favorite movie?", 
      choices: ["Hocus Pocus", "Human Centipede", "Sharknado", "Air Bud"]
    }
  ])
  .then(function(omdbLook) {


    var answer = omdbLook.movieSearch;
    var queryUrl = "http://www.omdbapi.com/?t=" + answer + "&y=&plot=short&apikey=40e9cece";
  
    request(queryUrl, function(error, response, body) {
      if (!error && response.statusCode === 200) {
      // console.log(JSON.parse(body));
      console.log("");
      console.log("Title: " + JSON.parse(body).Title);//year
      console.log("");
      console.log("Year: " + JSON.parse(body).Year);//year
      console.log("");
      console.log("IMDB Rating: " + JSON.parse(body).imdbRating);//imdb rating
      console.log("");
      // console.log("R. Tomatos Rating: " + JSON.parse(body.Ratings));//rt rating
      console.log("Produced in: " + JSON.parse(body).Country);//country produced
      console.log("");
      console.log("Language: " + JSON.parse(body).Language);//language
      console.log("");
      console.log("Starring: " + JSON.parse(body).Actors);//actors
      console.log("");
      console.log("Plot: " + JSON.parse(body).Plot);//plot
      console.log("");
      start();
      }

    })
  });
};






// callSpotify();
// callTwitter();

 


 
