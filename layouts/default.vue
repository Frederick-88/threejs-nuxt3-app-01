<script setup></script>

<template>
  <main>
    <Navbar />
    <slot />
  </main>
</template>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Comfortaa:wght@300;400;500;600;700&family=Inter:wght@200;300;400;500;600;700&display=swap");

body {
  margin: 0;
  font-family: "Comfortaa", sans-serif;
}
</style>
