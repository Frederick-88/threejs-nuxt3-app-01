<script setup>
import { init } from "@/utilities/SimpleInitiateThree.js";
const simpleCanvasContainer = ref(null);

onMounted(() => {
  if (simpleCanvasContainer.value) init();
});

onUnmounted(() => {
  console.log("onunmounted");
  // perhaps want to remove three js scenes, etc > as it might have double three.js init from io rides repo notes
});
</script>

<template>
  <div>
    <div ref="simpleCanvasContainer" id="simple-canvas-container" />
  </div>
</template>

<style lang="scss" scoped></style>
