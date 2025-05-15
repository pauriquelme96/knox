import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  resolve: {
    alias: {
      "@spoon-kit-legacy": "/packages/spoon-kit-legacy",
      "@spoon-kit-react": "/packages/spoon-kit-react",
    },
  },
});
