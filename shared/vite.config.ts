import { defineConfig } from "vite";
import { externalizeDeps } from "vite-plugin-externalize-deps";

export default defineConfig({
  build: {
    lib: {
      entry: "src/index.ts",
      formats: ["es"],
      fileName: "index",
    },
    rollupOptions: {},
  },
  plugins: [externalizeDeps()],
  css: {
    transformer: "lightningcss",
  },
});
