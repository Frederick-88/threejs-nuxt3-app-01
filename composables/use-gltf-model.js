import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

export function useGLTFModel() {
  const gltfLoader = new GLTFLoader();

  const loadGltf = (url) => {
    return new Promise((resolve, reject) => {
      // https://stackoverflow.com/a/43757715
      // params in order > "url , on-finish , on-process , on-error"
      gltfLoader.load(url, resolve, undefined, reject);
    });
  };

  return { loadGltf };
}
