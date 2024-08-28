import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/ReactandwordpressCMS/", // Ensure this matches your repository name
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://favourezechi.com.ng/wp", // Ensure this is the correct target URL
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, "/wp-json/wp/v2"), // Rewrites the path to match the WordPress API structure
      },
    },
  },
  build: {
    chunkSizeWarningLimit: 1000, // Increase this if your chunks are large
  },
});
