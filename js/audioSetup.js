// audio setup:
var context = new AudioContext();
var analyser = context.createAnalyser();
analyser.fftSize = 32;
var source, frequencyData;
function loadSound(vidID) {
	context.close()
	.then(() => {
		context = new AudioContext();
		analyser = context.createAnalyser();
		analyser.fftSize = 32;
	})
	.then(() => {
		var request = new XMLHttpRequest();
		request.open("GET", window.location.href+"stream/"+vidID, true); 
		request.responseType = "arraybuffer"; 
		request.onload = function() {
			var Data = request.response;
			process(Data);
		};
		request.send();
	});
}
function process(Data) {
	source = context.createBufferSource();
	context.decodeAudioData(Data, function(buffer){
		source.buffer = buffer;
		source.connect(context.destination);
		source.connect(analyser);
		source.start(context.currentTime);
	});
	document.getElementById('searchBar').disabled = false;
	loading(true);
}
var freqDataArr = new Uint8Array(analyser.frequencyBinCount);

var paused = false;
function pausePlay() {
	if (paused) {
		context.resume();
		paused = false;
	} else {
		context.suspend();
		paused = true;
	}
}

$('#pause-play').click(pausePlay);