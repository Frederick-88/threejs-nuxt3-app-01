import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

let camera, scene, renderer, controls, model;
let mixer, clock;

const animate = () => {
  if (mixer) mixer.update(clock.getDelta());

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
};

const init = async () => {
  const { loadGltf } = useGLTFModel();

  // SCENE
  scene = new THREE.Scene();

  // CAMERA
  camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(7, 4, 3);
  camera.lookAt(scene.position);

  // RENDERER
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  renderer.setClearColor(0xa3a3a3);
  renderer.shadowMap.enabled = true;

  document
    .getElementById("wolf-canvas-container")
    .appendChild(renderer.domElement);

  // CONTROLS
  controls = new OrbitControls(camera, renderer.domElement);

  // LIGHT
  const ambientLight = new THREE.AmbientLight("#999999");
  scene.add(ambientLight);

  const pointLight = new THREE.PointLight(0xffffff);
  pointLight.position.set(0, 7, 5);
  scene.add(pointLight);
  pointLight.intensity = 100;
  pointLight.penumbra = 0.3;

  pointLight.castShadow = true;
  pointLight.shadow.mapSize.width = 2048;
  pointLight.shadow.mapSize.height = 2048;

  scene.add(new THREE.GridHelper(100, 100));
  scene.add(new THREE.CameraHelper(pointLight.shadow.camera));

  // FLOOR (for shadow)
  const planeGeo = new THREE.PlaneGeometry(100, 100);
  const planeMat = new THREE.MeshPhongMaterial({ color: "#ffffff" });
  const plane = new THREE.Mesh(planeGeo, planeMat);
  scene.add(plane);
  plane.rotation.x = -0.5 * Math.PI;
  plane.receiveShadow = true;

  // MODEL
  const gltf = await loadGltf("/textures/fox.gltf");

  model = gltf.scene;
  model.traverse((node) => {
    if (node.isMesh) node.castShadow = true;
  });
  model.scale.set(0.5, 0.5, 0.5);
  model.rotateY(Math.PI / 2);
  scene.add(model);

  const clips = gltf.animations;
  mixer = new THREE.AnimationMixer(model);

  const idleClip = THREE.AnimationClip.findByName(clips, "Idle");
  const idleAction = mixer.clipAction(idleClip);
  idleAction.play();

  // -------------------------------------------------------------------------
  // for animation to run, as animation need fps, need to be constantly moving
  // -------------------------------------------------------------------------
  clock = new THREE.Clock();
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
