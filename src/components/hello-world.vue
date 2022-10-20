<script setup lang="ts">
import { Item } from "../stores/@models/fake-models";
import { useMainStore } from "../stores/fake-use-variable";

let itemContainer: Item = {
id: "5",
createdAt: new Date(),
proprio: "",
appartement: "",
numero: 0
};
const store = useMainStore();
const message = "How are you ?";
function update(){
  store.createNewItem(itemContainer);
  store.updateItem("5", itemContainer);
}
</script>

<template>
  <div class="event">
    <h1>{{ message }}</h1>
    <div>
      <p
        v-for="(item, index) in store.items"
        :key="index"
      >
        {{ item.proprio }}, {{ index }}
      </p>
      <button @click="update()">
        Nouveau bouton
      </button>
    </div>
    <router-link to="/test-router">
      Test Router
    </router-link>
  </div>
</template>

<style lang="scss" scoped></style>
