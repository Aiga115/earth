import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';

const canvas = document.querySelector(".canvas");

import earthTexture from './earth.jpg';
import starsTexture from './stars.jpg';

//renderer
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(window.devicePixelRatio)

//scene
const scene = new THREE.Scene();

//camera
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

const orbit = new OrbitControls(camera, renderer.domElement);

camera.position.set(-90, 140, 140);
orbit.update();

//lighting
const ambientLight = new THREE.AmbientLight(0x333333);
scene.add(ambientLight);

//background
const cubeTextureLoader = new THREE.CubeTextureLoader();
scene.background = cubeTextureLoader.load([
    starsTexture,
    starsTexture,
    starsTexture,
    starsTexture,
    starsTexture,
    starsTexture
]);


const textureLoader = new THREE.TextureLoader();

//earth 
const geo = new THREE.SphereGeometry(16, 30, 30);
const mat = new THREE.MeshBasicMaterial({
    map: textureLoader.load(earthTexture)
});
const earth = new THREE.Mesh(geo, mat);
scene.add(earth);


const pointLight = new THREE.PointLight(0xFFFFFF, 2, 300);
scene.add(pointLight);

function animate() {

    earth.rotateY(0.004);
    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

//making more adaptive
window.addEventListener('resize', function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});