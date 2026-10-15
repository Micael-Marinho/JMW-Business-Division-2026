import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";
const projectRoot = fileURLToPath(new URL("..", import.meta.url));
export default defineConfig({
  root: fileURLToPath(new URL(".", import.meta.url)),
  publicDir: `${projectRoot}/public`,
  plugins: [react()],
  server: {
    host: "127.0.0.1",
    port: 5173,
    strictPort: true,
    fs: { allow: [projectRoot] },
    proxy: { "/api": "http://127.0.0.1:3001" },
  },
  build: { outDir: `${projectRoot}/frontend-dist`, emptyOutDir: true },
});
