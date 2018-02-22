var config=require('./config');
var Twit = require('twit');
var R = new Twit(config.trailway);



/*
var rail = require('./node_modules/railway-api')
var railways = require('railway-api');
var key =config.rkey
console.log(key)
console.log(config.rkey)
rail.setApikey(key);
var replyFun = require('./weather.js')
rail.cancelledTrains(18-09-2017,function(err,res){
  if(err){
    console.log(err);}
    else{
      console.log(res);
    }
    })

var stream_question = R.stream('statuses/filter', { track: '#railinfo' })
stream_question.on('tweet', railfun);
var position;
var currentstation;

function railfun(tweet) {
    console.log(tweet);
    var rname= tweet.text;
    var rtweetid = tweet.id_str;
    var ruid = tweet.user.screen_name;
    var modsname=replyFun.modifyString(rname);
    var x=modsname.toString();
    console.log(x);

    rail.cancelledTrains(date,function(err,res){
      if(err){
        console.log(err);}
        else{
          console.log(res);
        }
      
    }
    )
     
    rail.liveTrainStatus(modsname, function (err, res) {
        if(err){
        console.log(err);
        }
        
        console.log(res)
        position=res.position;
        console.log(position);
        currentstation=res.current_station.station_.name;
        console.log(currentstation);

        var reply = '@' + ruid +' ' + position+' currentsatation:' + currentstation;
        T.post('statuses/update', {
            status: reply,
            in_reply_to_status_id: rtweetid
          }, function (err, data, response) {
            if (err) {
              console.log(err);
            }
            else {
              console.log(data);
            }
          });
        
    })
}*/