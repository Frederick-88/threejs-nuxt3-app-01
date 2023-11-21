<script setup>
import { init } from "@/utilities/PlaygroundInitiateThree.js";
const playgroundCanvasContainer = ref(null);

onMounted(() => {
  if (playgroundCanvasContainer.value) init();
});

onUnmounted(() => {
  console.log("onunmounted");
  // perhaps want to remove three js scenes, etc > as it might have double three.js init from io rides repo notes
});
</script>

<template>
  <div>
    <div ref="playgroundCanvasContainer" id="playground-canvas-container" />
  </div>
</template>

<style lang="scss" scoped></style>
