import { createPinia } from 'pinia';
import { createApp } from 'vue';
import App from './App.vue';
import './assets/style/style.scss';
import './assets/style/_variables.scss';
import router from './router/index';

const app = createApp(App);
const pinia = createPinia();

app.use(router).mount('#app');
app.use(pinia);