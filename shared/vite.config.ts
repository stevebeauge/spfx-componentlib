import * as fs from "fs";
import { transform } from "lightningcss";
import * as path from "path";
import { defineConfig, type PluginOption } from "vite";
import dts from "vite-plugin-dts";
import { externalizeDeps } from "vite-plugin-externalize-deps";
import { libInjectCss } from "vite-plugin-lib-inject-css";

function cssTypesPlugin(): PluginOption {
  return {
    name: "vite-plugin-css-types",
    enforce: "pre", // Exécuter après le traitement des CSS
    async transform(code, id) {
      if (id.endsWith(".css") || id.endsWith(".scss")) {
        const { exports } = transform({
          code: Buffer.from(code),
          filename: id,
          cssModules: true,
        });

        if (!exports) return null;

        const target = `${id}.d.ts`;

        const typeDefinitions = Object.keys(exports)
          .map((key) => `  readonly "${key}": string;`)
          .join("\n");

        const content = `declare const styles: {
${typeDefinitions}
};
export default styles;
      `;

        await fs.promises.writeFile(target, content, "utf-8");

        this.info(
          `Generated types for ${path.relative(
            __dirname,
            id
          )} at ${path.relative(__dirname, target)}`
        );
      }
      return null;
    },
  };
}

export default defineConfig({
  build: {
    lib: {
      entry: "src/index.ts",
      formats: ["es"],
      fileName: "index",
    },
    sourcemap: true,
    rollupOptions: {},
    minify: false,
  },
  plugins: [externalizeDeps(), dts(), libInjectCss(), cssTypesPlugin()],
  css: {
    transformer: "postcss",
    lightningcss: {},
  },
});
