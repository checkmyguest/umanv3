import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import { createApp } from "vue";
import VueTelInput from "vue-tel-input";
import App from "./App.vue";
import "./assets/index.scss";
import "./assets/style/style.scss";
import "./assets/style/_variables.scss";
import router from "./router/index";
import "./style.css";

createApp(App).use(router).use(ElementPlus).use(VueTelInput).mount("#app");
