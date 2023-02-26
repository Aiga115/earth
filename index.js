import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import DragControls from 'drag-controls'
DragControls.install({THREE: THREE})

const canvas = document.querySelector(".canvas");

import earthTexture from './earth.jpg';
import mercuryTexture from './mercury.jpg'
import veneraTexture from './venera.jpg'
import moonTexture from './moon.jpg'
import starsTexture from './stars.jpg';

//renderer
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(window.devicePixelRatio)

//scene
const scene = new THREE.Scene();

//camera
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

// const orbit = new OrbitControls(camera, renderer.domElement);

camera.position.z = 200
// orbit.update();

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

const mat2 = new THREE.MeshBasicMaterial({
    map: textureLoader.load(mercuryTexture)
});
const mercury = new THREE.Mesh(geo,mat2);
scene.add(mercury);

const mat3 = new THREE.MeshBasicMaterial({
    map: textureLoader.load(veneraTexture)
})
const venera = new THREE.Mesh(geo,mat3);
scene.add(venera);

const mat4 = new THREE.MeshBasicMaterial({
    map: textureLoader.load(moonTexture)
})
const moon = new THREE.Mesh(geo,mat4);
scene.add(moon)

const pointLight = new THREE.PointLight(0xFFFFFF, 2, 300);
scene.add(pointLight);

const planets = [earth, mercury, venera, moon];

for(var i=0; i<planets.length; i++){
    planets[i].position.x = Math.random() * 100 - 50
    planets[i].position.y = Math.random() * 60 - 30
    planets[i].position.z = Math.random() * 80 - 40
}

const dragAndDrop = new DragControls(planets, camera, renderer.domElement);

function animate() {
    const randomRotation = Math.floor(Math.random() * 5) >= 1 ? 0.004 : 0;
    earth.rotateY(randomRotation)
    mercury.rotateY(randomRotation);
    venera.rotateY(randomRotation)
    moon.rotateY(randomRotation)
    // console.log('Math randomL: ',randomRotation)
    renderer.render(scene, camera);
}

renderer.domElement.addEventListener("mousemove", function() {
    renderer.render(scene, camera)
});

renderer.setAnimationLoop(animate);

//making more adaptive
window.addEventListener('resize', function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});