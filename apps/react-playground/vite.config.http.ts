// Temporary HTTP config for quick testing
// Note: PWA features won't work with HTTP, but you can at least see the app
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 3000,
    open: true,
    https: false, // Use HTTP instead of HTTPS
  },
  preview: {
    host: '0.0.0.0',
    port: 3000,
    open: true,
    https: false,
  },
});

