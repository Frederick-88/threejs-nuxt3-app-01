<script setup></script>

<template>
  <div class="navbar">
    <nuxt-link class="nav" to="/">Home</nuxt-link>
    <nuxt-link class="nav" to="/gltf">Gltf</nuxt-link>
    <nuxt-link class="nav" to="/polo">Polo</nuxt-link>
    <nuxt-link class="nav" to="/playground">Playground</nuxt-link>
    <nuxt-link class="nav" to="/world-3d">3D World</nuxt-link>
    <nuxt-link class="nav" to="/reflection-3d">3D Reflections</nuxt-link>
    <nuxt-link class="nav" to="/wolf">Wolf</nuxt-link>
  </div>
</template>

<style lang="scss">
.navbar {
  position: absolute;
  z-index: 5;
  top: 30px;
  left: 30px;

  .nav {
    margin-left: 20px;
    padding: 10px;
    text-decoration: none;
    text-transform: uppercase;
    font-size: 1.125rem;
    font-weight: 600;
    color: white;
    transition: all 0.2s;
    text-shadow: 2px 2px 8px rgb(205, 190, 172);

    &:hover {
      color: rgb(205, 190, 172);
    }
  }
}
</style>
