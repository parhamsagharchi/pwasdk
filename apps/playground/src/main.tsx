
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Add error boundary
try {
  const rootElement = document.getElementById("root");
  if (!rootElement) {
    throw new Error("Root element not found!");
  }
  const root = createRoot(rootElement);
  root.render(<App />);
  console.log("✅ PWA SDK App loaded successfully");
} catch (error) {
  console.error("❌ Error loading app:", error);
  document.body.innerHTML = `
    <div style="padding: 20px; font-family: sans-serif;">
      <h1>Error Loading App</h1>
      <p>${error}</p>
      <p>Check the browser console for more details.</p>
    </div>
  `;
}
