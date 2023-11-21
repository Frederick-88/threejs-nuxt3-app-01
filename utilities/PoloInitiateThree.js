import * as THREE from "three";

import { MapControls } from "three/addons/controls/MapControls.js";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";

let autorotateTimeout;
let camera, scene, renderer, controls, model;
let previousDistance = 0;
let controlsPanNumber = 0;

const roundNumber = (value, precision = 1) => {
  const multiplier = Math.pow(10, precision);
  return Math.round(value * multiplier) / multiplier;
};

const onWindowResize = () => {
  // reset camera and renderer to new aspect ratio upon resizing
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
};

// ---
const setupScene = () => {
  scene = new THREE.Scene();
  const urls = [
    getImageAssets("webgl/grey-dot-bg.jpg"),
    getImageAssets("webgl/grey-dot-bg.jpg"),
    getImageAssets("webgl/grey-dot-bg.jpg"),
    getImageAssets("webgl/grey-dot-bg.jpg"),
    getImageAssets("webgl/grey-dot-bg.jpg"),
    getImageAssets("webgl/grey-dot-bg.jpg"),
  ];
  const loader = new THREE.CubeTextureLoader();
  scene.background = loader.load(urls);
};

const setupCamera = () => {
  camera = new THREE.PerspectiveCamera(
    85,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(0, 0, 3);
};

const setupRenderer = () => {
  // -- antialias = for smoother edge
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.shadowMap.enabled = true;

  document
    .getElementById("polo-canvas-container")
    .appendChild(renderer.domElement);
};

const setupModel = async () => {
  const { loadGltf } = useGLTFModel();
  const gltf = await loadGltf("/textures/polo-shirt.glb");

  model = gltf.scene;

  model.traverse((node) => {
    if (node.isMesh) {
      node.castShadow = true;

      // TODO: WIP ELASTICITY
      const amount = 2;
      node.material.onBeforeCompile = function (shader) {
        shader.uniforms.time = { value: 0 };

        shader.vertexShader = "uniform float time;\n" + shader.vertexShader;
        shader.vertexShader = shader.vertexShader.replace(
          "#include <begin_vertex>",
          [
            `float theta = sin( time + position.y ) / ${amount.toFixed(1)};`,
            "float c = cos( theta );",
            "float s = sin( theta );",
            "mat3 m = mat3( c, 0, s, 0, 1, 0, -s, 0, c );",
            "vec3 transformed = vec3( position ) * m;",
            "vNormal = vNormal * m;",
          ].join("\n")
        );

        node.material.userData.shader = shader;
      };

      // Make sure WebGLRenderer doesnt reuse a single program
      node.material.customProgramCacheKey = function () {
        return amount.toFixed(1);
      };
    }
  });

  model.scale.set(0.75, 0.75, 0.75);
  model.position.set(0, 0.1, 0);
  scene.add(model);
};

const setupLight = () => {
  const environment = new RoomEnvironment(renderer);
  const pmremGenerator = new THREE.PMREMGenerator(renderer);
  scene.environment = pmremGenerator.fromScene(environment).texture;

  // Light for Floor & Shadow
  const ambientLight = new THREE.AmbientLight("#ffffff", 2);
  ambientLight.position.set(0, 0, -1);
  scene.add(ambientLight);

  const pointLight = new THREE.PointLight(0xffffff);
  pointLight.position.set(0, 30, 0);
  scene.add(pointLight);
  pointLight.intensity = 200;

  pointLight.castShadow = true;
  pointLight.shadow.mapSize.width = 2048;
  pointLight.shadow.mapSize.height = 2048;
  pointLight.shadow.radius = 5;
};

const setupFloor = () => {
  // setup floor for shadow
  const planeGeo = new THREE.PlaneGeometry(5, 4);
  const planeMat = new THREE.MeshPhongMaterial({
    color: "#ffffff",
  });
  const plane = new THREE.Mesh(planeGeo, planeMat);
  plane.position.set(0, -2.3, 0);
  plane.rotation.x = -0.5 * Math.PI;
  plane.receiveShadow = true;
  scene.add(plane);
};

const setupControls = () => {
  controls = new MapControls(camera, renderer.domElement);
  controls.mouseButtons.MIDDLE = controls.mouseButtons.LEFT;
  controls.mouseButtons.RIGHT = controls.mouseButtons.LEFT;

  controls.screenSpacePanning = true;
  controls.enableDamping = true;
  controls.dampingFactor = 0.1;
  controls.zoomSpeed = 1.5;

  controls.minDistance = 1;
  controls.maxDistance = 3;

  // keep orbit only available for horizontal control
  controls.minPolarAngle = Math.PI / 2;
  controls.maxPolarAngle = Math.PI / 2;

  // max & min pan + can do orbit in MapControls
  controls.addEventListener("change", function () {
    const minPan = new THREE.Vector3(0, -controlsPanNumber, 0);
    const maxPan = new THREE.Vector3(0, controlsPanNumber, 0);

    controls.target.clamp(minPan, maxPan);
  });

  // autorotate
  controls.autoRotate = true;
  controls.autoRotateSpeed = 0.5;

  controls.addEventListener("start", () => {
    clearTimeout(autorotateTimeout);
    controls.autoRotate = false;
  });
  controls.addEventListener("end", async () => {
    autorotateTimeout = setTimeout(() => {
      controls.autoRotate = true;
    }, 4000);

    // TODO: WIP ELASTICITY - make system to track based on difference
    // console.log(camera.position);

    // controls.dollyIn(previousDistance);
    // TODO: keep controls zoom/distance when orbiting = console.log(controls.getDistance());
  });
};

const setControlsPanNumber = () => {
  const multiplier = roundNumber(controls.getDistance()) - 3;
  const getControlsPanNumber = roundNumber(0.6 * Math.abs(multiplier));

  if (controls.getDistance() < 2.8) controlsPanNumber = getControlsPanNumber;
  else controlsPanNumber = 0;
};

// ---
const animate = () => {
  controls.update();

  previousDistance = controls.getDistance();
  setControlsPanNumber();

  // TODO: WIP ELASTICITY
  scene.traverse(function (child) {
    if (child.isMesh) {
      const shader = child.material.userData.shader;
      if (shader) shader.uniforms.time.value = performance.now() / 1000;
    }
  });

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
};

// ---
const init = async () => {
  setupScene();
  setupCamera();
  setupRenderer();
  setupLight();
  setupFloor();
  await setupModel();
  setupControls();

  // -------------------------------------------------------------------------
  // for animation to run, as animation need fps, need to be constantly moving
  // -------------------------------------------------------------------------
  animate();
  console.log(camera.position);

  // --------------------
  // handle window resize
  // --------------------
  window.addEventListener("resize", onWindowResize, false);
};

export { init };
