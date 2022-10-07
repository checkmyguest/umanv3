<script setup lang="ts">
import { useMainStore } from '../../../services/store/fake-variable';

  const store = useMainStore()
</script>

<template>
  <div>
    <h1>Blender</h1>
    <p
      v-for="(item, index) in store.items"
      :key="index"
    >
      {{ item.name }}, {{ index }}
    </p>
  </div>
</template>
