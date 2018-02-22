var Twit = require('twit');
var config = require('./config');
var P = new Twit(config.promotion)

var trendname = [];

var placeid=[1,23424848,91981835,23424977];

setInterval(intervalpromo,1000*60*60*10)

//for(var i=0;i<4;i++){
P.get('trends/place',{id:23424848},promofun)




function promofun(err,data,response){
    if(err){
        console.log(err)
    }
    for(var j=0;j<50;j++){
    console.log(data[0].trends[j].name);
    trendname=data[0].trends[j].name;
    //console.log(trendname);
   // var trendname =[trendname[j]];
    tweetpromo (trendname);

    }
}
function tweetpromo (hashtag){
    var k = Math.floor(Math.random() * 100);
    params={
        status : hashtag +' Sign up using this URl shortner and start earning money ' +'http://join-shortest.com/ref/c7f63c23f2?user-type=new '+k
    }
    P.post('statuses/update',params,callback)
    function callback(err,data,response){
        console.log(data.text)
    }
}


//}
