
//var config=require('./config');
//var Twit = require('twit');
//var R = new Twit(config.trailway);
const Chuck  = require('chucknorris-io'),
client = new Chuck();

 
client.getRandomJoke().then(function (response) {

console.log(response);
var  joke =response.value;
var url =response.sourceUrl;
}).catch(function (err) {

console.log(err);
});


