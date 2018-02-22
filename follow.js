var Twit = require('twit');
var config = require('./config');
var T = new Twit(config.rest);

var stream_user = T.stream('user');
stream_user.on('follow', followed);
// Replies to the follower
function followed(eventMsg) {
  console.log("Followed");
  var name = eventMsg.source.name;
  var screenName = eventMsg.source.screen_name;
  followerReply('Hii ' + '@' + screenName + ' Thanks for following')
}
function followerReply(text) {

  var reply = {
    status: text
  }

  T.post('statuses/update', reply, replied);
  function replied(err, data, response) {
    if (err) {
      console.log("Replied to follower");

    }
    else {
      console.log(data);
    }
  }
}