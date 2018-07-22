function ParticleObject(geometry, color, size) {
  var particleMat = new THREE.PointsMaterial({size: size, color: color, transparent: true});
  var particleGlobe = new THREE.Points(geometry, particleMat);

  this.mesh = particleGlobe;
  this.speed = 1;
  this.invFlag = false;

  this.highlight = function(color) {
    this.mesh.material.color.r = color.r;
    this.mesh.material.color.g = color.g;
    this.mesh.material.color.b = color.b;
  }

  this.spin = function() {
    this.mesh.rotation.y += 0.0025*this.speed;
    this.mesh.rotation.z += 0.0025*this.speed;
  }
}