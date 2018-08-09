var express = require('express');
var youtubeStream = require('youtube-audio-stream');

var app = express();

var port = process.env.PORT || 3000;

app.use(express.static(__dirname));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.get(/stream/:videoId, function (req, res) {
    try {
    	youtubeStream(req.params.videoId).pipe(res);
    } catch (exception) {
        res.status(500).send(exception);
    }
});

app.listen(port, function () {
  console.log('app is listening on port 3000!');
});