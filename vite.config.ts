import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";
import svgLoader from "vite-svg-loader";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), svgLoader()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData(source, fp) {
          // All scss files ending with imports.scss
          // will not re-import additionalData
          if (
            fp.endsWith("_variables.scss") ||
            fp.endsWith("/style/style.scss")
          )
            return source;

          // Use additionalData from legacy nuxt scss options
          return `@import '@/assets/style/_variables.scss';
                  @import '@/assets/style/style.scss'; ${source}`;
        },
      },
    },
  },
  resolve: {
    alias: [{ find: "@", replacement: "/src" },
    { find: "constants", replacement: "/constants.ts"}],
  },
  define:{
    'process.env': process.env
  }
  // ...
});
