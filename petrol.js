var request = require('request');
var config = require('./config');
var schedule = require('node-schedule');
var Twit = require('twit');
var P = new Twit(config.spell);
 


var cities = ["Delhi",
    "Kolkata",
    "Mumbai",
    "Chennai",
    "Faridabad",
    "Gurgaon",
    "Noida",
    "Ghaziabad",
    "Agartala",
    "Aizwal",
    "Ambala",
    "Bangalore",
    "Bhopal",
    "Bhubhaneswar",
    "Chandigarh",
    "Dehradun",
    "Gandhinagar",
    "Gangtok",
    "Guwahati",
    "Hyderabad",
    "Imphal",
    "Itanagar",
    "Jaipur",
    "Jammu",
    "Jullunder",
    "Kohima",
    "Lucknow",
    "Panjim",
    "Patna",
    "Pondichery",
    "Port Blair",
    "Raipur",
    "Ranchi",
    "Shillong",
    "Shimla",
    "Srinagar",
    "Trivandrum",
    "Silvasa",
    "Daman"];

var i = 0;

function interval2(){
setInterval(interval,1000*60*60*24)
}

function interval() {
    setInterval(petrol, 1000 * 9)
}
function petrol() {
    var link = 'http://fuelpriceindia.herokuapp.com/price?city=' + cities[i];
   // console.log(link);
    request.get(link, function (err, res, body) {
        var a = JSON.parse(body);      
       i++;
       var tweettext = 'City : '+a.city+ ' Petrol : '+a.petrol+' Diesel : '+a.diesel+' For more visit: http://festyy.com/q8COmf'
      console.log(tweettext)
       tweetfuel(tweettext);
    })
}

function tweetfuel(text) {
  var tweet = {
    status:text
  }

  P.post('statuses/update', tweet, tweeted);

  function tweeted(err, data, response) {
    if (err) {
     // console.log(err)
      console.log("Sorry ! Something went wronggg!!!");
    }  
    
       
  }
}

