import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/ReactandwordpressCMS/", // Use your repository name here
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1000, // Set the limit to 1000 kB or any other value
  },
});
