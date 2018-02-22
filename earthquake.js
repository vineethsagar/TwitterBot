var request = require('request');
var config = require('./config')
var shst = require("sh.st")("c1d1af360c5c7e139453bdd165f5986c");
var Twit = require('twit');
var eq =require('./earthquake')

var E = new Twit(config.earthquake);

var a, text, magnitude, time, tsunami, lat, long, point, surl, murl, gtime, mapurl, e2d;
var returnurl=[];
var returnkurl;
var gt,su,mu;
var url=[];
var gmtdate;
    var str;
    earthquake();
    setInterval(earthquake,1000*60*5)

    function earthquake(){

request.get('https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&limit=1', function (err, res, body) {
        var a = JSON.parse(res.body);

        url = a.features[0].properties.url;
        text = a.features[0].properties.place;
        magnitude = a.features[0].properties.mag;
        time = a.features[0].properties.time;
        tsunami = a.features[0].properties.tsunami;
        lat = a.features[0].geometry.coordinates[1];//c[1]
        long = a.features[0].geometry.coordinates[0];//c[0]
        point = a.features[0].geometry.coordinates[2];
        mapurl = 'http://maps.google.com/maps?q=' + lat + ',' + long + '+' + '(' + point + ')' + '&z=14';
        var tweettext = 'Earthquake of '+ magnitude+' mag' + ' occured at ' + text //+ ' on ' + gt + ' details:' + su + ' Map:' + mu;  
      //  console.log(mapurl);
      //  console.log(tweettext);
        function1(tweettext,mapurl,url);
});
}
/*
function function_t(tweettext_t,mapurl_t,url_t,time_t){
    
      // request.get('http://www.convert-unix-time.com/api?timestamp=' + time_t, function (err, res, body) {
        //   var a = JSON.parse(body)
          var y= new Date(0);
          y.setSeconds(time_t)
            var x =y.substring();
          // console.log(a);
          // tweettext_t=tweettext_t+' on '+x
           function1(tweettext_t,mapurl_t,url_t);
   //})
}   */

function function1(tweettext1,mapurl1,url1){
    shst.short(url1, function (url) {
       // console.log("Short URL is: " + url.shortenedUrl);
       tweettext1=tweettext1+' more:'+url.shortenedUrl;
       function2(tweettext1,mapurl1);
        
    })
}

function function2(tweettext2,mapurl2){
    shst.short(mapurl2, function (url) {
        // console.log("Short URL is: " + url.shortenedUrl);
        tweettext2=tweettext2+' Map:'+url.shortenedUrl;
        function3(tweettext2);
    })
}
function function3(tweettext3){
    console.log(tweettext3);
    tweetresponse(tweettext3);
}









/*
request.get(e2d, function (err, res, body) {
    var a = JSON.parse(body)
    gtime = a.localDate;
    console.log(gtime);
})
*/




function tweetresponse(news) {
    var tweet = {
        status: news
    }

    E.post('statuses/update', tweet, tweeted);

    function tweeted(err, data, response) {
        if (err) {
           // console.log(err);
            console.log("Sorry ! Something went wronggg!!!");
        }
        else {
            //console.log(data)
            console.log("Tweeted");
        }
    }
    ;
}

/*shst.short(url, function (url) {
            //console.log("Short URL is: " + url.shortenedUrl);
            returnnurl = url.shortenedUrl;
            console.log(returnnurl);
           // adddet(returnnurl);
        })

        shst.short(mapurl, function (url) {
            //console.log("Short URL is: " + url.shortenedUrl);
            returknurl = url.shortenedUrl;

            console.log(returnnurl);
           // su=url.shortenedUrl;
            // mu=url.shortenedUrl;
            //addmap(returknurl);
        })
       */

       //e2d = 'http://www.convert-unix-time.com/api?timestamp=' + time;
      /* for(i=0;i<2;i++){
        shst.short(url[i], function (url) {
            //console.log("Short URL is: " + url.shortenedUrl);
            returnnurl[i] = url.shortenedUrl;
           console.log(returnnurl[i]);
           // adddet(returnnurl);
        
       // console.log(returnnurl);
      */