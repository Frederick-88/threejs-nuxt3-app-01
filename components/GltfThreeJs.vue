<script setup>
import { init } from "@/utilities/GltfInitiateThree.js";
const gltfCanvasContainer = ref(null);

onMounted(() => {
  if (gltfCanvasContainer.value) init();
});

onUnmounted(() => {
  console.log("onunmounted");
  // perhaps want to remove three js scenes, etc > as it might have double three.js init from io rides repo notes
});
</script>

<template>
  <div class="gltf-three-js">
    <div class="content">
      <h2 class="note">Drag to Move Object Around - Scroll to Toggle Zoom</h2>
    </div>

    <div ref="gltfCanvasContainer" id="gltf-canvas-container" />
  </div>
</template>

<style lang="scss">
.gltf-three-js {
  position: relative;
  cursor: url("/drag-cursor-icon.png"), pointer;

  .content {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;

    .note {
      margin: 0;
      text-align: center;
      margin-top: 150px;
      color: white;
    }
  }
}
</style>
