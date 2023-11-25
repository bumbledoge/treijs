import * as three from "three";
import { TextGeometry } from "three/addons/geometries/TextGeometry.js";
import { FontLoader } from "three/addons/loaders/FontLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const SIZES = {
  width: 1000,
  height: 800,
};
const canvas = document.querySelector("canvas.webgl");

//scene
const scene = new three.Scene();
const axesHelper = new three.AxesHelper();

//objects
const floor = new three.Mesh(
  new three.BoxGeometry(4, 0.1, 4),
  new three.MeshLambertMaterial({ color: 0x4b4a67 })
);
const wall = new three.Mesh(
  new three.BoxGeometry(4, 4, 0.1),
  new three.MeshLambertMaterial({ color: 0x4b4a67 })
);
wall.position.set(0, 2, -2);

const fontLoader = new FontLoader();
fontLoader.load("../fonts/facetype.json", (font) => {
  const geo = new TextGeometry("Ionatan", {
    font,
    size: 0.7,
    height: 0.05,
  });
  const texter = new three.Mesh(
    geo,
    new three.MeshLambertMaterial({ color: 0xc2cfb2 })
  );
  texter.rotation.y = (3 * Math.PI) / 2;
  texter.position.set(1.8, 0.3, -1.5);
  scene.add(texter);
});

//lights
const light1 = new three.PointLight("white", 50);
light1.position.set(3, 2, 2);
const light2 = new three.PointLight("white", 50);
light2.position.set(-3, 2, 2);

// camera
const camera = new three.PerspectiveCamera(61, SIZES.width / SIZES.height);
camera.position.set(-6, 4, 6);
// camera.position.set(-7, 2, 1);
camera.lookAt(floor.position);

// adding to scene
scene.add(floor);
scene.add(wall);

scene.add(camera);
scene.add(light1);
scene.add(light2);
scene.add(axesHelper);

const renderer = new three.WebGLRenderer({ canvas });
renderer.setSize(SIZES.width, SIZES.height);
renderer.render(scene, camera);

const clock = new three.Clock();
// const controls = new OrbitControls(camera, renderer.domElement);

const tick = () => {
  const timePassed = clock.getElapsedTime();
  camera.position.x = Math.sin(timePassed) - 5;
  camera.lookAt(floor.position);

  // controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(tick);
};
tick();
