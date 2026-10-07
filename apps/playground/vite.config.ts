import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { readFileSync, existsSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Try to use mkcert certificates if available, otherwise use Vite's default
function getHttpsConfig() {
  // Try localhost+3 format first (common mkcert output)
  const altCert = resolve(__dirname, "localhost+3.pem");
  const altKey = resolve(__dirname, "localhost+3-key.pem");

  if (existsSync(altCert) && existsSync(altKey)) {
    console.log("✅ Using mkcert certificates (localhost+3.pem)");
    return {
      cert: readFileSync(altCert),
      key: readFileSync(altKey),
    };
  }

  // Try standard names
  const standardCert = resolve(__dirname, "localhost.pem");
  const standardKey = resolve(__dirname, "localhost-key.pem");

  if (existsSync(standardCert) && existsSync(standardKey)) {
    console.log("✅ Using mkcert certificates (localhost.pem)");
    return {
      cert: readFileSync(standardCert),
      key: readFileSync(standardKey),
    };
  }

  // Fallback to Vite's default (may show certificate warning)
  console.log("⚠️  Using Vite's default certificate (may show warning)");
  console.log(
    "💡 Tip: Run 'mkcert localhost 127.0.0.1 ::1 YOUR_IP' in apps/playground folder"
  );
  return true;
}

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Use package source in the monorepo so Vite always gets fresh types/code
      "@pwasdk/core": resolve(__dirname, "../../packages/core/src/index.ts"),
    },
  },
  server: {
    host: "0.0.0.0", // Explicitly bind to all interfaces
    port: 3000,
    open: true,
    https: getHttpsConfig(), // Enable HTTPS for PWA features
    strictPort: false, // Allow different port if 3000 is busy
  },
  preview: {
    host: "0.0.0.0",
    port: 3000,
    open: true,
    https: getHttpsConfig(),
  },
});
