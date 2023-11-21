<script setup>
import { init } from "@/utilities/WolfInitiateThree.js";
const wolfCanvasContainer = ref(null);

onMounted(() => {
  if (wolfCanvasContainer.value) init();
});

onUnmounted(() => {
  console.log("onunmounted");
  // perhaps want to remove three js scenes, etc > as it might have double three.js init from io rides repo notes
});
</script>

<template>
  <div>
    <div ref="wolfCanvasContainer" id="wolf-canvas-container" />
  </div>
</template>

<style lang="scss" scoped></style>
