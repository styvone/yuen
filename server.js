var express = require('express');
var youtubeStream = require('youtube-audio-stream');

var app = express();

app.use(express.static(__dirname));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/stream/:videoId', function (req, res) {
    try {
    	
    	youtubeStream(req.params.videoId).pipe(res);
    } catch (exception) {
        res.status(500).send(exception);
    }
});

app.listen(process.env.PORT || 3000, function () {
  console.log('app is listening on port 3000!');
});