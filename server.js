var express = require('express');
var youtubeStream = require('youtube-audio-stream');

var app = express();

app.use(express.static(__dirname));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/stream/:videoId', function (req, res) {
	var id = req.params.videoId;
	youtubeStream(String(id));
    //youtubeStream(req.params.videoId).pipe(res);
});

app.listen(process.env.PORT || 3000, function () {
  console.log('app is listening on port 3000!');
});