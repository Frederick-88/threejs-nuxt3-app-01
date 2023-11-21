<script setup>
import { init } from "@/utilities/Reflection3dInitiateThree.js";
const reflection3dCanvasContainer = ref(null);

onMounted(() => {
  if (reflection3dCanvasContainer.value) init();
});

onUnmounted(() => {
  console.log("onunmounted");
  // perhaps want to remove three js scenes, etc > as it might have double three.js init from io rides repo notes
});
</script>

<template>
  <div class="reflection-3d-three-js">
    <div
      ref="reflection3dCanvasContainer"
      id="reflection-3d-canvas-container"
    />
  </div>
</template>

<style lang="scss" scoped>
.reflection-3d-three-js {
  cursor: url("/drag-cursor-icon.png"), pointer;
}
</style>
