var req = require('./test')
var request =require('request')
var http = require('http');
var a;
var b='https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&limit=1';

request.get('http://www.convert-unix-time.com/api?timestamp=' + '1506234710465', function (err, res, body) {
      var a = JSON.parse(body)
    console.log(a)})