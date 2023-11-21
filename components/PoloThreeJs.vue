<script setup>
import { init } from "@/utilities/PoloInitiateThree.js";
const poloCanvasContainer = ref(null);

onMounted(() => {
  if (poloCanvasContainer.value) init();
});

onUnmounted(() => {
  console.log("onunmounted");
  // perhaps want to remove three js scenes, etc > as it might have double three.js init from io rides repo notes
});
</script>

<template>
  <div class="polo-three-js">
    <div ref="poloCanvasContainer" id="polo-canvas-container" />
  </div>
</template>

<style lang="scss">
.polo-three-js {
  position: relative;
  cursor: url("/drag-cursor-icon.png"), pointer;
}
</style>
