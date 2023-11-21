import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

let camera, scene, renderer, controls;

const animate = () => {
  renderer.render(scene, camera);
  controls.update();

  requestAnimationFrame(animate);
};

const init = () => {
  // SCENE
  scene = new THREE.Scene();

  // CAMERA
  camera = new THREE.PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    45,
    30000
  );
  camera.position.set(150, 100, 1200);

  // RENDERER
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  document
    .getElementById("world-3d-canvas-container")
    .appendChild(renderer.domElement);

  // CONTROLS
  controls = new OrbitControls(camera, renderer.domElement);
  controls.minDistance = 500;
  controls.maxDistance = 1500;

  // SCENE BACKGROUND
  const materialArray = [];
  const texture_ft = new THREE.TextureLoader().load(
    getImageAssets("webgl/3d-bg/mystic/mystic_ft.jpg")
  );
  const texture_bk = new THREE.TextureLoader().load(
    getImageAssets("webgl/3d-bg/mystic/mystic_bk.jpg")
  );
  const texture_up = new THREE.TextureLoader().load(
    getImageAssets("webgl/3d-bg/mystic/mystic_up.jpg")
  );
  const texture_dn = new THREE.TextureLoader().load(
    getImageAssets("webgl/3d-bg/mystic/mystic_dn.jpg")
  );
  const texture_rt = new THREE.TextureLoader().load(
    getImageAssets("webgl/3d-bg/mystic/mystic_rt.jpg")
  );
  const texture_lf = new THREE.TextureLoader().load(
    getImageAssets("webgl/3d-bg/mystic/mystic_lf.jpg")
  );

  materialArray.push(new THREE.MeshBasicMaterial({ map: texture_ft }));
  materialArray.push(new THREE.MeshBasicMaterial({ map: texture_bk }));
  materialArray.push(new THREE.MeshBasicMaterial({ map: texture_up }));
  materialArray.push(new THREE.MeshBasicMaterial({ map: texture_dn }));
  materialArray.push(new THREE.MeshBasicMaterial({ map: texture_rt }));
  materialArray.push(new THREE.MeshBasicMaterial({ map: texture_lf }));

  for (let i = 0; i < 6; i++) materialArray[i].side = THREE.BackSide;

  const skyboxGeo = new THREE.BoxGeometry(10000, 10000, 10000);
  const skybox = new THREE.Mesh(skyboxGeo, materialArray);
  scene.add(skybox);

  // -------------------------------------------------------------------------
  // for animation to run, as animation need fps, need to be constantly moving
  // -------------------------------------------------------------------------
  animate();

  // --------------------
  // handle window resize
  // --------------------
  const onWindowResize = () => {
    // reset camera and renderer to new aspect ratio upon resizing
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
  };

  window.addEventListener("resize", onWindowResize, false);
};

export { init };
