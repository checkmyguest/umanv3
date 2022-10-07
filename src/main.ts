import ElementPLus from 'element-plus';
import 'element-plus/dist/index.css';
import { createPinia } from "pinia";
import "reflect-metadata";
import { createApp } from "vue";
import App from "./app.vue";
import "./assets/style/style.scss";
import "./assets/style/_variables.scss";
import router from "./router/index";


createApp(App).use(createPinia()).use(router).use(ElementPLus).mount('#app');
