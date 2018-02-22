var Twit = require('twit');
var config = require('./config');
var T = new Twit(config.rest);
var configB=require('./config');
var Websearch = require('node-bing-api')(config.bingnews);


var stream_question = T.stream('statuses/filter', { track: '#askquestion' })
stream_question.on('tweet', WebSearch);
function WebSearch(tweet) {
  //console.log(tweet);
  console.log(tweet.entities.hashtags);
  console.log(tweet.entities.user_mentions);
  var webUserId = tweet.user.screen_name;
  var webTweetId = tweet.id_str;
  var webtext = tweet.text;
  var reply = modifyString(webtext);

  Websearch.web(reply, {
    count: 10,

  }, function (error, res, body) {
    //console.log(body);
    var w = 0
    //do{
    console.log(body.webPages.value[0].snippet);
    var commonreply = body.webPages.value[0].snippet;
    //}while((commonreply.length<140) && (w<=10))
    reply = '@' + webUserId + ' Answer :' + commonreply;
    //console.log(reply);
    if (reply.length < 140) {
      replyUpdated = '@' + webUserId + 'Answer :' + body.webPages.value[0].snippet;
      statusupdateweb(replyUpdated, webTweetId);
    }
    else {
      var stringcut = reply.substring(0, 136) ;
      // subreply = reply +stringcut;
      statusupdateweb(stringcut, webTweetId)

    }
  });
}

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


  var newssearch = T.stream('statuses/filter', { track: '#asknews' })

  newssearch.on('tweet',fun_newssearch);
   function fun_newssearch (tweet) {
  var newsUserId = tweet.user.screen_name;
  var newsTweetId = tweet.id_str;
  var newstext = tweet.text;
   newsquery=modifyString(newstext);
  var result;
  Websearch.news(newsquery, {

    count: 10,
    freshness: "Day"

  }, function (error, res, body) {
    console.log(body.value[0].name);
    result = body.value[0].name;
    reply = '@' + webUserId + ' Answer :' + commonreply;
    //console.log(reply);
    if (reply.length < 140) {
      replyUpdated = '@' + webUserId + 'Answer :' + body.webPages.value[0].snippet;
      statusupdateweb(replyUpdated, webTweetId);
    }
    else {
      var stringcut = reply.substring(0, 136) ;
      // subreply = reply +stringcut;
      statusupdateweb(stringcut, webTweetId)
    }
  });
  
}


///////////////   Replying to the followers
//setting user stream
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


//Replying to statuses based on hashtag

var stream_public = T.stream('statuses/filter', { track: '#testingreply', language: 'en' });

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



// favourite a tweet by hash tag

var stream_fav = T.stream('statuses/filter', { track: '#favorite528', language: 'en' });
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

}


// Retweet a particulr hash tag

var stream_retweet = T.stream('statuses/filter', { track: '#tweet528' });

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

// Forecasting Weather every one  hour  17.72139,78.2095723



//bounding_box:[west_long south_lat east_long north_lat]
/// North Latitude: 17.824337 South Latitude: 17.653153 East Longitude: 78.101851 West Longitude: 77.892486

var sultanpur = ['77.892', '17.6531', '78.1015', '17.824337']


var stream_Location = T.stream('statuses/filter', { locations: sultanpur })

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
function modifyString(enterstr) {
  var S;
  var fstr = enterstr + ' ';
  fstr.toString;
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
  return S;
}
