var config=require('./config');
var Twit = require('twit');
var R = new Twit(config.retweet);

var stream_retweet = R.stream('statuses/filter', { track: '#tweet528' });

stream_retweet.on('tweet', retweet);
function retweet(tweet) {
  var retweetid = tweet.id_str;
  T.post('statuses/retweet/:id', { id: retweetid }, BotRetweeted);
  function BotRetweeted(err, data, response) {
    if (err) {
      console.log('retweeting error');
    }
    else {
      console.log('retweet sucessfull !!!');
    }
  }
}