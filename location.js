console.log('location bot is starting');
var BN_Key = require('./config');
var Twit = require('twit');
//console.log(Twit);
var replyfun =require('./weather')

var config = require('./config');
var N = new Twit(config.location);
//console.log(config.tnews)
//var Websearch = require('node-bing-api')(BN_Key.bingnews);




var sultanpur = ['77.892', '17.6531', '78.1015', '17.824337']


var stream_Location = N.stream('statuses/filter', { locations: sultanpur })

stream_Location.on('tweet', function (tweet) {
  console.log(tweet)
  l_id = tweet.user.screen_name;
  l_tid = tweet.id_str;
  l_reply = tweet.coordinates;
    var postreply = 'Got your location';
    T.post('statuses/update', {
      status: postreply,
      in_reply_to_status_id: l_tid
    }, function (err, data, response) {
      if (err) {
        console.log(err);
      }
      else {
        console.log(data);
      }
    });
  
});
/*
function statusupdateweb(postreply, tweetid) {
    if(tweetid.length<6){
      fun_tid=null;
      postreply=postreply.substring(0,125)
      postreply=postreply+' #JNTUCES'

    }
    T.post('statuses/update', {
      status: postreply,
      in_reply_to_status_id: tweetid
    }, function (err, data, response) {
      if (err) {
        console.log(err);
        var k =Math.floor(Math.random()*100);
        postreply='('+k+')'+postreply;
       statusupdateweb(postreply,tweetid)
      }
      else {
        console.log(data);
      }
    });
  }
  */