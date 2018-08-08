// music visualization			
var amplitude = 2;
function scaleBetween(unscaledNum, minAllowed, maxAllowed, min, max) {
	return (maxAllowed-minAllowed)*(unscaledNum-min)/(max-min)+minAllowed;
}
function getBass() {
	analyser.getByteFrequencyData(freqDataArr);
	var frequencyData = freqDataArr;
	var volume = 0;
	for (var i = 0; i < frequencyData.length/2; i++) {
		volume += frequencyData[i];
	}
	volume = volume/(frequencyData.length/2);
	return (volume);
}
function getTreble() {
	analyser.getByteFrequencyData(freqDataArr);
	var frequencyData = freqDataArr;
	var volume = 0;
	for (var i = frequencyData.length/2; i < frequencyData.length; i++) {
		volume += frequencyData[i];
	}
	volume = volume/(frequencyData.length/2);
	return (volume);
}
function scalePoints(value) {
	wave.material.size = value;
}
function audioUpdate() {
	var bass = scaleBetween(getBass(), 2, 20, 0, 255);
	var treble = scaleBetween(getTreble(), .5, 3, 0, 255);
	scalePoints(treble);
	animateWave(bass);
}