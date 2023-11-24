import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

// Constants
const CANVAS = document.querySelector("canvas.webgl");
const SIZES = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// SCENEEEEE
const scene = new THREE.Scene();

// CAMERAAAA
const camera = new THREE.PerspectiveCamera(75, SIZES.width / SIZES.height);
camera.position.z = 5;
scene.add(camera);

// LIGHTSSSSSS
var light = new THREE.PointLight("white", 20);
var light1 = new THREE.PointLight("white", 20);
light.position.set(3, 6, 5);
light1.position.set(-3, 2, 5);
scene.add(light, light1);

// RENDERRRRR
const renderer = new THREE.WebGLRenderer({ canvas: CANVAS });
renderer.setSize(SIZES.width, SIZES.height);
document.body.appendChild(renderer.domElement);

// GLTF
const loader = new GLTFLoader();
let model;
loader.load("./assets/blocc.gltf", (data) => {
  model = data.scene;
  scene.add(data.scene);
  renderer.render(scene, camera);
});

const controls = new OrbitControls(camera, renderer.domElement);
camera.position.set(0, 0, 5);
controls.update();

function animate() {
  requestAnimationFrame(animate);

  controls.update();

  renderer.render(scene, camera);
}
animate();
