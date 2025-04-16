import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/countries-api": {
        target: "https://67fce7181f8b41c8168804f6.mockapi.io",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/countries-api/, ""),
      },
    },
  },
});
