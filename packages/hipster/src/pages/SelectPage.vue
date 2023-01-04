<template>
  <div class="playground">
    <div class="card">
      <SelectVue />
    </div>
  </div>
</template>

<script setup lang="ts">
import SelectVue from "@/components/select/select-vue.vue";
</script>

<style scoped lang="scss">
.playground {
  overflow: visible;
}
.card {
  overflow: visible;
  width: 60vw;
}
</style>
