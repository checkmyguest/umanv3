<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useReservationStore } from '../../../stores/fake-use-reservation';
import { useMainStore } from '../../../stores/fake-use-variable';

  const main = useMainStore();
  const { items, test, cpt } = storeToRefs(main);
  const store = useReservationStore();
  const { reservation } = storeToRefs(store);

</script>

<template>
  <div>
    <h1>Blender</h1>
    <p
      v-for="(item, index) in items"
      :key="index"
    >
      {{ item.proprio }}, {{ index }}
    </p>
    <h1>C'est le compteur {{ cpt }}</h1>
    <p
      v-for="(item, index) in reservation"
      :key="index"
    >
      {{ item }}
    </p>
    <button @click="main.addOne">
      Click me
    </button>
  </div>
</template>
