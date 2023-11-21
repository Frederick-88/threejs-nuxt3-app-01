import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

let camera, scene, renderer, controls, sphereCamera;

const animate = () => {
  renderer.render(scene, camera);
  controls.update();

  requestAnimationFrame(animate);
};

const init = () => {
  // SCENE
  scene = new THREE.Scene();

  // SCENE BACKGROUND
  const urls = [
    getImageAssets("webgl/3d-bg/interior/posx.jpg"),
    getImageAssets("webgl/3d-bg/interior/negx.jpg"),
    getImageAssets("webgl/3d-bg/interior/posy.jpg"),
    getImageAssets("webgl/3d-bg/interior/negy.jpg"),
    getImageAssets("webgl/3d-bg/interior/posz.jpg"),
    getImageAssets("webgl/3d-bg/interior/negz.jpg"),
  ];
  const loader = new THREE.CubeTextureLoader();
  scene.background = loader.load(urls);

  // CAMERA
  camera = new THREE.PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    1,
    5000
  );
  camera.position.set(0, 400, 1000);

  // RENDERER
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  document
    .getElementById("reflection-3d-canvas-container")
    .appendChild(renderer.domElement);

  // CONTROLS
  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableZoom = false;

  // MODEL
  const reflectionMaterial = new THREE.MeshBasicMaterial({
    envMap: scene.background,
  });
  const sphereGeo = new THREE.SphereGeometry(300, 50, 50);

  const mirrorSphere = new THREE.Mesh(sphereGeo, reflectionMaterial);
  mirrorSphere.position.set(0, 0, 0);
  scene.add(mirrorSphere);

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
