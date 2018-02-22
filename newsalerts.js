console.log('news bot is running')
var NewsAPI = require('newsapi');
var nkey = require('./config')
var newsapi = new NewsAPI(nkey.newsapi);

var shst = require("sh.st")("c1d1af360c5c7e139453bdd165f5986c");

var Twit = require('twit');
var config = require('./config');
var NA = new Twit(config.tnewsapi);

var sources = [ "ars-technica","associated-press" ,"bbc-news", "bbc-sport","bloomberg","business-insider", "buzzfeed","cnbc" ,"cnn", "daily-mail","engadget","entertainment-weekly" ,"espn", "espn-cric-info", "financial-times","fox-sports","google-news","hacker-news","independent", "ign", "mashable","mirror", "mtv-news", "national-geographic", "new-scientist", "new-york-magazine", "polygon", "recode", "t3n", "techradar", "techcrunch","the-economist" ,"the-hindu","the-huffing-post" ,"the-new-york-times", "the-telegraph", "the-times-of-india", "the-verge", "the-wall-street-journal","the-washington-post", "time", "wired-de"];
var i;
/*
setInterval(abc, 1000 * 5)
function abc() {
  i = 0;
  setInterval(newsfun, 1000 * 5);
}
*/
newsfun();

var surl;
var nurl;
var title;
var description;
var nsource;
function newsfun() {
  var finalstring;
  var sd;
  if (i >= 54) {
    return;
  }

  newsapi.articles({
    source: sources[i],
    sortBy: 'latest'
  }).then(articlesResponse => {
    if (articlesResponse.status === "ok") {
      console.log(articlesResponse.articles[0].url);
      nurl = articlesResponse.articles[0].url;
      title = articlesResponse.articles[0].title;
      nsource = articlesResponse.source;
      console.log(nsource);
      title = title + ':' + nsource;
      //console.log(title);
      description = articlesResponse.articles[0].description;
      
      var x = description.length;
      console.log(x)
      if (x < 121) {
        finalstring = description;
      } else {
        finalstring = title;
      }

      //console.log(finalstring);

      //console.log(description);
      shst.short(nurl, function (url) {
        //console.log("Short URL is: "+url);
        shorturl = url.shortenedUrl;
        console.log(shorturl);
       // tweetnews(finalstring, shorturl)
      })
    }
  })
  i++;
}


//var r =Math.floor(Math.random()*100);

function tweetnews(news, url) {
  var tweet = {
    status: news + ' ' + url
  }

  NA.post('statuses/update', tweet, tweeted);

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


