// set up scene, camera, renderer
var scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);
var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// controls setup (for scrolling)
var controls = new THREE.TrackballControls(camera, renderer.domElement);

// adjust camera position
camera.position.z = 150;
camera.position.y = 30;

// create particle wave
var waveGeometry = new THREE.Geometry();
var SEPARATION = 4;
var AMOUNTX = 96;
var AMOUNTZ = 96;
for (var i = 0; i < AMOUNTX; i++) {
	for (var j = 0; j < AMOUNTZ; j++) {
		var particle = new THREE.Vector3();
		particle.x = i*SEPARATION-((100*SEPARATION)/2);
		particle.y = 0;
		particle.z = j*SEPARATION-((100*SEPARATION)/2);
		waveGeometry.vertices.push(particle);
	}
}
var particleMaterial = new THREE.PointsMaterial({color: 0xffffff, size: .5});
var wave = new THREE.Points(waveGeometry, particleMaterial);
scene.add(wave);

// animate the particle wave (default wave motion)
var count = 0;
function animateWave(amp) {
	var index = 0;
	for (var i = 0; i < AMOUNTX; i++) {
		for (var j = 0; j < AMOUNTZ; j++) {
			var current = waveGeometry.vertices[index++];
			current.y = (Math.sin((i+count)*0.3)*amp)+(Math.sin((j+count)*0.5)*amp);
			waveGeometry.verticesNeedUpdate = true;
		}
	}
	count += 0.080;
}

// animate loop
var animate = function () {
	controls.update();
	requestAnimationFrame(animate);
	renderer.render(scene, camera);
	audioUpdate();
};

animate();