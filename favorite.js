




var Twit = require('twit');
var config = require('./config');
var F = new Twit(config.fav);

var dothraki = require('amm-ultra')

var params = {
   user_id :25073877,
   count:1,
   exclude_replies:true,
   include_rts:false

  }
F.get('statuses/user_timeline',params,tweet_fun)
function tweet_fun(err,data,response){
  console.log(data[0].text)
  var tweettext = data[0].text;
 // var y= tweettext.length;
  
  doth_fun(tweettext);
}
//const testString = 'testing...123 I am a test brother'

function doth_fun(testString){

dothraki.Dothraki(testString)
.then((translation) => {
  console.log( translation)
  var x=translation.length;
  console.log(x)
  if(x<=123){
  tweetdothraki(translation);
  }
})
.catch((err) => console.error(err))
}

function tweetdothraki(translate) {
  var tweet = {
    status:'@realDonaldTrump ' +translate
  }

  F.post('statuses/update', tweet, tweeted);

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
var stream_fav = F.stream('statuses/filter', { track: '#favorite528', language: 'en' });
stream_fav.on('tweet', favorite);
function favorite(tweet) {
  var favid = tweet.id_str;
  T.post('favorites/create', { id: favid }, botfavorite);

  function botfavorite(err, data, response) {
    if (err) {
      console.log('cannot favorite' + err);
    }
    else {
      console.log('favorite sucessfull !!!');
    }
  }

}*/