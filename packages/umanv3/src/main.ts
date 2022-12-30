import axios from "axios";
import ElementPLus, { dayjs } from "element-plus";
import "element-plus/dist/index.css";
import { createPinia } from "pinia";
import "reflect-metadata";
import { createApp } from "vue";
import VueAxios from "vue-axios";
import VueCryptoJS from "vue-cryptojs";
import App from "./app.vue";
import "./assets/style/main.scss";
import "./assets/style/_variables.scss";
import router from "./router/index";

const pinia = createPinia();

// Persist pinia stores with localStorage
pinia.use((context) => {
  const storeId = context.store.$id;

  const serilizer = {
    serialize: JSON.stringify,
    deserialize: JSON.parse,
  };

  const fromStorage = serilizer.deserialize(
    window.localStorage.getItem(storeId)!
  );

  if (fromStorage) {
    context.store.$patch(fromStorage);
  }

  context.store.$subscribe((mutation, state) => {
    window.localStorage.setItem(storeId, serilizer.serialize(state));
  });
});

const app = createApp(App);

app.config.globalProperties.$dayjs = dayjs;

app.use(pinia).use(router).use(ElementPLus).use(VueCryptoJS).use(VueAxios, axios).mount("#app");
