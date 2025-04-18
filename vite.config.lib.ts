import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";
import dts from "vite-plugin-dts";

const getDate = () => {
  const date = new Date();
  return date.toISOString().split("T")[0].replace(/-/g, "");
};

export default defineConfig({
  plugins: [react(), cssInjectedByJsPlugin(), dts({ include: "src" })],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  define: {
    "process.env.NODE_ENV": JSON.stringify("production"),
  },
  css: {
    modules: {
      localsConvention: "camelCase",
      generateScopedName: "[name]__[local]___[hash:base64:5]",
    },
  },
  build: {
    outDir: "dist/lib",
    emptyOutDir: true,
    lib: {
      entry: resolve(__dirname, "src/components/index.ts"),
      formats: ["es", "umd"],
      name: "ReusableWidget",
      fileName: (format) => `reusable-widget.${format}.js?v=${getDate()}`,
    },
    rollupOptions: {
      //external: ["react", "react-dom", "react-dom/client"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "react-dom/client": "ReactDOMClient",
        },
      },
    },
    assetsInlineLimit: 100000000,
  },
});
