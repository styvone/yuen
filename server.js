var express = require('express');
var youtubeStream = require('youtube-audio-stream');
var http = require('http');
var fs = require('fs');
var path = require('path');

var app = express();

app.use(express.static(__dirname));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/:videoId', function (req, res) {
    youtubeStream(req.url.slice(1)).pipe(res);
});

var server = app.listen(process.env.PORT || 3000, function() {
  console.log('open http://localhost:3000 for demo of audio stream')
})