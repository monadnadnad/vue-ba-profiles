import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";
import checker from "vite-plugin-checker";

// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    plugins: [
      vue(),
      checker({
        vueTsc: true,
      }),
    ],
    test: {
      globals: true,
      environment: "happy-dom",
      setupFiles: "./tests/setup.ts",
      server: {
        deps: { inline: ["vuetify"] },
      },
    },
  };
});
