import * as three from "three";
import { TextGeometry } from "three/addons/geometries/TextGeometry.js";
import { FontLoader } from "three/addons/loaders/FontLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { TextureLoader } from "three";
import gsap from "gsap";

const SIZES = {
  width: 1000,
  height: 800,
};
const canvas = document.querySelector("canvas.webgl");

//scene
const scene = new three.Scene();
const axesHelper = new three.AxesHelper();

const tLoader = new TextureLoader();
const matcap = tLoader.load(
  "https://makio135.com/matcaps/256/27222B_677491_484F6A_5D657A-256px.png"
);
matcap.texture = three.SRGBColorSpace;
console.log(matcap);

//objects
const floorGeo = new three.BoxGeometry(4, 0.1, 4);
floorGeo.computeBoundingBox();
floorGeo.translate(
  floorGeo.boundingBox.max.x,
  floorGeo.boundingBox.max.y,
  floorGeo.boundingBox.max.z
);

// floorGeo.center();

const floor = new three.Mesh(
  floorGeo,
  new three.MeshLambertMaterial({ color: 0x4b4a67 })
);
const wall = new three.Mesh(
  new three.BoxGeometry(4, 4, 0.1),
  new three.MeshMatcapMaterial({ matcap: matcap })
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
    new three.MeshMatcapMaterial({ matcap: matcap })
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
renderer.setPixelRatio(window.devicePixelRatio);

// gsap.to(floor.position, { duration: 1, delay: 0.5, x: -1, y: 3, z: 3 });
// gsap.to(floor.position, { rotation: 90, transformOrigin: "left 50%" });

const clock = new three.Clock();
const controls = new OrbitControls(camera, renderer.domElement);

const tick = () => {
  const timePassed = clock.getElapsedTime();
  // camera.position.x = Math.sin(timePassed) - 5;
  // camera.lookAt(floor.position);
  // floor.rotation.x = -timePassed - 0.6;

  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(tick);
};
tick();
