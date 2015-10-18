var container;
var camera, scene, renderer, particle;
var mouseX = 0, mouseY = 0;
var gradients = []; // chosen from gradientFunctions.js

var rotationSpeed = -0.005;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

init();
animate();
initGUI();

function init() {

	container = document.createElement( 'div' );
	document.body.appendChild( container );
	camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 5000 );
	camera.position.z = 1000;
	scene = new THREE.Scene();

	generateMaterial(snow);

	renderer = new THREE.CanvasRenderer();
	renderer.setClearColor( 0x000040 );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	container.appendChild( renderer.domElement );

	document.addEventListener( 'mousemove', onDocumentMouseMove, false );
	document.addEventListener( 'touchstart', onDocumentTouchStart, false );
	document.addEventListener( 'touchmove', onDocumentTouchMove, false );

	window.addEventListener( 'resize', onWindowResize, false );
}

function reanimate() {
	deanimate();
	var args = [].slice.call(arguments);
	generateMaterial.apply(null, args);
}

function generateMaterial() {
	gradients = [].slice.call(arguments);

	var numGradients = gradients.length;

	while (gradients.length) {
		var material = new THREE.SpriteMaterial({
			map: new THREE.CanvasTexture( generateSprite() ),
			blending: THREE.AdditiveBlending
		});
		for ( var i = 0; i < 1000; i++ ) {
			particle = new THREE.Sprite( material );
			initParticle( particle, i * 10 * numGradients );
			scene.add( particle );
		}
	}
}

function deanimate() {
	scene = new THREE.Scene();
}

function generateSprite() {

	var canvas = document.createElement( 'canvas' );
	canvas.width = 16;
	canvas.height = 16;

	var context = canvas.getContext( '2d' );
	var gradient = context.createRadialGradient( canvas.width / 2, canvas.height / 2, 0, canvas.width / 2, canvas.height / 2, canvas.width / 2 );

	// use one of the gradients
	gradients.pop()(gradient);

	context.fillStyle = gradient;
	context.fillRect( 0, 0, canvas.width, canvas.height );

	return canvas;

}

function initParticle( particle, delay ) {

	var particle = this instanceof THREE.Sprite ? this : particle;
	var delay = delay !== undefined ? delay : 0;

	particle.position.set( 0, -500, 0 );
	particle.scale.x = particle.scale.y = Math.random() * 32 + 16;

	new TWEEN.Tween( particle )
		.delay( delay )
		.to( {}, Math.random() * 10000 + 5000 )
		.onComplete( initParticle )
		.start();

	new TWEEN.Tween( particle.position )
		.delay( delay )
		.to( { x: Math.random() * 4000 - 2000, y: Math.random() * 1000, z: Math.random() * 4000 - 2000 }, 10000 )
		.start();

	new TWEEN.Tween( particle.scale )
		.delay( delay )
		.to( { x: 0.01, y: 0.01 }, 10000 )
		.start();

}

//

function animate() {

	requestAnimationFrame( animate );
	render();

}

function render() {

	TWEEN.update();
	scene.rotation.y += rotationSpeed;

	camera.position.x += ( mouseX - camera.position.x ) * 0.05;
	camera.position.y += ( - mouseY - camera.position.y ) * 0.05;
	camera.lookAt( scene.position );

	renderer.render( scene, camera );

}