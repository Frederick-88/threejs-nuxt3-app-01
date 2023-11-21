import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

let camera, scene, renderer, model, controls;

const animate = () => {
  // Rotate model (Change values to change speed)
  model.rotation.x += 0.01;
  model.rotation.y += 0.01;
  renderer.render(scene, camera);

  requestAnimationFrame(animate);
};

const init = () => {
  // SCENE
  scene = new THREE.Scene();

  // CAMERA
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(0, 0, 7);

  // RENDERER
  // -- antialias = for smoother edge
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);

  // -- Render to targeted element
  document
    .getElementById("simple-canvas-container")
    .appendChild(renderer.domElement);

  // MODEL
  const geometry = new THREE.BoxGeometry(3, 3, 3);

  // -- fill model with mesh material of color
  //   const material = new THREE.MeshBasicMaterial({ color: '#0000ff' });

  // -- fill model with mesh material of color that can be affected by light
  // const material = new THREE.MeshPhongMaterial({ color: "#fff000" });
  // const directionalLight = new THREE.DirectionalLight("#ffffff");
  // directionalLight.intensity = 3;
  // directionalLight.position.set(-1, 2, 4);
  // scene.add(directionalLight);

  // -- fill model with mesh material of texture
  const texture = new THREE.TextureLoader().load(
    getImageAssets("webgl/crate.gif")
  );
  // const texture = new THREE.TextureLoader().load(
  //   getImageAssets("webgl/lavatile.jpg")
  // );
  const material = new THREE.MeshBasicMaterial({ map: texture });

  // Create "Mesh" model by merging geometry and material + add to scene
  model = new THREE.Mesh(geometry, material);
  scene.add(model);

  controls = new OrbitControls(camera, renderer.domElement);
  controls.addEventListener("change", () => {
    console.log(controls.target.clone());
    model.position.copy(controls.target.clone());
  });

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
