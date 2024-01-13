import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const isCI = process.env.CI === "true";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.js",
    coverage: {
      provider: "v8",
      reporter: isCI ? ["lcov", "text-summary"] : "text",
      clean: true,
      exclude: [
        "**/node_modules/**",
        "**/dist/**",
        "**/coverage/**",
        "**/public/**",
        "**/src/index.js",
        "**/src/mocks/**",
        "**/src/types/**",
        "**/src/index.tsx",
        "**/src/reportWebVitals.ts",
        "**/src/react-app-env.d.ts",
      ],
    },
  },
});
