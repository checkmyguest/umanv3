<script setup lang="ts">
import router from "@/router";
import { useAdminStore } from "@/stores/admin";
import { onMounted, ref } from 'vue';
import { RouterLink } from "vue-router";
import ViewService from "../core/services/view-service";
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
const adminStore = useAdminStore();
const message = "How are you ?";

const numero = ref(0);
function numeroCount(){
  adminStore.logOut();
  localStorage.clear();
  router.push("/login");
}

const viewServiceData = ViewService;

// if logged in, redirect to event page, if not, redirect to login page
if (!localStorage.token) {
  router.push('/login');
} else {
  router.push('/');
}

onMounted(() => {
  console.log("HELLO WORLD");
})
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
    </div>
    <button @click="numeroCount()">
      Nouveau !
    </button>
    <router-link to="/test-router">
      Test Router
    </router-link>
    <p>Voici un numéro : {{ numero }}</p>
  </div>
</template>

<style lang="scss" scoped></style>
