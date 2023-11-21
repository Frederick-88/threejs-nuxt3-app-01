import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  Color,
  AmbientLight,
} from "three";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

let camera, scene, renderer, controls, model;

const animate = () => {
  model.rotation.y += 0.01;
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
};

const init = async () => {
  const { loadGltf } = useGLTFModel();
  const bgColor = new Color("#546343");

  // SCENE & BG
  scene = new Scene();
  scene.background = bgColor;

  // CAMERA
  camera = new PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(1, 1, 3);

  // LIGHT
  const ambientLight = new AmbientLight("#FFFFFF");
  ambientLight.intensity = 3;

  scene.add(ambientLight);

  // RENDERER
  // -- antialias = for smoother edge
  renderer = new WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);

  // -- Render to targeted element
  document
    .getElementById("gltf-canvas-container")
    .appendChild(renderer.domElement);

  // MODEL
  const gltf = await loadGltf("/textures/nuxt-cat.gltf");
  model = gltf.scene;
  model.position.set(0, -1.5, 0);
  scene.add(model);

  // CONTROLS (for dragging)
  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.2;

  controls.minDistance = 2;
  controls.maxDistance = 10;

  controls.maxPolarAngle = Math.PI / 2;

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
  };

  window.addEventListener("resize", onWindowResize, false);
};

export { init };
