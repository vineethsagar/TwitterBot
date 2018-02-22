var Twit = require('twit');
var config = require('./config');
var Re = new Twit(config.reply);


const Chuck  = require('chucknorris-io'),
client = new Chuck();


//const download = require('image-downloader')
var shst = require("sh.st")(config.shorte);


//var options;
var joke;
var jurl;
var shorturl;
//var tweetjoke;
setInterval(intervalfun, 1000 * 60* 5)

function intervalfun(){
 
client.getRandomJoke().then(function (response) {

//console.log(response);
 joke =response.value;
 jurl =response.sourceUrl.toString();
 console.log(jurl);
 console.log(joke);
 shorturl(jurl,joke);
}).catch(function (err) {

console.log(err);
});

}
function shorturl (link,sjoke){
  
  //console.log('function shote'+link);
//  link =link.toString();

shst.short(link, function (url) {
  //console.log("Short URL is: "+url);
  //shorturl = url;
  //tweetjoke(joke,shorturl);
  //console.log(url.status)
  //console.log(url.shortenedUrl)
  var slink=url.shortenedUrl;
  var y=sjoke.length;
  if(y<=120){
  tweetjoke(sjoke,slink)
  }
  else if(y<=130){
    tweetjoke(sjoke,'@Im_vs04')
  }
  else if(y<=138){
  tweetjoke(sjoke,'!')
  }
})

}
/*
function downloadimg(){
 options = {
  url: jimage,
  dest: './images'                  // Save to /path/to/dest/image.jpg
}

 
download.image(options)
  .then(({ filename, image }) => {
    console.log('File saved to', filename)
  }).catch((err) => {
    throw err
  })
}
*/

function tweetjoke(jokes,surls) {
  var tweet = {
    status: jokes + ' '+ surls
  }

  Re.post('statuses/update', tweet, tweeted);

  function tweeted(err, data, response) {
    if (err) {
      console.log("Sorry ! Something went wronggg!!!");
    }
    else {
      //console.log(data)
      console.log("Tweeted");
    }
  }
  ;
}














































































































/*
var stream_public = Re.stream('statuses/filter', { track: '#testingreply', language: 'en' });

stream_public.on('tweet', replytotweet);
function replytotweet(tweet) {
  var username = tweet.user.screen_name;
  console.log(username);
  console.log(tweet.text);
  var tweetid = tweet.id_str;
  console.log(tweetid);
  var idnew = tweet.user.id_str;
  console.log(idnew);
  var k = Math.floor(Math.random() * 100);
  var msg = '@' + username + ' ' + 'This is an automated reply  ' + k;

  T.post('statuses/update', {
    status: msg,
    in_reply_to_status_id: tweetid
  },
    function (err, data, response) {
      if (err) {
        console.log(err);
      }
      else {
        console.log(data.text);
      }
    }
  );
}
*/