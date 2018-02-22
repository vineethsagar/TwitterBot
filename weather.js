console.log('Weather bot is starting');

//var Forecast = require('forecast');
var Twit = require('twit');
var config = require('./config');
var W = new Twit(config.weather);
var wkey =require('./config');
//var W = new w(Twit);


var Forecast = require('forecast');
var forecast = new Forecast(wkey.f);
var gmaps = require('@google/maps').createClient(wkey.g);

var lat_lon;
var uid;
var tweetid;

var stream_weather = W.stream('statuses/filter', { track: '#askweather' })

stream_weather.on('tweet', fun_weather)
function fun_weather(tweet) {
   
  var loctext = tweet.text;
  console.log(loctext);
  var uid = tweet.user.screen_name;
  console.log(uid);
  var tweetid = tweet.id_str;
  console.log(tweetid);
  //console.log(tweet);
  var topper;
  var str = tweet.text;
  str = str + ' ';
  str.toString;
  var location_address = modifyString(str);
  console.log(location_address);


  // geocoding function


  var addressgeo = location_address;
  console.log('Enterd geo coding');
  var lng;
  var lat;
  //var lat_lon;
  gmaps.geocode({
    address: addressgeo
  }, function (err, response) {
    console.log(err);
    console.log(response);
    console.log('enterd geocode');
    if (err) {
      console.log(err);
    }
    else {
      console.log(response.json.results[0].geometry.location);
    }
    console.log('geo code executed');
    var lat = response.json.results[0].geometry.location.lat;
    console.log(lat);
    var lng = response.json.results[0].geometry.location.lng;
    console.log(lng);
    lat_lon = [lat,lng];
    console.log(lat_lon);
    
    
    //forecast API


    forecast.get(lat_lon, returntemp);

    function returntemp(err, weather) {
      console.log('entered returntemp fun');
      if (err) {
        console.log(err);
        console.log('Couldnt get weather for requested location search another location ')
      }
      //console.log(weather);
      var temperature = weather.currently.temperature;
      var fhumidity = weather.currently.humidity;
      var wind = weather.currently.windSpeed;
      var pressure = weather.currently.pressure;
      var currsum = weather.currently.summary;
      var hoursum = weather.hourly.summary;
      var dailysum = weather.daily.summary;
      var reply_weather = '@' + uid + ' T:' + temperature + 'C' + ' Hum:' + fhumidity + '%' + ' WS:' + wind + 'Knot' + ' P' + pressure + 'Pa' + ' Current:' + currsum + ' Hour:' + hoursum;
      if (reply_weather.length > 136) {
        var mod_reply = reply_weather.substring(0, 136);
        statusupdateweb(reply_weather, tweetid)
      }
      else {
        statusupdateweb(reply_weather, tweetid)
      }

    }
  }

  

  );


}

  function modifyString(enterstr) {
    var S;
    var fstr = enterstr + ' ';
    fstr.toString();
    updateIndices(fstr);
    function updateIndices(istr) {
      var str = istr;
      var indices = [];
      var space = [];
      var x = 0;
      for (var i = x; i < str.length; i++) {
        if (str[i] === "#" || str[i] === "@") {
          indices.push(i);
          // console.log(indices[i])
        }
      }
      for (k = 0; k < indices.length; k++) {
        for2: for (var j = indices[k]; j < str.length; j++) {
          if (str.charAt(j) == ' ') {
            space.push(j)
            break for2;
          }
        }
      }
      for (var l = 0; l < indices.length; l++) {
        for (var m = 0; m < space.length; m++) {
          if (indices[l] < space[m]) {

            S = str.replace(str.substring(indices[l], space[m]), "");
            if (indices.length > 0) {
              updateIndices(S);
            }
          }
        }
      }
    }
    console.log(S);
    return S;
  }
 /*
  //Tweets Weather for every one hour
  Interval_forecast();
  setInterval(Interval_forecast,1000*60*60*1);
  function Interval_forecast(){
  console.log('Entered Interval')
  //fun_forecast([17.72139,78.2095723],'Im_vs04','12345');
  */

  function statusupdateweb(postreply, tweetid) {
    if (tweetid.length < 6) {
      fun_tid = null;
      postreply = postreply.substring(0, 125)
      postreply = postreply + ' #JNTUCES'

    }
    W.post('statuses/update', {
      status: postreply,
      in_reply_to_status_id: tweetid
    }, function (err, data, response) {
      if (err) {
        console.log(err);
        var k = Math.floor(Math.random() * 100);
        postreply = '(' + k + ')' + postreply;
        statusupdateweb(postreply, tweetid)
      }
      else {
        console.log(data);
      }
    });
  }
  module.exports={statusupdateweb,modifyString}




// Weather 









