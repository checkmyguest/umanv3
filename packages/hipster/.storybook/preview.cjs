import { app } from '@storybook/vue3'; //I use Vue3
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import 'tailwindcss/tailwind.css';
import '../src/assets/index.scss';
import '../src/assets/style/style.scss';

app.use(ElementPlus);

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}