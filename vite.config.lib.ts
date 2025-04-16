import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";

export default defineConfig({
  plugins: [react(), cssInjectedByJsPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  define: {
    "process.env.NODE_ENV": JSON.stringify("production"),
  },
  build: {
    emptyOutDir: false,
    lib: {
      entry: resolve(__dirname, "src/components/siteOverviewChartComponent.ts"),
      name: "SiteOverviewChart",
      fileName: (format) => `js/site-overview-chart.${format}.js`,
      formats: ["es", "umd"],
    },
  },
  base: "/reusable-widget/",
});
