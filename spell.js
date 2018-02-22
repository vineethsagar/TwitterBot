//var D = require('./demo')

console.log('Spell Bot')
var Twits = require('twit');
var BS_Key= require('./config');
var replyFun = require('./weather.js')
var config = require('./config');
//console.log(config);
var Spell_twit = new Twits(config.spell);
//console.log(Spell_twit);
console.log(BS_Key.bingspell);
var Bing = require('node-bing-api')({ accKey:BS_Key.bingspell});
//console.log(Bing);
var stream_spell = Spell_twit.stream('statuses/filter', { track: '#checkspell' })
 //console.log(stream_spell);
   stream_spell.on('tweet', function (tweet) {

    console.log('enterd spell function');
    var OriginalText = tweet.text;
    var Bingstr;
    var spellUserId = tweet.user.screen_name;
    console.log(spellUserId);
    var spellTweetId = tweet.id_str;
    console.log(spellTweetId);
  
    var Tweetstr = OriginalText + ' ';
    Tweetstr.toString;
    console.log(Tweetstr.length);
  
    var mstr =replyFun.modifyString(Tweetstr);
  
    console.log(mstr);
    Bing.spelling(mstr, function (err, res, body) {
      //console.log(body);
     // console.log(res);
     //console.log(err);
     if( body.flaggedTokens.length>0){
      for (var i = 0; i < body.flaggedTokens.length; i++) {
        for (var j = 0; j < body.flaggedTokens[i].suggestions.length; j++) {
          console.log('wrong : ' + body.flaggedTokens[i].token + '   correct : ' + body.flaggedTokens[i].suggestions[j].suggestion);
          var x = body.flaggedTokens[i].token;
          var y = body.flaggedTokens[i].suggestions[0].suggestion;
          console.log(y);
          mstr = mstr.replace(x, y);
          console.log(mstr);
        }
      }
      Bingstr = mstr;
      console.log('bing string' + Bingstr);
      statusupdate(spellTweetId, spellUserId, Bingstr);
    }
    });
  });
  
  function statusupdate(tweetid, userid, tweettext) {
    var measureLength = '@' + userid + ' You should have tweeted this :' + tweettext;
    if (measureLength.length > 140) {
      reply = '@' + userid + tweettext;
      u_reply=reply.substring(0,136);
      postreply(u_reply);
    }
    else {
      reply = '@' + userid + ' You should have tweeted this :' + tweettext;
      postreply(reply);
    }
    function postreply(statusreply) {
      Spell_twit.post('statuses/update', {
        status: statusreply,
        in_reply_to_status_id: tweetid
      }, function (err, data, response) {
        if (err) {
          // console.log(err);
        }
        else {
          //console.log(data);
        }
      });
    }
  }
  

  