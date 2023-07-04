import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { GUI } from 'dat.gui';


const scene = new THREE.Scene();

// const loader = new GLTFLoader();

// loader.load( './models/dsgFirstShip.glb', function ( gltf ) {

// 	scene.add( gltf.scene );

// }, undefined, function ( error ) {

// 	console.error( error );

// } );

//const gui = new GUI();

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );


const controls = new OrbitControls( camera, renderer.domElement );
controls.target.set( 0, 1, 0 );
controls.update();

const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.75 );
directionalLight.castShadow = true;
directionalLight.position.y = 200;
const light = new THREE.AmbientLight( 0x404040, 0.5);
scene.add( light );
scene.add( directionalLight );

const objs = loadShips(6, 20, 20, 6);
for(let r = 0; r < objs.length; r++){
	scene.add(objs[r]);
}

// const lineMat = new THREE.LineBasicMaterial({color: 0x00ff00});
// const points = [];
// points.push(new THREE.Vector3(objs[0].position.x, objs[0].position.y, objs[0].position.z));
// points.push(new THREE.Vector3(objs[1].position.x, objs[1].position.y, objs[1].position.z));

// const lineGeom = new THREE.BufferGeometry().setFromPoints(points);
// const tstLine = new THREE.Line(lineGeom, lineMat);
// scene.add(tstLine);

camera.position.set(0, 3, 3);

function animate() {
	requestAnimationFrame( animate );


	renderer.render( scene, camera );
}

function loadShips(count, horizontalRange, verticalRange){
	const ships = [];
	const shipGeom = new THREE.CapsuleGeometry(1, 2, 1, 6);
    const greenMat = new THREE.MeshLambertMaterial( { color: 0x00ff00 } );
	const redMat = new THREE.MeshLambertMaterial( { color: 0xff0000 } );
	greenMat.flatShading = true;
	redMat.flatShading = true;

	for(let r = 0; r < count; r++){
		let shippy;
		if(r % 2 == 0){
			shippy = new THREE.Mesh(shipGeom, greenMat);
		}
		else{
			shippy = new THREE.Mesh(shipGeom, redMat);
		}
		shippy.position.x = Math.floor(Math.random()*horizontalRange) - horizontalRange/2;
		shippy.position.y = Math.floor(Math.random()*verticalRange) - verticalRange/2;
		shippy.position.z = Math.floor(Math.random()*horizontalRange) - horizontalRange/2;
		shippy.rotation.x = 1.57;
		ships.push(shippy);
	}

	return ships;
}

animate();