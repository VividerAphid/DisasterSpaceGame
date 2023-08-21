import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { GUI } from 'dat.gui';


const scene = new THREE.Scene();

// const loader = new GLTFLoader();

// loader.load( './assets/models/dsgFirstShip.glb', function ( gltf ) {

// 	scene.add( gltf.scene );

// }, undefined, function ( error ) {

// 	console.error( error );

// } );

//const gui = new GUI();

const spaceTexture = new THREE.TextureLoader().load('./assets/textures/basicSpace.png');
spaceTexture.wrapS = THREE.RepeatWrapping;
spaceTexture.wrapT = THREE.RepeatWrapping;
spaceTexture.repeat.set(2, 2);
scene.background = spaceTexture;

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
camera.position.z = -10;

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const light = new THREE.AmbientLight( 0x404040, 0.5);
scene.add( light );

let enty = new EntityHandler(THREE);
enty.loadTestScene();
let sceney = new SceneHandler(THREE);
sceney.loadStarSystemScene(THREE, enty._entities);
const objs = sceney.getObjects();
for(let r = 0; r < objs.length; r++){
	scene.add(objs[r]);
}
const lights = sceney.getLights();
for(let r = 0; r < lights.length; r++){
	scene.add(lights[r]);
}
const controls = new OrbitControls( camera, renderer.domElement );
controls.target.set( 0, 1, 0 );
controls.update();


function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
	enty.update();
}

animate();