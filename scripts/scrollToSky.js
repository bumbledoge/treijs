import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

// Constants
const CANVAS = document.querySelector("canvas.webgl");
const body = document.querySelector("body");
console.log(body);
const SIZES = {
  width: 1000,
  height: 800,
};

// SCENEEEEE
const scene = new THREE.Scene();

// OBJECTTT
const geometry = new THREE.BoxGeometry(2, 2, 2);
const mesh = new THREE.MeshLambertMaterial({
  color: 0x008dd5,
});
const theCube = new THREE.Mesh(geometry, mesh);
scene.add(theCube);

// CAMERAAAA
const camera = new THREE.PerspectiveCamera(75, SIZES.width / SIZES.height);
camera.position.z = 5;
camera.position.x = 3;
camera.position.y = 1;
scene.add(camera);

camera.lookAt(theCube.position);

// LIGHTSSSSSS
var light = new THREE.PointLight("white", 20);
var light1 = new THREE.PointLight("white", 20);
light.position.set(3, 2, 2);
light1.position.set(-3, 2, 2);
scene.add(light, light1);

// AXES HELPER
const axesHelper = new THREE.AxesHelper(20);
scene.add(axesHelper);

// RENDERRRRR
const renderer = new THREE.WebGLRenderer({ canvas: CANVAS });
renderer.setSize(SIZES.width, SIZES.height);
renderer.render(scene, camera); // first render

let count = 0;
document.addEventListener("scroll", (event) => lowFrameRate(event, theCube));

const lowFrameRate = (event, model) => {
  if (count % 3 === 0) {
    // model.rotation.x += window.scrollY / 700 - model.rotation.x;
    // model.rotation.z += window.scrollY / 1200 - model.rotation.z;
    model.position.y += window.scrollY / 300 - model.position.y;
    camera.lookAt(theCube.position);

    // let scalePower = window.scrollY / 2000 + 1;
    // model.scale.set(scalePower, scalePower, scalePower);
    renderer.render(scene, camera);
  }
  count++;
};
