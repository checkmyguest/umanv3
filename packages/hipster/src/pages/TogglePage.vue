<script setup lang="ts">
import { ref } from "vue";
import PanelSliderVue from "@/components/panel-slider/panel-slider-vue.vue";
import ToggleVue from "@/components/toggle/toggle-vue.vue";

const model = ref(false);
</script>

<template>
  <div class="playground">
    <div class="card">
      <ToggleVue :model="model" id="toggle" />
      <ToggleVue type="destructive" :model="model" id="toggle2" />
    </div>
    <div class="card">
      <PanelSliderVue />
    </div>
  </div>
</template>

<style>
.playground {
  flex-direction: column;
}
</style>
