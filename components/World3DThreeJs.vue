<script setup>
import { init } from "@/utilities/World3dInitiateThree.js";
const world3dCanvasContainer = ref(null);

onMounted(() => {
  if (world3dCanvasContainer.value) init();
});

onUnmounted(() => {
  console.log("onunmounted");
  // perhaps want to remove three js scenes, etc > as it might have double three.js init from io rides repo notes
});
</script>

<template>
  <div class="world-3d-three-js">
    <div ref="world3dCanvasContainer" id="world-3d-canvas-container" />
  </div>
</template>

<style lang="scss" scoped>
.world-3d-three-js {
  cursor: url("/drag-cursor-icon.png"), pointer;
}
</style>
