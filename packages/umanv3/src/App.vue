<script setup lang="ts">
import Navbar from "./components/@navbar/Navbar.vue";
import Toolbar from "./components/@toolbar/Toolbar.vue";
import { useAdminStore } from "./stores/admin";
document.title = "UmanV3";

const adminStore = useAdminStore();

</script>

<template>
  <div id="app">
    <toolbar v-if="adminStore.logStatus" />
    <navbar v-if="adminStore.logStatus" />
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
    max-width: calc(100vw - $navbar-width);
    height: calc(100vh - $toolbar-height);
    overflow: hidden !important;
  }
}
</style>
