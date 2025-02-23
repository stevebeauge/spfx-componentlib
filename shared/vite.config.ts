import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import { externalizeDeps } from "vite-plugin-externalize-deps";
import { libInjectCss } from "vite-plugin-lib-inject-css";
export default defineConfig({
  build: {
    lib: {
      entry: "src/index.ts",
      formats: ["es"],
      fileName: "index",
    },
    sourcemap: true,
    rollupOptions: {},
  },
  plugins: [externalizeDeps(), dts(), libInjectCss()],
  css: {
    transformer: "lightningcss",
  },
});
