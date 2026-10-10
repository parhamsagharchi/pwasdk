import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import basicSsl from "@vitejs/plugin-basic-ssl";
import { readFileSync, existsSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import type { ServerOptions as HttpsServerOptions } from "node:https";
import type { PluginOption } from "vite";

const __dirname = dirname(fileURLToPath(import.meta.url));

function getMkcertHttps(): HttpsServerOptions | null {
  const candidates = [
    ["localhost+3.pem", "localhost+3-key.pem"],
    ["localhost.pem", "localhost-key.pem"],
  ] as const;

  for (const [certName, keyName] of candidates) {
    const cert = resolve(__dirname, certName);
    const key = resolve(__dirname, keyName);
    if (existsSync(cert) && existsSync(key)) {
      console.log(`✅ Using mkcert certificates (${certName})`);
      return {
        cert: readFileSync(cert),
        key: readFileSync(key),
      };
    }
  }

  return null;
}

const mkcertHttps = getMkcertHttps();
const plugins: PluginOption[] = [react()];

// When mkcert is missing, generate a local self-signed cert via basic-ssl.
if (!mkcertHttps) {
  console.log("⚠️  No mkcert certs found — using @vitejs/plugin-basic-ssl");
  console.log("👉 Open https://localhost:3000/ (not http://)");
  plugins.push(basicSsl());
}

export default defineConfig({
  plugins,
  resolve: {
    alias: {
      // Use package source in the monorepo so Vite always gets fresh types/code
      "@pwasdk/core": resolve(__dirname, "../../packages/core/src/index.ts"),
    },
  },
  server: {
    host: "0.0.0.0",
    port: 3000,
    open: "https://localhost:3000/",
    // mkcert certs when available; otherwise @vitejs/plugin-basic-ssl injects HTTPS
    ...(mkcertHttps ? { https: mkcertHttps } : {}),
    strictPort: false,
  },
  preview: {
    host: "0.0.0.0",
    port: 3000,
    open: "https://localhost:3000/",
    ...(mkcertHttps ? { https: mkcertHttps } : {}),
  },
});
