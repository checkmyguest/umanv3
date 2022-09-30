<script lang="ts">
export default {
  data() {
    return {
      message: "How are you ?",
    };
  },

  mounted() {
    console.log("hello");
  },
};
</script>

<template>
  <div class="event">
    <h1>{{ message }}</h1>
    <router-link to="/test-router">Test Router</router-link>
  </div>
</template>

<style lang="scss" scoped>
</style>
