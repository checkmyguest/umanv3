<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
import Navbar from "./components/@navbar/Navbar.vue";
import Toolbar from "./components/@toolbar/Toolbar.vue";
document.title = "UmanV3";
</script>

<template>
  <div id="app">
    <Toolbar />
    <Navbar />
    <router-view class="router-view-class" />
  </div>
</template>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}

#app {
  margin: 0;
  padding: 0;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  .router-view-class {
    position: absolute;
    top: $toolbar-height;
    left: $navbar-width;
    width: calc(100vw - $navbar-width);
    height: calc(100vh - $toolbar-height);
  }
}
</style>
