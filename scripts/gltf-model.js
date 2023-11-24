import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

// Constants
const CANVAS = document.querySelector("canvas.webgl");
const SIZES = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// SCENEEEEE
const scene = new THREE.Scene();

// OBJECTTT
const geometry = new THREE.BoxGeometry(2, 2, 2);
const mesh = new THREE.MeshLambertMaterial({ color: 0x008dd5 });
const theCube = new THREE.Mesh(geometry, mesh);
// scene.add(theCube);

// CAMERAAAA
const camera = new THREE.PerspectiveCamera(75, SIZES.width / SIZES.height);
camera.position.z = 5;
scene.add(camera);

// LIGHTSSSSSS
var light = new THREE.PointLight("white", 20);
var light1 = new THREE.PointLight("white", 20);
light.position.set(3, 2, 2);
light1.position.set(-3, 2, 2);
scene.add(light, light1);

// RENDERRRRR
const renderer = new THREE.WebGLRenderer({ canvas: CANVAS });
renderer.setSize(SIZES.width, SIZES.height);
renderer.render(scene, camera); // first render

// GLTF
const loader = new GLTFLoader();
let model;
loader.load("./assets/blocc.gltf", (data) => {
  model = data.scene;
  scene.add(data.scene);
  renderer.render(scene, camera);
});

let count = 0;
CANVAS.addEventListener("mousemove", (event) => lowFrameRate(event, model));

const lowFrameRate = (event, model) => {
  if (count % 3 === 0) {
    model.rotation.x += event.pageY / 1000 - model.rotation.x;
    model.rotation.y += event.pageX / 1000 - model.rotation.y;
    renderer.render(scene, camera);
  }
  count++;
};
